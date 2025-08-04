# API Documentation

## Table of Contents

- [Components](#components)
  - [Editor Components](#editor-components)
  - [Preview Components](#preview-components)
  - [Layout Components](#layout-components)
  - [Modal Components](#modal-components)
  - [UI Components](#ui-components)
- [Hooks](#hooks)
- [Stores](#stores)
- [Utilities](#utilities)
- [Export Functions](#export-functions)
- [Types](#types)

## Components

### Editor Components

#### `MarkdownEditor`

The main editor component that provides a textarea for markdown input.

```typescript
interface MarkdownEditorProps {
  onScroll?: (scrollTop: number, scrollHeight: number) => void
}
```

**Usage:**
```tsx
<MarkdownEditor onScroll={handleScroll} />
```

**Features:**
- Auto-save functionality
- Keyboard shortcuts (Bold: Ctrl+B, Italic: Ctrl+I, Link: Ctrl+L)
- Synchronized scrolling support
- Focus management

### Preview Components

#### `MarkdownPreview`

Renders markdown content with syntax highlighting and math support.

```typescript
interface MarkdownPreviewProps {
  onScroll?: (scrollTop: number, scrollHeight: number) => void
}
```

**Usage:**
```tsx
<MarkdownPreview onScroll={handleScroll} />
```

**Features:**
- GitHub Flavored Markdown support
- Syntax highlighting via Highlight.js
- KaTeX math rendering
- XSS protection with DOMPurify
- Synchronized scrolling

### Layout Components

#### `AppLayout`

Main layout wrapper that provides the application structure.

```typescript
interface AppLayoutProps {
  children: React.ReactNode
}
```

**Usage:**
```tsx
<AppLayout>
  {/* Application content */}
</AppLayout>
```

#### `Header`

Application header with toolbar actions and theme toggle.

```typescript
// No props - uses internal store connections
```

**Features:**
- Save status indicator
- Export, Copy, and Help buttons
- Dark mode toggle
- Responsive design

### Modal Components

#### `Modal`

Base modal component for consistent modal behavior.

```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}
```

**Usage:**
```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="Export Options">
  {/* Modal content */}
</Modal>
```

#### `ExportModal`

Modal for selecting export format.

```typescript
// No props - uses modal store
```

**Export Options:**
- PDF Export
- Word Document (DOCX)
- Markdown File

#### `CopyModal`

Modal for copying content in different formats.

```typescript
// No props - uses modal store
```

**Copy Formats:**
- Markdown (raw text)
- HTML (rich text)
- Plain Text (formatted)

#### `CommandPalette`

Searchable command interface for all application actions.

```typescript
// No props - uses modal store
```

**Features:**
- Fuzzy search
- Keyboard navigation
- Shortcut display
- Action execution

### UI Components

#### `HelpDocumentation`

Comprehensive help content with markdown syntax guide.

```typescript
// No props - pure presentation component
```

## Hooks

### `useKeyboardShortcuts`

Manages all keyboard shortcuts with context awareness.

```typescript
function useKeyboardShortcuts(): void
```

**Registered Shortcuts:**
```typescript
const shortcuts = [
  { key: 'b', ctrl: true, handler: () => {}, description: 'Bold' },
  { key: 'i', ctrl: true, handler: () => {}, description: 'Italic' },
  { key: 'l', ctrl: true, handler: () => {}, description: 'Link' },
  { key: 's', ctrl: true, handler: () => {}, description: 'Save' },
  { key: 'k', ctrl: true, handler: () => {}, description: 'Command Palette' },
  { key: 'e', ctrl: true, handler: () => {}, description: 'Export' },
  { key: 'y', ctrl: true, shift: true, handler: () => {}, description: 'Copy' },
  { key: 'd', ctrl: true, shift: true, handler: () => {}, description: 'Toggle Dark Mode' },
  { key: 'p', ctrl: true, shift: true, handler: () => {}, description: 'Export as PDF' },
  { key: 'd', ctrl: true, shift: true, alt: true, handler: () => {}, description: 'Export as Word' },
  { key: 'm', ctrl: true, shift: true, handler: () => {}, description: 'Export as Markdown' },
  { key: '/', ctrl: true, handler: () => {}, description: 'Help' }
]
```

### `useSyncScroll`

Synchronizes scrolling between editor and preview panes.

```typescript
interface UseSyncScrollOptions {
  sourceRef: React.RefObject<HTMLElement>
  targetRef: React.RefObject<HTMLElement>
  enabled?: boolean
}

function useSyncScroll(options: UseSyncScrollOptions): void
```

**Usage:**
```tsx
const editorRef = useRef<HTMLTextAreaElement>(null)
const previewRef = useRef<HTMLDivElement>(null)

useSyncScroll({
  sourceRef: editorRef,
  targetRef: previewRef,
  enabled: focusedPane === 'editor'
})
```

## Stores

### `editorStore`

Manages editor content and auto-save state.

```typescript
interface EditorStore {
  content: string
  lastSaved: Date | null
  isAutoSaveEnabled: boolean
  setContent: (content: string) => void
  setLastSaved: (date: Date) => void
  toggleAutoSave: () => void
}
```

**Usage:**
```tsx
import { useEditorStore } from '@/stores/editorStore'

const { content, setContent } = useEditorStore()
```

### `modalStore`

Controls modal visibility states.

```typescript
interface ModalStore {
  isExportOpen: boolean
  isCopyOpen: boolean
  isHelpOpen: boolean
  isCommandPaletteOpen: boolean
  openExport: () => void
  closeExport: () => void
  openCopy: () => void
  closeCopy: () => void
  openHelp: () => void
  closeHelp: () => void
  openCommandPalette: () => void
  closeCommandPalette: () => void
  closeAll: () => void
}
```

### `themeStore`

Manages dark mode state with persistence.

```typescript
interface ThemeStore {
  isDarkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (isDark: boolean) => void
}
```

## Utilities

### `copyUtils`

Clipboard operations with fallback support.

#### `copyToClipboard`

```typescript
async function copyToClipboard(text: string): Promise<boolean>
```

Copies plain text to clipboard using modern API with fallback.

#### `copyRichText`

```typescript
async function copyRichText(htmlContent: string): Promise<boolean>
```

Copies formatted HTML as rich text.

#### `getRenderedHTML`

```typescript
function getRenderedHTML(element: HTMLElement): string
```

Extracts HTML with inline styles for rich text copying.

#### `getPlainTextWithFormatting`

```typescript
function getPlainTextWithFormatting(element: HTMLElement): string
```

Converts HTML to plain text while preserving structure (lists, indentation).

## Export Functions

### `exportToPDF`

```typescript
async function exportToPDF(content: string, fileName: string): Promise<void>
```

Generates a PDF from markdown content with:
- Syntax highlighting
- Proper pagination
- Styled elements
- A4 page format

### `exportToDocx`

```typescript
async function exportToDocx(content: string, fileName: string): Promise<void>
```

Creates a Word document with:
- Heading hierarchy
- Table formatting
- List bullets/numbering
- Code block styling
- Bold/italic formatting

### `exportToMarkdown`

```typescript
function exportToMarkdown(content: string, fileName: string): void
```

Downloads raw markdown content as a .md file.

## Types

### Core Types

```typescript
// Markdown content type
type MarkdownContent = string

// Export format options
type ExportFormat = 'pdf' | 'docx' | 'markdown'

// Copy format options
type CopyFormat = 'markdown' | 'html' | 'plain'

// Theme options
type Theme = 'light' | 'dark' | 'system'

// Keyboard shortcut definition
interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  handler: () => void
  description: string
}

// Command for command palette
interface Command {
  id: string
  name: string
  shortcut?: string
  handler: () => void
}
```

### Component Props Types

```typescript
// Modal size options
type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

// Scroll event handler
type ScrollHandler = (scrollTop: number, scrollHeight: number) => void

// Focus pane options
type FocusedPane = 'editor' | 'preview' | null
```

## Examples

### Creating a Custom Export

```typescript
import { exportToPDF } from '@/lib/export/exportPDF'
import { useEditorStore } from '@/stores/editorStore'

function CustomExportButton() {
  const { content } = useEditorStore()
  
  const handleExport = async () => {
    try {
      await exportToPDF(content, 'my-document')
      console.log('Export successful!')
    } catch (error) {
      console.error('Export failed:', error)
    }
  }
  
  return <button onClick={handleExport}>Export PDF</button>
}
```

### Adding a New Keyboard Shortcut

```typescript
// In useKeyboardShortcuts hook
const shortcuts = [
  // ... existing shortcuts
  {
    key: 'r',
    ctrl: true,
    alt: true,
    handler: () => {
      // Custom action
      console.log('Custom shortcut triggered!')
    },
    description: 'Custom Action'
  }
]
```

### Using the Copy Utilities

```typescript
import { copyToClipboard, copyRichText } from '@/utils/copyUtils'

// Copy plain text
const success = await copyToClipboard('Hello, world!')

// Copy rich text
const html = '<p><strong>Hello</strong>, <em>world</em>!</p>'
const richSuccess = await copyRichText(html)
```

## Best Practices

1. **State Management**: Use Zustand stores for shared state
2. **Performance**: Memoize expensive computations
3. **Accessibility**: Include proper ARIA labels
4. **Error Handling**: Always handle async operations with try/catch
5. **Type Safety**: Use TypeScript types for all props and returns