import React, { useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useEditorStore } from '../../stores/editorStore';
import { useThemeStore } from '../../stores/themeStore';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { rehypeHighlightCustom } from '../../lib/rehypeHighlightCustom';
import 'katex/dist/katex.css';
import '../../styles/syntax-highlighting.css';


/**
 * Props for the MarkdownPreview component
 */
interface MarkdownPreviewProps {
  /** Optional ref for scroll synchronization */
  scrollRef?: React.RefObject<HTMLDivElement>;
}

/**
 * Renders markdown content with live preview
 * 
 * Features:
 * - GitHub Flavored Markdown (GFM) support
 * - Syntax highlighting for code blocks
 * - LaTeX math rendering with KaTeX
 * - Dark mode support
 * - Synchronized scrolling capability
 * 
 * @component
 * @example
 * ```tsx
 * const previewRef = useRef<HTMLDivElement>(null)
 * <MarkdownPreview scrollRef={previewRef} />
 * ```
 */
export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ scrollRef }) => {
  const { content } = useEditorStore();
  const { isDarkMode } = useThemeStore();
  
  useEffect(() => {
    // Force update wmde-markdown to use correct color mode
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.wmde-markdown');
      elements.forEach(el => {
        el.setAttribute('data-color-mode', isDarkMode ? 'dark' : 'light');
      });
    }, 0);
    
    return () => clearTimeout(timer);
  }, [isDarkMode, content]);

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Preview
        </h2>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-auto p-6 scroll-smooth" tabIndex={0}>
        <div className="prose prose-sm max-w-none markdown-body markdown-preview-content">
          <MDEditor.Markdown
            source={content || '*Start typing to see preview...*'}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeHighlightCustom, rehypeKatex]}
            components={{
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                
                return match ? (
                  <code className={className} {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="inline-code" {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};