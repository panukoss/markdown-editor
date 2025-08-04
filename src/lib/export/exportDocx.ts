import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType, LevelFormat } from 'docx';
import { saveAs } from 'file-saver';
import { marked } from 'marked';

interface ParsedElement {
  type: string;
  content?: string;
  level?: number;
  items?: ParsedElement[];
  rows?: string[][];
  tokens?: any[];
  raw?: string;
}

export const exportToDocx = async (content: string, fileName: string) => {
  try {
    // Parse markdown to extract structure
    const tokens = marked.lexer(content);

    // Process tokens recursively
    const processTokens = (tokens: any[]): ParsedElement[] => {
      const elements: ParsedElement[] = [];
      
      tokens.forEach((token: any) => {
        switch (token.type) {
          case 'heading':
            elements.push({
              type: 'heading',
              content: token.text,
              level: token.depth
            });
            break;
            
          case 'paragraph':
            elements.push({
              type: 'paragraph',
              content: token.text,
              tokens: token.tokens
            });
            break;
            
          case 'list':
            elements.push({
              type: token.ordered ? 'ordered-list' : 'unordered-list',
              items: token.items.map((item: any) => ({
                type: 'list-item',
                content: item.text,
                tokens: item.tokens
              }))
            });
            break;
            
          case 'code':
            elements.push({
              type: 'code',
              content: token.text,
              raw: token.raw
            });
            break;
            
          case 'blockquote':
            elements.push({
              type: 'blockquote',
              content: token.text,
              tokens: token.tokens
            });
            break;
            
          case 'table':
            const rows: string[][] = [];
            if (token.header) {
              rows.push(token.header);
            }
            if (token.rows) {
              rows.push(...token.rows);
            }
            elements.push({
              type: 'table',
              rows: rows
            });
            break;
            
          case 'hr':
            elements.push({
              type: 'hr'
            });
            break;
            
          case 'space':
            // Skip empty space tokens
            break;
            
          default:
            // Handle other token types as paragraphs
            if (token.text) {
              elements.push({
                type: 'paragraph',
                content: token.text
              });
            }
        }
      });
      
      return elements;
    };

    const docElements = processTokens(tokens);

    // Create document sections
    const children: (Paragraph | Table)[] = [];

    // Define numbering for ordered lists
    const numbering = {
      config: [
        {
          reference: "default-numbering",
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: "%1.",
              alignment: AlignmentType.START,
              style: {
                paragraph: {
                  indent: { left: 720, hanging: 360 },
                },
              },
            },
          ],
        },
      ],
    };

    const processElements = (elements: ParsedElement[], depth: number = 0) => {
      elements.forEach((element) => {
        switch (element.type) {
          case 'heading':
            if (element.content) {
              children.push(
                new Paragraph({
                  text: element.content,
                  heading: element.level === 1 ? HeadingLevel.HEADING_1 :
                           element.level === 2 ? HeadingLevel.HEADING_2 :
                           element.level === 3 ? HeadingLevel.HEADING_3 :
                           HeadingLevel.HEADING_4,
                  spacing: { before: 240, after: 120 }
                })
              );
            }
            break;
          
          case 'paragraph':
            if (element.content) {
              const textRuns = parseInlineElements(element.content);
              if (textRuns.length > 0) {
                children.push(
                  new Paragraph({
                    children: textRuns,
                    spacing: { before: 120, after: 120 }
                  })
                );
              }
            }
            break;
          
          case 'unordered-list':
          case 'ordered-list':
            element.items?.forEach((item) => {
              if (item.content) {
                const textRuns = parseInlineElements(item.content);
                children.push(
                  new Paragraph({
                    children: textRuns,
                    bullet: element.type === 'unordered-list' ? { level: depth } : undefined,
                    numbering: element.type === 'ordered-list' ? {
                      reference: 'default-numbering',
                      level: 0
                    } : undefined,
                    spacing: { before: 60, after: 60 }
                  })
                );
              }
            });
            break;
          
          case 'code':
            if (element.content) {
              // Split code by lines to preserve formatting
              const lines = element.content.split('\n');
              lines.forEach((line, index) => {
                children.push(
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: line || ' ', // Preserve empty lines
                        font: 'Courier New',
                        size: 20
                      })
                    ],
                    spacing: { before: index === 0 ? 120 : 0, after: index === lines.length - 1 ? 120 : 0 },
                    indent: { left: 720 },
                    border: {
                      left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                      right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                      top: index === 0 ? { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } : undefined,
                      bottom: index === lines.length - 1 ? { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } : undefined,
                    },
                    shading: { fill: "F5F5F5" }
                  })
                );
              });
            }
            break;
          
          case 'blockquote':
            if (element.content) {
              const textRuns = parseInlineElements(element.content);
              children.push(
                new Paragraph({
                  children: textRuns.map(run => new TextRun({ ...run, italics: true })),
                  indent: { left: 720 },
                  spacing: { before: 120, after: 120 },
                  border: {
                    left: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC" }
                  }
                })
              );
            }
            break;
            
          case 'table':
            if (element.rows && element.rows.length > 0) {
              const tableRows = element.rows.map((row, rowIndex) => 
                new TableRow({
                  children: row.map(cell => 
                    new TableCell({
                      children: [new Paragraph({ text: cell })],
                      shading: rowIndex === 0 ? { fill: "F5F5F5" } : undefined
                    })
                  )
                })
              );
              
              children.push(
                new Table({
                  rows: tableRows,
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1 },
                    bottom: { style: BorderStyle.SINGLE, size: 1 },
                    left: { style: BorderStyle.SINGLE, size: 1 },
                    right: { style: BorderStyle.SINGLE, size: 1 },
                    insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
                    insideVertical: { style: BorderStyle.SINGLE, size: 1 },
                  }
                })
              );
              
              // Add spacing after table
              children.push(new Paragraph({ text: "", spacing: { after: 120 } }));
            }
            break;
            
          case 'hr':
            children.push(
              new Paragraph({
                text: "",
                border: {
                  bottom: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC" }
                },
                spacing: { before: 240, after: 240 }
              })
            );
            break;
        }
      });
    };

    processElements(docElements);

    // Create the document
    const doc = new Document({
      numbering: numbering,
      sections: [{
        properties: {},
        children: children
      }]
    });

    // Generate and save the document
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${fileName}.docx`);
  } catch (error) {
    console.error('Error exporting to DOCX:', error);
    throw new Error('Failed to export document. Please check the content and try again.');
  }
};

// Parse inline markdown elements (bold, italic, links, code)
function parseInlineElements(text: string): any[] {
  const runs: any[] = [];
  
  // More comprehensive regex for inline elements
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      const plainText = text.substring(lastIndex, match.index);
      if (plainText) {
        runs.push(new TextRun({ text: plainText }));
      }
    }
    
    const fullMatch = match[0];
    
    if (fullMatch.startsWith('**') && fullMatch.endsWith('**')) {
      // Bold text
      runs.push(new TextRun({
        text: fullMatch.slice(2, -2),
        bold: true
      }));
    } else if (fullMatch.startsWith('*') && fullMatch.endsWith('*') && !fullMatch.startsWith('**')) {
      // Italic text
      runs.push(new TextRun({
        text: fullMatch.slice(1, -1),
        italics: true
      }));
    } else if (fullMatch.startsWith('`') && fullMatch.endsWith('`')) {
      // Inline code
      runs.push(new TextRun({
        text: fullMatch.slice(1, -1),
        font: 'Courier New',
        shading: { fill: "EEEEEE" }
      }));
    } else if (fullMatch.startsWith('[')) {
      // Link - just show the link text for now
      runs.push(new TextRun({
        text: match[2],
        color: "0066CC",
        underline: {}
      }));
    }
    
    lastIndex = match.index + fullMatch.length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      runs.push(new TextRun({ text: remainingText }));
    }
  }
  
  return runs.length > 0 ? runs : [new TextRun({ text })];
}