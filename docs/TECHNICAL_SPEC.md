# Technical Specification - Markdown Editor Implementation

## Architecture Overview

A standalone React application that runs entirely in the browser with no backend dependencies. All markdown processing, rendering, and file exports happen client-side for maximum privacy and performance.

## Technology Stack (As Implemented)

### Core Framework
- **React 18.3.1**: UI framework with hooks and concurrent features
- **TypeScript 5.2.2**: Type safety and enhanced developer experience
- **Vite 5.0.10**: Lightning-fast build tool and dev server

### UI & Styling
- **Tailwind CSS v4.0.0-beta.4**: Utility-first CSS with dark mode support
- **Lucide React 0.462.0**: Modern, tree-shakeable icon library
- **React Resizable Panels 2.1.7**: Flexible split-pane implementation

### Markdown Processing
- **Marked.js 14.1.2**: Fast markdown parser with GFM support
- **Highlight.js 11.10.0**: Syntax highlighting for 180+ languages
- **KaTeX 0.16.11**: High-quality math equation rendering
- **DOMPurify 3.2.2**: XSS sanitization for safe HTML rendering

### Export Libraries
- **jsPDF 2.5.2**: Client-side PDF generation
- **html2canvas 1.4.1**: HTML to canvas conversion for PDF
- **docx 9.0.2**: Microsoft Word document generation
- **file-saver 2.0.5**: Cross-browser file downloading

### State Management
- **Zustand 5.0.2**: Lightweight state management with persistence
- **Local Storage**: Auto-save and preference persistence

### Development Tools
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting
- **TypeScript**: Compile-time type checking

## Actual Project Structure

```
markdown-editor/
├── src/
│   ├── components/
│   │   ├── modals/           # Centralized modal components
│   │   │   ├── CopyModal.tsx
│   │   │   ├── ExportModal.tsx
│   │   │   └── Modal.tsx
│   │   ├── CommandPalette/
│   │   │   └── CommandPalette.tsx
│   │   ├── Editor/
│   │   │   └── MarkdownEditor.tsx
│   │   ├── Help/
│   │   │   └── HelpDocumentation.tsx
│   │   ├── Layout/
│   │   │   ├── AppLayout.tsx
│   │   │   └── Header.tsx
│   │   └── Preview/
│   │       └── MarkdownPreview.tsx
│   ├── hooks/
│   │   ├── useKeyboardShortcuts.ts
│   │   └── useSyncScroll.ts
│   ├── lib/
│   │   └── export/
│   │       ├── exportDocx.ts
│   │       ├── exportMarkdown.ts
│   │       └── exportPDF.ts
│   ├── stores/
│   │   ├── editorStore.ts
│   │   ├── modalStore.ts
│   │   └── themeStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── copyUtils.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── docs/                     # Comprehensive documentation
├── tests/
│   └── plans/               # Test plans and QA documentation
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Implementation Details

### 1. Editor Component

The editor uses a native `<textarea>` element enhanced with:
- **Real-time Updates**: Immediate state synchronization
- **Auto-save**: Debounced persistence to localStorage
- **Keyboard Shortcuts**: Bold (Ctrl+B), Italic (Ctrl+I), Link (Ctrl+L)
- **Focus Management**: Proper focus handling for shortcuts
- **Resizable**: Via react-resizable-panels

```typescript
interface EditorState {
  content: string
  lastSaved: Date | null
  isAutoSaveEnabled: boolean
  setContent: (content: string) => void
  setLastSaved: (date: Date) => void
  toggleAutoSave: () => void
}
```

### 2. Preview Component

Real-time markdown rendering with:
- **Marked.js Pipeline**: Markdown → HTML with custom renderer
- **Syntax Highlighting**: Highlight.js integration
- **Math Support**: KaTeX for LaTeX equations
- **Safe Rendering**: DOMPurify sanitization
- **Synchronized Scrolling**: Bidirectional sync with editor

Features supported:
- GitHub Flavored Markdown
- Tables with styling
- Task lists
- Code blocks with language detection
- Blockquotes
- Nested lists
- LaTeX math expressions

### 3. Export System

#### PDF Export
```typescript
// Implementation approach:
- Create temporary container with print-optimized styles
- Render markdown to HTML with syntax highlighting
- Use html2canvas to capture rendered content
- Generate PDF with jsPDF
- Handle pagination for long documents
- Clean up temporary elements
```

#### DOCX Export
```typescript
// Implementation approach:
- Parse markdown using marked.lexer
- Convert tokens to Word document structure
- Apply appropriate styles for each element
- Support tables, lists, code blocks, and formatting
- Generate binary DOCX file
- Trigger download via file-saver
```

### 4. Copy System

Three copy formats with modern Clipboard API:
```typescript
// Markdown: Raw markdown text
await navigator.clipboard.writeText(markdown)

