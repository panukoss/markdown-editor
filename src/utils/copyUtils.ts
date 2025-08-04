/**
 * Copies plain text to clipboard using modern Clipboard API with fallback
 * @param text - The text to copy
 * @returns Promise resolving to true if successful, false otherwise
 * 
 * @example
 * ```typescript
 * const success = await copyToClipboard('Hello, world!')
 * if (success) console.log('Copied!')
 * ```
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

/**
 * Copies HTML content as rich text to clipboard
 * @param htmlContent - HTML string to copy as formatted text
 * @returns Promise resolving to true if successful, false otherwise
 * 
 * @example
 * ```typescript
 * const html = '<p><strong>Bold</strong> text</p>'
 * const success = await copyRichText(html)
 * ```
 */
export const copyRichText = async (htmlContent: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext && navigator.clipboard.write) {
      // Modern approach using Clipboard API
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({ 'text/html': blob });
      await navigator.clipboard.write([clipboardItem]);
      return true;
    } else {
      // Fallback approach using a hidden contenteditable div
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-999999px';
      container.style.top = '-999999px';
      container.contentEditable = 'true';
      container.innerHTML = htmlContent;
      document.body.appendChild(container);
      
      // Select the content
      const range = document.createRange();
      range.selectNodeContents(container);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      
      // Copy to clipboard
      const successful = document.execCommand('copy');
      
      // Clean up
      selection?.removeAllRanges();
      document.body.removeChild(container);
      
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy rich text:', err);
    return false;
  }
};

/**
 * Extracts rendered HTML with inline styles for rich text copying
 * @param container - The HTML element containing rendered markdown
 * @returns HTML string with inline styles applied
 * 
 * @example
 * ```typescript
 * const previewElement = document.querySelector('.markdown-preview')
 * const html = getRenderedHTML(previewElement as HTMLElement)
 * ```
 */
export const getRenderedHTML = (container: HTMLElement): string => {
  // Clone the container to avoid modifying the original
  const clone = container.cloneNode(true) as HTMLElement;
  
  // Remove any interactive elements or scripts
  const scripts = clone.querySelectorAll('script');
  scripts.forEach(script => script.remove());
  
  // Add inline styles for code blocks with comprehensive styling
  const codeBlocks = clone.querySelectorAll('pre');
  codeBlocks.forEach(pre => {
    (pre as HTMLElement).style.cssText = `
      background-color: #f3f4f6 !important;
      border: 1px solid #e5e7eb !important;
      padding: 16px !important;
      border-radius: 6px !important;
      overflow-x: auto !important;
      margin: 16px 0 !important;
      font-family: Consolas, Monaco, "Courier New", monospace !important;
    `;
    
    const code = pre.querySelector('code');
    if (code) {
      (code as HTMLElement).style.cssText = `
        font-family: Consolas, Monaco, "Courier New", monospace !important;
        font-size: 14px !important;
        line-height: 1.5 !important;
        color: #1f2937 !important;
        background-color: transparent !important;
        padding: 0 !important;
      `;
    }
  });
  
  // Add inline styles for inline code with comprehensive styling
  const inlineCodes = clone.querySelectorAll('code:not(pre code)');
  inlineCodes.forEach(code => {
    (code as HTMLElement).style.cssText = `
      background-color: #e5e7eb !important;
      color: #1f2937 !important;
      padding: 2px 4px !important;
      border-radius: 4px !important;
      font-family: Consolas, Monaco, "Courier New", monospace !important;
      font-size: 0.875em !important;
      white-space: nowrap !important;
    `;
  });
  
  // Get the HTML content
  return clone.innerHTML;
};

/**
 * Converts HTML to plain text while preserving structure (lists, tables, etc.)
 * @param container - The HTML element to extract text from
 * @returns Formatted plain text with preserved structure
 * 
 * @example
 * ```typescript
 * const element = document.querySelector('.markdown-preview')
 * const plainText = getPlainTextWithFormatting(element as HTMLElement)
 * // Lists will have bullets, tables will be aligned, etc.
 * ```
 */
