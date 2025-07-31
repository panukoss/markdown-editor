import React, { useState } from 'react';
import { Book, Keyboard, FileText, Download, Lightbulb, ChevronRight } from 'lucide-react';

interface HelpSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const HelpDocumentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('getting-started');

  const sections: HelpSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Book className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Welcome to Markdown Editor</h3>
          <p className="text-gray-600 dark:text-gray-400">
            This is a powerful markdown editor with live preview, syntax highlighting, and export capabilities.
          </p>
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>Real-time markdown preview</li>
              <li>Synchronized scrolling between editor and preview</li>
              <li>Syntax highlighting for code blocks</li>
              <li>Dark/Light theme support</li>
              <li>Export to PDF and DOCX formats</li>
              <li>Auto-save functionality</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'markdown-syntax',
      title: 'Markdown Syntax',
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Markdown Syntax Guide</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Headings</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm text-gray-900 dark:text-gray-100">
{`# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`}
              </pre>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Text Formatting</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm text-gray-900 dark:text-gray-100">
{`**Bold text**
*Italic text*
~~Strikethrough~~
\`Inline code\`
> Blockquote`}
              </pre>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Lists</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm text-gray-900 dark:text-gray-100">
{`Unordered List:
- Item 1
- Item 2
  - Nested item

Ordered List:
1. First item
2. Second item
3. Third item`}
              </pre>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Links and Images</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm text-gray-900 dark:text-gray-100">
{`[Link text](https://example.com)
![Alt text](image-url.jpg)`}
              </pre>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Code Blocks</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm text-gray-900 dark:text-gray-100">
{`\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\``}
              </pre>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tables</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm text-gray-900 dark:text-gray-100">
{`| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |`}
              </pre>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Math Equations (LaTeX)</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm text-gray-900 dark:text-gray-100">
{`Inline math: $E = mc^2$

Block math:
$$
\\sum_{i=1}^{n} x_i = \\frac{n(n+1)}{2}
$$`}
              </pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'keyboard-shortcuts',
      title: 'Keyboard Shortcuts',
      icon: <Keyboard className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Keyboard Shortcuts</h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-600 dark:text-gray-400">Bold</div>
              <div className="text-gray-900 dark:text-white font-mono text-sm">Ctrl/Cmd + B</div>
              
              <div className="text-gray-600 dark:text-gray-400">Italic</div>
              <div className="text-gray-900 dark:text-white font-mono text-sm">Ctrl/Cmd + I</div>
              
              <div className="text-gray-600 dark:text-gray-400">Link</div>
              <div className="text-gray-900 dark:text-white font-mono text-sm">Ctrl/Cmd + K</div>
              
              <div className="text-gray-600 dark:text-gray-400">Save</div>
              <div className="text-gray-900 dark:text-white font-mono text-sm">Ctrl/Cmd + S</div>
              
              <div className="text-gray-600 dark:text-gray-400">Undo</div>
              <div className="text-gray-900 dark:text-white font-mono text-sm">Ctrl/Cmd + Z</div>
              
              <div className="text-gray-600 dark:text-gray-400">Redo</div>
              <div className="text-gray-900 dark:text-white font-mono text-sm">Ctrl/Cmd + Shift + Z</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'export-options',
      title: 'Export Options',
      icon: <Download className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Export Options</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">PDF Export</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Export your markdown document as a PDF file. The PDF will maintain your formatting,
                including headings, lists, code blocks with syntax highlighting, and tables.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">DOCX Export</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Export to Microsoft Word format (.docx). This format preserves your document structure
                and allows for further editing in word processors.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Markdown Export</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Save your raw markdown file (.md) for use in other markdown editors or version control systems.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tips-tricks',
      title: 'Tips & Tricks',
      icon: <Lightbulb className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tips & Tricks</h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">Auto-Save</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Your work is automatically saved to browser storage every few seconds. You won't lose your work!
              </p>
            </div>
            
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-1">Synchronized Scrolling</h4>
              <p className="text-sm text-green-700 dark:text-green-400">
                The editor and preview panes scroll together, making it easy to see your changes in real-time.
              </p>
            </div>
            
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-1">Code Highlighting</h4>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                Specify the language after opening backticks for syntax highlighting: ```javascript, ```python, etc.
              </p>
            </div>
            
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-1">Resizable Panes</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                Drag the divider between editor and preview to adjust their sizes according to your preference.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex h-full -m-4">
      {/* Sidebar Navigation */}
      <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex-shrink-0 flex flex-col">
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {section.icon}
              <span className="text-sm font-medium">{section.title}</span>
              {activeSection === section.id && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {sections.find(s => s.id === activeSection)?.content}
        </div>
      </div>
    </div>
  );
};