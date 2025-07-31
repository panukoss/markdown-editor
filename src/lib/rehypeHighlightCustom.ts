import { visit } from 'unist-util-visit';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import markdown from 'highlight.js/lib/languages/markdown';
import bash from 'highlight.js/lib/languages/bash';

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('py', python);
hljs.registerLanguage('md', markdown);
hljs.registerLanguage('sh', bash);

export function rehypeHighlightCustom() {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'pre' && node.children?.[0]?.tagName === 'code') {
        const codeNode = node.children[0];
        const className = codeNode.properties?.className || [];
        const languageClass = className.find((c: string) => c.startsWith('language-'));
        
        if (languageClass) {
          const language = languageClass.replace('language-', '');
          const code = getText(codeNode);
          
          try {
            const result = hljs.highlight(code, { language });
            // Parse the highlighted HTML and convert to HAST
            const highlightedHAST = parseHighlightedCode(result.value);
            
            // Replace code node children with highlighted content
            codeNode.children = highlightedHAST;
            
            // Add hljs class
            if (!className.includes('hljs')) {
              className.push('hljs');
            }
            codeNode.properties.className = className;
          } catch (error) {
            console.error('Highlight error:', error);
          }
        }
      }
    });
  };
}

function getText(node: any): string {
  if (node.type === 'text') {
    return node.value;
  }
  if (node.children) {
    return node.children.map(getText).join('');
  }
  return '';
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&#96;/g, '`');
}

function parseHighlightedCode(html: string): any[] {
  // More comprehensive HTML to HAST parser for highlight.js output
  const elements: any[] = [];
  let currentIndex = 0;
  
  while (currentIndex < html.length) {
    const spanStart = html.indexOf('<span', currentIndex);
    
    if (spanStart === -1) {
      // No more spans, add remaining text
      if (currentIndex < html.length) {
        const text = decodeHtmlEntities(html.substring(currentIndex));
        if (text) {
          elements.push({ type: 'text', value: text });
        }
      }
      break;
    }
    
    // Add text before the span
    if (spanStart > currentIndex) {
      const text = decodeHtmlEntities(html.substring(currentIndex, spanStart));
      if (text) {
        elements.push({ type: 'text', value: text });
      }
    }
    
    // Parse the span
    const spanEnd = html.indexOf('>', spanStart);
    const closeSpan = html.indexOf('</span>', spanEnd);
    
    if (spanEnd !== -1 && closeSpan !== -1) {
      const classMatch = html.substring(spanStart, spanEnd).match(/class="([^"]+)"/);
      const content = html.substring(spanEnd + 1, closeSpan);
      
      if (classMatch && classMatch[1]) {
        elements.push({
          type: 'element',
          tagName: 'span',
          properties: { className: [classMatch[1]] },
          children: [{ type: 'text', value: decodeHtmlEntities(content) }]
        });
      }
      
      currentIndex = closeSpan + 7; // length of '</span>'
    } else {
      // Malformed HTML, skip
      currentIndex = spanStart + 1;
    }
  }
  
  return elements;
}