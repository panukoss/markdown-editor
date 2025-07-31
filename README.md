# Markdown Editor

A modern, browser-based markdown editor with live preview and export capabilities. Built with React, TypeScript, and Vite.

## Features

- 📝 Real-time markdown editing with syntax highlighting
- 👀 Live preview with synchronized scrolling
- 🎨 Multiple preview themes
- 📄 Export to PDF and DOC formats
- 📋 Quick copy buttons for markdown and rendered HTML
- ⌨️ Keyboard shortcuts
- 🌓 Dark/light mode
- 💾 Auto-save to browser storage
- 📱 Responsive design

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Development

### Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── lib/           # Core functionality
├── stores/        # Zustand state stores
├── styles/        # CSS and themes
└── types/         # TypeScript types
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Usage

### Basic Editing

1. Type or paste markdown in the left editor pane
2. See the rendered output in the right preview pane
3. Use the toolbar for common formatting options

### Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save to browser storage
- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + K` - Insert link
- `Ctrl/Cmd + /` - Toggle comment
- `F11` - Full screen mode

### Export Options

Click the export button to download your document as:
- PDF with customizable page size and margins
- DOC file compatible with Microsoft Word
- HTML file with embedded styles
- Raw markdown file

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.