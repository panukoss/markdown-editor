# Technical Specification - Frontend-Only Markdown Editor

## Architecture Overview

A standalone React application that runs entirely in the browser with no backend dependencies. All markdown processing, rendering, and file exports happen client-side.

## Technology Stack

### Core Framework
- **React 18+**: UI framework with hooks
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast build tool and dev server

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Headless UI**: Unstyled, accessible UI components
- **Lucide React**: Modern icon library
- **Framer Motion**: Smooth animations

### Markdown Processing
- **@uiw/react-md-editor**: React markdown editor component
- **remark**: Markdown processor with plugin ecosystem
- **rehype**: HTML processor for rendering
- **Prism.js**: Syntax highlighting for code blocks
- **KaTeX**: Math equation rendering
- **Mermaid**: Diagram support

### Export Libraries
- **jsPDF**: PDF generation
- **html2canvas**: Converting HTML to canvas for PDF
- **docx**: Creating Word documents
- **file-saver**: Downloading generated files

### State Management
- **Zustand**: Lightweight state management
- **React Query**: For any potential API calls
- **Local Storage**: Persisting user preferences and auto-save

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Vitest**: Unit testing
- **Playwright**: E2E testing
- **Storybook**: Component development

## Project Structure

```
markdown-editor/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Editor/
│   │   │   ├── MarkdownEditor.tsx
│   │   │   ├── EditorToolbar.tsx
│   │   │   └── EditorSettings.tsx
│   │   ├── Preview/
│   │   │   ├── MarkdownPreview.tsx
│   │   │   ├── PreviewThemes.tsx
│   │   │   └── PreviewSettings.tsx
│   │   ├── Layout/
│   │   │   ├── AppLayout.tsx
│   │   │   ├── SplitPane.tsx
│   │   │   └── Header.tsx
│   │   ├── Modals/
│   │   │   ├── ExportModal.tsx
│   │   │   ├── SettingsModal.tsx
│   │   │   └── HelpModal.tsx
│   │   └── Common/
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       └── Toast.tsx
│   ├── hooks/
│   │   ├── useMarkdown.ts
│   │   ├── useExport.ts
│   │   ├── useLocalStorage.ts
│   │   └── useTheme.ts
│   ├── lib/
│   │   ├── markdown/
│   │   │   ├── parser.ts
│   │   │   ├── plugins.ts
│   │   │   └── themes.ts
│   │   ├── export/
│   │   │   ├── pdf.ts
│   │   │   ├── docx.ts
│   │   │   └── html.ts
│   │   └── utils/
│   │       ├── clipboard.ts
│   │       └── storage.ts
│   ├── stores/
│   │   ├── editorStore.ts
│   │   ├── previewStore.ts
│   │   └── settingsStore.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── themes/
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Implementation Details

### 1. Editor Component
```typescript
// Key features:
- Monaco Editor or CodeMirror for editing
- Configurable syntax highlighting
- Vim/Emacs key bindings option
- Auto-save with debouncing
- Find/Replace functionality
- Multiple cursor support
```

### 2. Preview Component
```typescript
// Rendering pipeline:
- Markdown → remark AST → rehype AST → React components
- Plugin support for:
  - GitHub Flavored Markdown
  - Math equations (KaTeX)
  - Mermaid diagrams
  - Footnotes
  - Task lists
  - Tables
```

### 3. Export Functionality
```typescript
// PDF Export:
- Custom page layouts
- Headers/footers
- Table of contents
- Syntax highlighted code blocks
- Embedded images (base64)

// DOCX Export:
- Structured document with styles
- Heading hierarchy
- Lists and tables
- Image embedding
- Code block formatting
```

### 4. State Management
```typescript
// Zustand stores:
interface EditorState {
  content: string
  cursor: Position
  history: HistoryStack
  setContent: (content: string) => void
  undo: () => void
  redo: () => void
}

interface PreviewState {
  theme: Theme
  scrollSync: boolean
  renderOptions: RenderOptions
}

interface SettingsState {
  editorTheme: string
  fontSize: number
  wordWrap: boolean
  autoSave: boolean
}
```

### 5. Local Storage Strategy
```typescript
// Auto-save implementation:
- Debounced saves every 10 seconds
- Store content with timestamp
- Restore on page load
- Clear old auto-saves (>7 days)
- Conflict resolution for multiple tabs
```

## Development Workflow

### Initial Setup
```bash
npm create vite@latest markdown-editor -- --template react-ts
cd markdown-editor
npm install
```

### Development Commands
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint src --ext ts,tsx",
    "format": "prettier --write src",
    "storybook": "storybook dev -p 6006"
  }
}
```

## Deployment

### Build Output
- Static files only
- No server required
- Can be hosted on:
  - GitHub Pages
  - Netlify
  - Vercel
  - AWS S3 + CloudFront
  - Any static hosting

### Performance Optimizations
- Code splitting for export libraries
- Lazy loading for themes and plugins
- Web Workers for heavy processing
- Virtual scrolling for large documents
- Debounced preview updates

## API Specification (Optional Enhancement)

While the app is frontend-only, we can expose functionality through:
1. URL parameters for sharing
2. PostMessage API for embedding
3. Custom events for integration
4. Export hooks for extensions

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- No IE support

## Security Considerations

- All processing happens client-side
- No data sent to external servers
- CSP headers for XSS protection
- Sanitized HTML output
- Sandboxed preview rendering