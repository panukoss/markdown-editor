import React from 'react';
import { useEditorStore } from '../../stores/editorStore';

export const MarkdownEditor: React.FC = () => {
  const { content, setContent } = useEditorStore();

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Editor
        </h2>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-4 resize-none font-mono text-sm focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        placeholder="Start typing your markdown here..."
      />
    </div>
  );
};