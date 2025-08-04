import React, { useState } from 'react';
import { Copy, FileText, Code, Check, AlertCircle } from 'lucide-react';
import { useEditorStore } from '../../stores/editorStore';
import { copyToClipboard, copyRichText, getRenderedHTML, getPlainTextWithFormatting } from '../../utils/copyUtils';

export const CopyModal: React.FC = () => {
  const { content } = useEditorStore();
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: 'success' | 'error' | null }>({});

  const handleCopyMarkdown = async () => {
    const success = await copyToClipboard(content);
    setCopyStatus({ ...copyStatus, markdown: success ? 'success' : 'error' });
    setTimeout(() => {
      setCopyStatus({ ...copyStatus, markdown: null });
    }, 2000);
  };

  const handleCopyHTML = async () => {
    // Get the preview element
    const previewElement = document.querySelector('.markdown-preview-content');
    if (!previewElement) {
      setCopyStatus({ ...copyStatus, html: 'error' });
      return;
    }

    const htmlContent = getRenderedHTML(previewElement as HTMLElement);
    const success = await copyRichText(htmlContent);
    setCopyStatus({ ...copyStatus, html: success ? 'success' : 'error' });
    setTimeout(() => {
      setCopyStatus({ ...copyStatus, html: null });
    }, 2000);
  };

  const handleCopyPlainText = async () => {
    // Get the preview element and extract text content
    const previewElement = document.querySelector('.markdown-preview-content');
    if (!previewElement) {
      setCopyStatus({ ...copyStatus, plain: 'error' });
      return;
    }

    const plainText = getPlainTextWithFormatting(previewElement as HTMLElement);
    const success = await copyToClipboard(plainText);
    setCopyStatus({ ...copyStatus, plain: success ? 'success' : 'error' });
    setTimeout(() => {
      setCopyStatus({ ...copyStatus, plain: null });
    }, 2000);
  };

  const options = [
    {
      id: 'markdown',
      title: 'Markdown Source',
      description: 'Copy the raw markdown text',
      icon: <FileText className="w-5 h-5" />,
      action: handleCopyMarkdown,
      disabled: !content
    },
    {
      id: 'html',
      title: 'HTML',
      description: 'Copy the rendered HTML with formatting',
      icon: <Code className="w-5 h-5" />,
      action: handleCopyHTML,
      disabled: !content
    },
    {
      id: 'plain',
      title: 'Plain Text',
      description: 'Copy as plain text without formatting',
      icon: <Copy className="w-5 h-5" />,
      action: handleCopyPlainText,
      disabled: !content
    }
  ];

  return (
    <div className="space-y-4">
      {!content && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
            <AlertCircle className="w-5 h-5" />
            <span>No content to copy. Please add some text to the editor.</span>
          </div>
        </div>
      )}
      
      <div className="grid gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={option.action}
            disabled={option.disabled}
            className={`
              flex items-center gap-4 p-4 rounded-lg border transition-all text-left w-full
              ${option.disabled 
                ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed' 
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
          >
            <div className={`
              p-2 rounded-lg
              ${option.disabled 
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500' 
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              }
            `}>
              {option.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white">{option.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
            </div>
            {copyStatus[option.id] === 'success' && (
              <div className="text-green-600 dark:text-green-400">
                <Check className="w-5 h-5" />
              </div>
            )}
            {copyStatus[option.id] === 'error' && (
              <div className="text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};