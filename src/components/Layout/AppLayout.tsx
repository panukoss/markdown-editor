import React, { useEffect } from 'react';
import { Header } from './Header';
import { SplitPane } from './SplitPane';
import { useThemeStore } from '../../stores/themeStore';
import { useModalStore } from '../../stores/modalStore';
import { Modal } from '../Modal/Modal';
import { HelpDocumentation } from '../Help/HelpDocumentation';
import { ExportModal } from '../Export/ExportModal';
import { Sun, Moon } from 'lucide-react';

interface AppLayoutProps {
  editor: React.ReactNode;
  preview: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ editor, preview }) => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { isHelpOpen, closeHelp, isExportOpen, closeExport } = useModalStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 overflow-hidden">
        <SplitPane left={editor} right={preview} />
      </main>
      
      <Modal
        isOpen={isHelpOpen}
        onClose={closeHelp}
        title="Help & Documentation"
        size="xl"
        headerAction={
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        }
      >
        <HelpDocumentation />
      </Modal>
      
      <Modal
        isOpen={isExportOpen}
        onClose={closeExport}
        title="Export Document"
        size="md"
      >
        <ExportModal />
      </Modal>
    </div>
  );
};