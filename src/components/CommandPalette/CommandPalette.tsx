import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useModalStore } from '../../stores/modalStore';
import { useThemeStore } from '../../stores/themeStore';
import { useEditorStore } from '../../stores/editorStore';
import { exportToDocx } from '../../utils/exportDocx';
import { exportToPDF } from '../../utils/exportPDF';
import { exportToMarkdown } from '../../utils/exportMarkdown';

interface Command {
  id: string;
  title: string;
  category: string;
  shortcut?: string;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { openHelp, openExport, openCopy, closeCommandPalette } = useModalStore() as any;
  const { toggleDarkMode } = useThemeStore();
  const { content, setLastSaved } = useEditorStore();

  const commands: Command[] = [
    {
      id: 'save',
      title: 'Save Document',
      category: 'File',
      shortcut: 'Ctrl+S',
      action: () => {
        setLastSaved(new Date());
        closeCommandPalette();
      }
    },
    {
      id: 'export',
      title: 'Export Document...',
      category: 'File',
      shortcut: 'Ctrl+E',
      action: () => {
        closeCommandPalette();
        openExport();
      }
    },
    {
      id: 'export-pdf',
      title: 'Export as PDF',
      category: 'File',
      shortcut: 'Ctrl+Shift+P',
      action: async () => {
        if (content) {
          const date = new Date().toISOString().split('T')[0];
          await exportToPDF(content, `document_${date}`);
        }
        closeCommandPalette();
      }
    },
    {
      id: 'export-word',
      title: 'Export as Word Document',
      category: 'File',
      shortcut: 'Ctrl+Shift+Alt+D',
      action: async () => {
        if (content) {
          const date = new Date().toISOString().split('T')[0];
          await exportToDocx(content, `document_${date}`);
        }
        closeCommandPalette();
      }
    },
    {
      id: 'export-markdown',
      title: 'Export as Markdown',
      category: 'File',
      shortcut: 'Ctrl+Shift+M',
      action: () => {
        if (content) {
          const date = new Date().toISOString().split('T')[0];
          exportToMarkdown(content, `document_${date}`);
        }
        closeCommandPalette();
      }
    },
    {
      id: 'copy',
      title: 'Copy Options...',
      category: 'Edit',
      shortcut: 'Ctrl+Shift+Y',
      action: () => {
        closeCommandPalette();
        openCopy();
      }
    },
    {
      id: 'toggle-theme',
      title: 'Toggle Dark Mode',
      category: 'View',
      shortcut: 'Ctrl+Shift+D',
      action: () => {
        toggleDarkMode();
        closeCommandPalette();
      }
    },
    {
      id: 'help',
      title: 'Show Help',
      category: 'Help',
      shortcut: 'Ctrl+/',
      action: () => {
        closeCommandPalette();
        openHelp();
      }
    }
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
        break;
      case 'Escape':
        e.preventDefault();
        closeCommandPalette();
        break;
    }
  };

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  let currentIndex = -1;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command or search..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        <button
          onClick={closeCommandPalette}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="mt-2 max-h-96 overflow-y-auto">
        {Object.entries(groupedCommands).map(([category, cmds]) => (
          <div key={category} className="mb-4">
            <div className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
              {category}
            </div>
            {cmds.map((cmd) => {
              currentIndex++;
              const isSelected = currentIndex === selectedIndex;
              
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="font-medium">{cmd.title}</span>
                  {cmd.shortcut && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                      {cmd.shortcut}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
        
        {filteredCommands.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No commands found
          </div>
        )}
      </div>
    </div>
  );
};