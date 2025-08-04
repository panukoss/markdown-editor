import React, { useEffect, useRef } from 'react';
import { useEditorStore } from '../../stores/editorStore';
// import { useThemeStore } from '../../stores/themeStore';
import { EditorToolbar } from './EditorToolbar';

/**
 * Props for the MarkdownEditor component
 */
interface MarkdownEditorProps {
  /** Optional ref for scroll synchronization */
  scrollRef?: React.RefObject<HTMLTextAreaElement>;
}

/**
 * Main editor component for markdown input
 * 
 * Features:
 * - Auto-save functionality with 2-second debounce
 * - Keyboard shortcuts for formatting (Bold: Ctrl+B, Italic: Ctrl+I, Link: Ctrl+L)
 * - Dark mode support
 * - Synchronized scrolling capability
 * 
 * @component
 * @example
 * ```tsx
 * const editorRef = useRef<HTMLTextAreaElement>(null)
 * <MarkdownEditor scrollRef={editorRef} />
 * ```
 */
export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ scrollRef }) => {
  const { content, setContent, setLastSaved, isAutoSaveEnabled } = useEditorStore();
  // const { isDarkMode } = useThemeStore();
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();
  const textareaRef = scrollRef || useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isAutoSaveEnabled && content) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        setLastSaved(new Date());
      }, 2000); // Auto-save after 2 seconds of inactivity
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [content, isAutoSaveEnabled, setLastSaved]);

  /**
   * Handles keyboard shortcuts for text formatting
   * @param e - Keyboard event from textarea
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          insertText('**', '**');
          break;
        case 'i':
          e.preventDefault();
          insertText('*', '*');
          break;
        case 'l':
          e.preventDefault();
          insertText('[', '](url)');
          break;
      }
    }
  };

  /**
   * Inserts text at current cursor position with optional wrapping
   * @param before - Text to insert before selection
   * @param after - Text to insert after selection (optional)
   */
  const insertText = (before: string, after: string = '') => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
    
    setContent(newText);
    
    // Restore focus and set cursor position
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newCursorPos = start + before.length + selectedText.length;
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Editor
        </h2>
        {isAutoSaveEnabled && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Auto-save enabled
          </span>
        )}
      </div>
      <EditorToolbar />
      <div className="flex-1 overflow-hidden">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="editor-textarea w-full h-full p-4 resize-none font-mono text-sm focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="Start typing your markdown here..."
          spellCheck={false}
        />
      </div>
    </div>
  );
};