import { useEffect } from 'react';
import { useModalStore } from '../stores/modalStore';
import { useThemeStore } from '../stores/themeStore';
import { useEditorStore } from '../stores/editorStore';
import { exportToDocx } from '../utils/exportDocx';
import { exportToPDF } from '../utils/exportPDF';
import { exportToMarkdown } from '../utils/exportMarkdown';

interface ShortcutHandler {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  handler: () => void;
  description: string;
}

export const useKeyboardShortcuts = () => {
  const { openHelp, openExport, openCopy, openCommandPalette } = useModalStore();
  const { toggleDarkMode } = useThemeStore();
  const { content, setLastSaved } = useEditorStore();

  const shortcuts: ShortcutHandler[] = [
    {
      key: 's',
      ctrl: true,
      handler: () => {
        // Save functionality
        setLastSaved(new Date());
        // Show save notification
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = 'Document saved';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
      },
      description: 'Save document'
    },
    {
      key: 'k',
      ctrl: true,
      handler: () => {
        openCommandPalette();
      },
      description: 'Open command palette'
    },
    {
      key: 'e',
      ctrl: true,
      handler: () => {
        openExport();
      },
      description: 'Export document'
    },
    {
      key: 'y',
      ctrl: true,
      shift: true,
      handler: () => {
        openCopy();
      },
      description: 'Copy options'
    },
    {
      key: 'd',
      ctrl: true,
      shift: true,
      handler: () => {
        toggleDarkMode();
      },
      description: 'Toggle dark mode'
    },
    {
      key: '/',
      ctrl: true,
      handler: () => {
        openHelp();
      },
      description: 'Show help'
    },
    {
      key: 'p',
      ctrl: true,
      shift: true,
      handler: async () => {
        if (content) {
          const date = new Date().toISOString().split('T')[0];
          await exportToPDF(content, `document_${date}`);
        }
      },
      description: 'Quick export to PDF'
    },
    {
      key: 'd',
      ctrl: true,
      shift: true,
      alt: true,
      handler: async () => {
        if (content) {
          const date = new Date().toISOString().split('T')[0];
          await exportToDocx(content, `document_${date}`);
        }
      },
      description: 'Quick export to Word'
    },
    {
      key: 'm',
      ctrl: true,
      shift: true,
      handler: () => {
        if (content) {
          const date = new Date().toISOString().split('T')[0];
          exportToMarkdown(content, `document_${date}`);
        }
      },
      description: 'Quick export markdown'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInEditor = target.tagName === 'TEXTAREA' && target.classList.contains('editor-textarea');
      const isInInput = target.tagName === 'INPUT' || (target.tagName === 'TEXTAREA' && !isInEditor);
      
      // Check each shortcut
      for (const shortcut of shortcuts) {
        const ctrlPressed = e.ctrlKey || e.metaKey;
        const matchesKey = e.key.toLowerCase() === shortcut.key;
        const matchesCtrl = shortcut.ctrl ? ctrlPressed : !ctrlPressed;
        const matchesShift = shortcut.shift ? e.shiftKey : !e.shiftKey;
        const matchesAlt = shortcut.alt ? e.altKey : !e.altKey;

        if (matchesKey && matchesCtrl && matchesShift && matchesAlt) {
          // Skip editor-specific shortcuts when not in editor or when in other inputs
          if (isInInput && !isInEditor) {
            continue;
          }
          
          // For app-level shortcuts (those with shift or alt modifiers), always handle them
          if (shortcut.shift || shortcut.alt || shortcut.key === 's' || shortcut.key === 'e' || shortcut.key === '/') {
            e.preventDefault();
            shortcut.handler();
            break;
          }
          
          
          e.preventDefault();
          shortcut.handler();
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [content, shortcuts]);

  return shortcuts;
};