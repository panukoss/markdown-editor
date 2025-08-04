import React from 'react';
import { Moon, Sun, Save, Download, Copy, HelpCircle } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';
import { useModalStore } from '../../stores/modalStore';

export const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { openHelp, openExport, openCopy } = useModalStore();

  return (
    <header className="border-b bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Markdown Editor
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
            title="Save (Ctrl+S)"
          >
            <Save size={20} />
          </button>
          
          <button
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
            title="Export"
            onClick={openExport}
          >
            <Download size={20} />
          </button>
          
          <button
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
            title="Copy"
            onClick={openCopy}
          >
            <Copy size={20} />
          </button>
          
          <button
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
            title="Help"
            onClick={openHelp}
          >
            <HelpCircle size={20} />
          </button>
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};