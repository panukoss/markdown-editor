import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Editor state management store
 */
interface EditorStore {
  /** Current markdown content */
  content: string;
  /** Timestamp of last save */
  lastSaved: Date | null;
  /** Whether auto-save is enabled */
  isAutoSaveEnabled: boolean;
  /** Update editor content */
  setContent: (content: string) => void;
  /** Update last saved timestamp */
  setLastSaved: (date: Date) => void;
  /** Toggle auto-save on/off */
  toggleAutoSave: () => void;
}

/**
 * Zustand store for editor state with persistence
 * 
 * Automatically persists content and settings to localStorage.
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { content, setContent } = useEditorStore()
 *   return <textarea value={content} onChange={(e) => setContent(e.target.value)} />
 * }
 * ```
 */
export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      content: '# Welcome to Markdown Editor\n\nStart typing to see the preview update in real-time!\n\n## Features\n\n- **Bold** and *italic* text\n- Lists and checkboxes\n- Code blocks with syntax highlighting\n- Tables\n- And much more!\n\n```javascript\nfunction hello() {\n  console.log("Hello, World!");\n}\n```',
      lastSaved: null,
      isAutoSaveEnabled: true,
      setContent: (content) => set({ content }),
      setLastSaved: (date) => set({ lastSaved: date }),
      toggleAutoSave: () => set((state) => ({ isAutoSaveEnabled: !state.isAutoSaveEnabled })),
    }),
    {
      name: 'editor-storage',
    }
  )
);