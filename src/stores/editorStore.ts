import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EditorStore {
  content: string;
  lastSaved: Date | null;
  isAutoSaveEnabled: boolean;
  setContent: (content: string) => void;
  setLastSaved: (date: Date) => void;
  toggleAutoSave: () => void;
}

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