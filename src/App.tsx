import './App.css';
import { useRef, useState, useEffect } from 'react';
import { AppLayout } from './components/Layout/AppLayout';
import { MarkdownEditor } from './components/Editor/MarkdownEditor';
import { MarkdownPreview } from './components/Preview/MarkdownPreview';
import { useSyncScroll } from './hooks/useSyncScroll';

function App() {
  const editorScrollRef = useRef<HTMLTextAreaElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const [focusedPane, setFocusedPane] = useState<'editor' | 'preview' | null>(null);

  // Track which pane has focus
  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (editorScrollRef.current?.contains(target)) {
        setFocusedPane('editor');
      } else if (previewScrollRef.current?.contains(target)) {
        setFocusedPane('preview');
      }
    };

    const handleMouseEnter = (pane: 'editor' | 'preview') => {
      setFocusedPane(pane);
    };

    const editor = editorScrollRef.current;
    const preview = previewScrollRef.current;

    // Use both focus and mouse enter for better UX
    document.addEventListener('focusin', handleFocus);
    editor?.addEventListener('mouseenter', () => handleMouseEnter('editor'));
    preview?.addEventListener('mouseenter', () => handleMouseEnter('preview'));

    return () => {
      document.removeEventListener('focusin', handleFocus);
      editor?.removeEventListener('mouseenter', () => handleMouseEnter('editor'));
      preview?.removeEventListener('mouseenter', () => handleMouseEnter('preview'));
    };
  }, []);

  // Enable synchronized scrolling from editor to preview (only when editor is focused)
  useSyncScroll({
    sourceRef: editorScrollRef,
    targetRef: previewScrollRef,
    enabled: focusedPane === 'editor'
  });

  // Enable synchronized scrolling from preview to editor (only when preview is focused)
  useSyncScroll({
    sourceRef: previewScrollRef,
    targetRef: editorScrollRef,
    enabled: focusedPane === 'preview'
  });

  return (
    <AppLayout 
      editor={<MarkdownEditor scrollRef={editorScrollRef} />}
      preview={<MarkdownPreview scrollRef={previewScrollRef} />}
    />
  );
}

export default App;