import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked to use highlight.js
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {}
    }
    return hljs.highlightAuto(code).value;
  }
});

export const exportToPDF = async (content: string, fileName: string) => {
  // Create a temporary container for rendering
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '794px'; // A4 width in pixels at 96 DPI
  container.style.padding = '40px';
  container.style.backgroundColor = 'white';
  container.style.color = 'black';
  container.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  
  // Apply markdown styles with better list alignment
  container.innerHTML = `
    <style>
      .pdf-export {
        font-size: 12pt;
        line-height: 1.6;
        color: #000;
      }
      .pdf-export h1 { font-size: 24pt; margin: 20px 0 10px 0; font-weight: bold; }
      .pdf-export h2 { font-size: 20pt; margin: 18px 0 8px 0; font-weight: bold; }
      .pdf-export h3 { font-size: 16pt; margin: 16px 0 6px 0; font-weight: bold; }
      .pdf-export h4 { font-size: 14pt; margin: 14px 0 4px 0; font-weight: bold; }
      .pdf-export h5 { font-size: 12pt; margin: 12px 0 4px 0; font-weight: bold; }
      .pdf-export h6 { font-size: 11pt; margin: 10px 0 4px 0; font-weight: bold; }
      .pdf-export p { margin: 8px 0; }
      .pdf-export ul, .pdf-export ol { 
        margin: 8px 0; 
        padding-left: 30px;
      }
      .pdf-export li { 
        margin: 4px 0;
        line-height: 1.6;
      }
      .pdf-export ul li::marker {
        font-size: 12pt;
      }
      .pdf-export ol li::marker {
        font-size: 12pt;
      }
      .pdf-export pre {
        background: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 12px;
        margin: 10px 0;
        overflow-x: auto;
        font-family: 'Courier New', monospace;
        font-size: 10pt;
        line-height: 1.4;
      }
      .pdf-export code {
        background: #f5f5f5;
        padding: 2px 4px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        font-size: 10pt;
      }
      .pdf-export pre code {
        background: none;
        padding: 0;
      }
      .pdf-export blockquote {
        border-left: 4px solid #ddd;
        margin: 10px 0;
        padding-left: 16px;
        font-style: italic;
        color: #555;
      }
      .pdf-export table {
        border-collapse: collapse;
        margin: 10px 0;
      }
      .pdf-export th, .pdf-export td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      .pdf-export th {
        background-color: #f5f5f5;
        font-weight: bold;
      }
      .pdf-export a {
        color: #0066cc;
        text-decoration: underline;
      }
      .pdf-export strong { font-weight: bold; }
      .pdf-export em { font-style: italic; }
      
      /* Syntax highlighting styles */
      .hljs-keyword { color: #0000ff; }
      .hljs-string { color: #008000; }
      .hljs-number { color: #098658; }
      .hljs-comment { color: #808080; font-style: italic; }
      .hljs-function { color: #0000ff; }
      .hljs-class { color: #0000ff; }
      .hljs-variable { color: #000000; }
      .hljs-title { color: #0000ff; font-weight: bold; }
      .hljs-params { color: #000000; }
      .hljs-literal { color: #0000ff; }
      .hljs-meta { color: #808080; }
      .hljs-module { color: #0000ff; }
      .hljs-selector-tag { color: #0000ff; }
      .hljs-selector-id { color: #008000; }
      .hljs-selector-class { color: #008000; }
      .hljs-attribute { color: #ff0000; }
      .hljs-name { color: #0000ff; }
      .hljs-tag { color: #0000ff; }
      .hljs-built_in { color: #0000ff; }
    </style>
    <div class="pdf-export"></div>
  `;
  
  const contentDiv = container.querySelector('.pdf-export');
  if (!contentDiv) return;
  
  // Convert markdown to HTML with syntax highlighting
  const htmlContent = await marked(content);
  contentDiv.innerHTML = htmlContent;
  
  document.body.appendChild(container);
  
  try {
    // Wait for content to render
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Check if content is too large and needs chunking
    const contentHeight = container.scrollHeight;
    const maxCanvasHeight = 32767; // Maximum canvas height
    const scale = 2;
    
    if (contentHeight * scale > maxCanvasHeight) {
      // For very large documents, we need to render in chunks
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageHeightPx = 1122; // Approximate A4 height in pixels at 96 DPI
      const chunks = Math.ceil(contentHeight / pageHeightPx);
      
      for (let i = 0; i < chunks; i++) {
        if (i > 0) pdf.addPage();
        
        // Create a window for this chunk
        const windowHeight = Math.min(pageHeightPx, contentHeight - (i * pageHeightPx));
        const canvas = await html2canvas(container, {
          scale: scale,
          logging: false,
          backgroundColor: '#ffffff',
          windowHeight: windowHeight,
          y: i * pageHeightPx,
          height: windowHeight
        });
        
        // Add to PDF
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          0,
          0,
          imgWidth,
          imgHeight
        );
      }
      
      pdf.save(`${fileName}.pdf`);
    } else {
      // Regular rendering for smaller documents
      const canvas = await html2canvas(container, {
        scale: scale,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add pages as needed
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
      }
      
      // Save the PDF
      pdf.save(`${fileName}.pdf`);
    }
  } catch (error) {
    // Clean up and re-throw
    document.body.removeChild(container);
    throw error;
  }
  
  // Clean up
  document.body.removeChild(container);
};