export const getPlainTextWithFormatting = (container: HTMLElement): string => {
  const processNode = (node: Node, listContext?: { type: 'ul' | 'ol', index: number, depth: number }): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tagName = element.tagName.toLowerCase();
      let result = '';
      
      // Handle block-level elements
      switch (tagName) {
        case 'p':
        case 'div':
          result = Array.from(node.childNodes).map(child => processNode(child, listContext)).join('');
          return result + '\n\n';
          
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          result = Array.from(node.childNodes).map(child => processNode(child)).join('');
          return result + '\n\n';
          
        case 'ul':
          const ulDepth = listContext ? listContext.depth + 1 : 0;
          return Array.from(node.childNodes)
            .filter(child => child.nodeName.toLowerCase() === 'li')
            .map((child, index) => processNode(child, { type: 'ul', index, depth: ulDepth }))
            .join('') + (ulDepth === 0 ? '\n' : '');
            
        case 'ol':
          const olDepth = listContext ? listContext.depth + 1 : 0;
          return Array.from(node.childNodes)
            .filter(child => child.nodeName.toLowerCase() === 'li')
            .map((child, index) => processNode(child, { type: 'ol', index, depth: olDepth }))
            .join('') + (olDepth === 0 ? '\n' : '');
            
        case 'li':
          const indent = listContext ? '  '.repeat(listContext.depth) : '';
          const childNodes = Array.from(node.childNodes);
          let textContent = '';
          let nestedLists = '';
          
          // Separate text content from nested lists
          childNodes.forEach(child => {
            if (child.nodeName.toLowerCase() === 'ul' || child.nodeName.toLowerCase() === 'ol') {
              nestedLists += processNode(child, listContext);
            } else {
              textContent += processNode(child, listContext);
            }
          });
          
          if (listContext) {
            const prefix = listContext.type === 'ul' ? '• ' : `${listContext.index + 1}. `;
            result = indent + prefix + textContent.trim() + '\n' + nestedLists;
            return result;
          }
          return textContent + '\n' + nestedLists;
          
        case 'br':
          return '\n';
          
        case 'hr':
          return '\n---\n\n';
          
        case 'blockquote':
          result = Array.from(node.childNodes).map(child => processNode(child)).join('');
          // Remove trailing newlines before adding blockquote markers
          const trimmedResult = result.replace(/\n+$/, '');
          return trimmedResult.split('\n').filter(line => line.trim()).map(line => '> ' + line).join('\n') + '\n\n';
          
        case 'pre':
          return element.textContent + '\n\n';
          
        case 'table':
          // Improved table handling with headers and alignment
          const rows = Array.from(element.querySelectorAll('tr'));
          const headers = Array.from(element.querySelectorAll('th'));
          let tableText = '';
          
          if (headers.length > 0) {
            // Table with headers
            const headerRow = headers.map(cell => cell.textContent?.trim() || '').join(' | ');
            const separator = headers.map(() => '---').join(' | ');
            tableText = headerRow + '\n' + separator + '\n';
            
            // Data rows
            const dataRows = Array.from(element.querySelectorAll('tbody tr'));
            dataRows.forEach(row => {
              const cells = Array.from(row.querySelectorAll('td'));
              tableText += cells.map(cell => cell.textContent?.trim() || '').join(' | ') + '\n';
            });
          } else {
            // Simple table without headers
            tableText = rows.map(row => {
              const cells = Array.from(row.querySelectorAll('td, th'));
              return cells.map(cell => cell.textContent?.trim() || '').join(' | ');
            }).join('\n');
          }
          
          return tableText + '\n\n';
          
        default:
          // For inline elements and others, just process children
          return Array.from(node.childNodes).map(child => processNode(child, listContext)).join('');
      }
    }
    
    return '';
  };
  
  // Process the container and clean up extra whitespace
  const text = processNode(container);
  return text.replace(/\n{3,}/g, '\n\n').trim();
};