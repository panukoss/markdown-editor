# Developer Guide - Markdown Editor

## Overview

This is a client-side React application for editing and previewing markdown with export capabilities. All processing happens in the browser with no backend dependencies.

## Architecture

### Core Technologies
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Zustand** for state management
- **Tailwind CSS** for styling

### Key Components

#### Editor System
- `MarkdownEditor`: Main editor component using @uiw/react-md-editor
- `EditorToolbar`: Formatting buttons and actions
- `EditorSettings`: Configuration panel for editor preferences

#### Preview System
- `MarkdownPreview`: Real-time markdown rendering
- `PreviewThemes`: Theme switcher for preview styles
- `SyncScroll`: Synchronized scrolling between editor and preview

#### Export System
- `PDFExporter`: Generates PDF using jsPDF
- `DOCXExporter`: Creates Word documents using docx
- `HTMLExporter`: Exports standalone HTML

### State Management

We use Zustand stores for different concerns:

```typescript
// editorStore.ts - Editor state
interface EditorStore {
  content: string
  selection: Selection
  history: HistoryItem[]
  // ... methods
}

// previewStore.ts - Preview state
interface PreviewStore {
  theme: string
  scrollPosition: number
  renderOptions: RenderOptions
  // ... methods
}

// settingsStore.ts - App settings
interface SettingsStore {
  editorTheme: string
  fontSize: number
  autoSave: boolean
  // ... methods
}
```

## Development Workflow

### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Code Organization
- `/components` - React components organized by feature
- `/hooks` - Custom React hooks
- `/lib` - Core business logic (parsers, exporters)
- `/stores` - Zustand state stores
- `/types` - TypeScript type definitions
- `/utils` - Helper functions

### Adding New Features

1. **New Markdown Plugin**
   - Add plugin to `lib/markdown/plugins.ts`
   - Update parser configuration
   - Add UI controls if needed

2. **New Export Format**
   - Create exporter in `lib/export/`
   - Add to export modal options
   - Update types in `types/export.ts`

3. **New Theme**
   - Add CSS to `styles/themes/`
   - Register in `lib/markdown/themes.ts`
   - Update theme selector

### Testing Strategy

- **Unit Tests**: Components and utilities
- **Integration Tests**: Editor-preview sync, exports
- **E2E Tests**: Full user workflows

### Performance Considerations

- Debounced preview updates (100ms)
- Virtualized scrolling for large documents
- Lazy loading for export libraries
- Web Workers for heavy processing

## API Integration

While frontend-only, the app exposes:
- URL parameters for configuration
- PostMessage API for embedding
- Custom events for extensions

## Troubleshooting

### Common Issues

1. **Preview not updating**
   - Check console for parser errors
   - Verify debounce timing
   - Check store subscriptions

2. **Export failing**
   - Verify library loaded
   - Check memory limits
   - Review console errors

3. **Performance issues**
   - Profile with React DevTools
   - Check render frequency
   - Review store updates

## Contributing

1. Follow TypeScript strict mode
2. Use Prettier formatting
3. Write tests for new features
4. Update documentation
5. Check accessibility