import './App.css';
import { useRef } from 'react';
import { AppLayout } from './components/Layout/AppLayout';
import { MarkdownEditor } from './components/Editor/MarkdownEditor';
import { MarkdownPreview } from './components/Preview/MarkdownPreview';
import { useSyncScroll } from './hooks/useSyncScroll';

function App() {
  const editorScrollRef = useRef<HTMLTextAreaElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);

  // Enable synchronized scrolling from editor to preview
  useSyncScroll({
    sourceRef: editorScrollRef,
    targetRef: previewScrollRef,
    enabled: true
  });

  return (
    <AppLayout 
      editor={<MarkdownEditor scrollRef={editorScrollRef} />}
      preview={<MarkdownPreview scrollRef={previewScrollRef} />}
    />
  );
}

export default App;