import React, { useEffect } from 'react';
import { Header } from './Header';
import { SplitPane } from './SplitPane';
import { useThemeStore } from '../../stores/themeStore';

interface AppLayoutProps {
  editor: React.ReactNode;
  preview: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ editor, preview }) => {
  const { isDarkMode } = useThemeStore();

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
    </div>
  );
};