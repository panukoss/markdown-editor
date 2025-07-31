import React from 'react';
import { useEditorStore } from '../../stores/editorStore';

export const MarkdownPreview: React.FC = () => {
  const { content } = useEditorStore();

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Preview
        </h2>
      </div>
      <div className="flex-1 p-4 overflow-auto text-gray-900 dark:text-gray-100">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {content || <p className="text-gray-500 italic">Start typing to see preview...</p>}
        </div>
      </div>
    </div>
  );
};