import React from 'react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link, 
  Image,
  Table,
  Minus
} from 'lucide-react';
import { useEditorStore } from '../../stores/editorStore';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
    >
      {icon}
    </button>
  );
};

export const EditorToolbar: React.FC = () => {
  const { content, setContent } = useEditorStore();

  const insertText = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
    
    setContent(newText);
    
    // Restore focus and set cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertLinePrefix = (prefix: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = content.lastIndexOf('\n', start - 1) + 1;
    const newText = content.substring(0, lineStart) + prefix + content.substring(lineStart);
    
    setContent(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length);
    }, 0);
  };

  return (
    <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
      <ToolbarButton
        icon={<Bold size={18} />}
        title="Bold (Ctrl+B)"
        onClick={() => insertText('**', '**')}
      />
      <ToolbarButton
        icon={<Italic size={18} />}
        title="Italic (Ctrl+I)"
        onClick={() => insertText('*', '*')}
      />
      
      <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" />
      
      <ToolbarButton
        icon={<Quote size={18} />}
        title="Quote"
        onClick={() => insertLinePrefix('> ')}
      />
      <ToolbarButton
        icon={<Code size={18} />}
        title="Code"
        onClick={() => insertText('`', '`')}
      />
      <ToolbarButton
        icon={<Link size={18} />}
        title="Link"
        onClick={() => insertText('[', '](url)')}
      />
      <ToolbarButton
        icon={<Image size={18} />}
        title="Image"
        onClick={() => insertText('![alt text](', ')')}
      />
      
      <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" />
      
      <ToolbarButton
        icon={<List size={18} />}
        title="Unordered List"
        onClick={() => insertLinePrefix('- ')}
      />
      <ToolbarButton
        icon={<ListOrdered size={18} />}
        title="Ordered List"
        onClick={() => insertLinePrefix('1. ')}
      />
      <ToolbarButton
        icon={<Table size={18} />}
        title="Table"
        onClick={() => insertText('\n| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n', '')}
      />
      <ToolbarButton
        icon={<Minus size={18} />}
        title="Horizontal Rule"
        onClick={() => insertText('\n---\n', '')}
      />
    </div>
  );
};