// HTML: Rich text for document pasting
await navigator.clipboard.write([
  new ClipboardItem({ 'text/html': htmlBlob })
])

// Plain Text: Formatted with preserved structure
const formattedText = getPlainTextWithFormatting(element)
await navigator.clipboard.writeText(formattedText)
```

### 5. State Management Architecture

```typescript
// Editor Store (Persistent)
interface EditorStore {
  content: string
  lastSaved: Date | null
  isAutoSaveEnabled: boolean
  // ... methods
}

// Modal Store (Session)
interface ModalStore {
  isExportOpen: boolean
  isCopyOpen: boolean
  isHelpOpen: boolean
  isCommandPaletteOpen: boolean
  // ... methods
}

// Theme Store (Persistent)
interface ThemeStore {
  isDarkMode: boolean
  toggleDarkMode: () => void
}
```

### 6. Keyboard Shortcut System

Context-aware shortcuts with:
- **Global Shortcuts**: Work everywhere (Save, Export, etc.)
- **Editor Shortcuts**: Only when editor is focused
- **Conflict Resolution**: Proper handling of browser shortcuts
- **Command Palette**: Searchable interface for all commands

### 7. Performance Optimizations

- **Debounced Preview**: 300ms delay for smooth typing
- **Memoized Components**: React.memo for expensive renders
- **Lazy Modal Loading**: Modals render only when opened
- **Efficient Scroll Sync**: RAF-based synchronization
- **Optimized Builds**: Tree-shaking and minification

## Security Considerations

- **Client-side Only**: No data leaves the browser
- **XSS Prevention**: DOMPurify sanitization
- **Content Security**: No external resource loading
- **Safe Export**: Generated files contain no active content
- **Local Storage**: Data stored only in user's browser

## Browser Compatibility

Tested and supported:
- Chrome/Edge 90+ ✓
- Firefox 88+ ✓
- Safari 14+ ✓
- Opera 76+ ✓
- Mobile browsers (limited functionality)

## Development Workflow

### Setup
```bash
git clone <repository>
cd markdown-editor
npm install
npm run dev
```

### Available Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist node_modules"
  }
}
```

### Build Output
- **Dist Size**: ~3.5MB (includes all libraries)
- **Initial Load**: <2s on 3G
- **Static Files**: Ready for CDN deployment
- **No Server Required**: Pure client-side application

## Deployment

The built application is a collection of static files that can be hosted anywhere:

1. **GitHub Pages**: Free hosting for public repos
2. **Netlify/Vercel**: Automatic deployments from Git
3. **AWS S3 + CloudFront**: Scalable CDN distribution
4. **Nginx/Apache**: Traditional web server hosting
5. **Docker**: Container with nginx for consistent deployment

## Future Enhancements

Based on the original specification, potential additions:
1. **File Upload**: Drag-and-drop markdown file import
2. **URL Import**: Fetch markdown from remote URLs
3. **Mermaid Diagrams**: Flowchart and diagram support
4. **Custom Themes**: User-defined preview themes
5. **Plugin System**: Extensible markdown processing
6. **Mobile App**: React Native implementation
7. **PWA Features**: Offline support and installation