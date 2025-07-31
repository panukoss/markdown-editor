import './App.css';
import { AppLayout } from './components/Layout/AppLayout';
import { MarkdownEditor } from './components/Editor/MarkdownEditor';
import { MarkdownPreview } from './components/Preview/MarkdownPreview';
import { DebugInfo } from './components/Common/DebugInfo';

function App() {
  return (
    <>
      <AppLayout 
        editor={<MarkdownEditor />}
        preview={<MarkdownPreview />}
      />
      <DebugInfo />
    </>
  );
}

export default App;