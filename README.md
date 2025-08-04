# Markdown Editor

A modern, feature-rich markdown editor built with React, TypeScript, and Vite. This single-page application provides real-time preview, syntax highlighting, and comprehensive export capabilities. All processing is done client-side for privacy and performance.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.2.2-blue.svg)
![React](https://img.shields.io/badge/react-%5E18.3.1-blue.svg)
![Vite](https://img.shields.io/badge/vite-%5E5.0.10-blue.svg)

## Features

### Core Editing
- **Live Preview**: Real-time markdown rendering with bidirectional synchronized scrolling
- **Syntax Highlighting**: Code blocks with language-specific highlighting via Highlight.js
- **Auto-Save**: Automatic saving to browser storage with persistence across sessions
- **Theme Support**: Light and dark modes with system preference detection and persistence
- **Resizable Split View**: Adjustable editor/preview panes with smooth resizing

### Rich Text Features
- **GitHub Flavored Markdown**: Full GFM support including tables, task lists, and strikethrough
- **LaTeX Math**: Mathematical equations using KaTeX renderer
- **Code Highlighting**: 180+ language support via Highlight.js
- **Enhanced Tables**: Properly styled table rendering
- **Lists**: Support for nested ordered and unordered lists
- **Blockquotes**: Styled blockquote rendering
- **Links**: Automatic link detection and styling

### Export Options
- **PDF Export**: High-quality PDF generation with syntax highlighting and proper pagination
- **Word Document**: DOCX export with formatting, tables, lists, and code blocks
- **Markdown File**: Download raw markdown content
- **Copy Formats**: 
  - Copy as Markdown: Raw markdown text
  - Copy as HTML: Rich text with formatting for pasting into documents
  - Copy as Plain Text: Formatted plain text with proper list bullets

### Keyboard Shortcuts
| Action | Shortcut |
|--------|----------|
| Bold | `Ctrl/Cmd + B` |
| Italic | `Ctrl/Cmd + I` |
| Link | `Ctrl/Cmd + L` |
| Save | `Ctrl/Cmd + S` |
| Command Palette | `Ctrl/Cmd + K` |
| Export Options | `Ctrl/Cmd + E` |
| Copy Options | `Ctrl/Cmd + Shift + Y` |
| Toggle Dark Mode | `Ctrl/Cmd + Shift + D` |
| Quick Export PDF | `Ctrl/Cmd + Shift + P` |
| Quick Export Word | `Ctrl/Cmd + Shift + Alt + D` |
| Quick Export Markdown | `Ctrl/Cmd + Shift + M` |
| Help | `Ctrl/Cmd + /` |

### User Interface
- **Command Palette**: Quick access to all commands with fuzzy search (Ctrl/Cmd+K)
- **Modal System**: Clean, accessible modals for exports, copy options, and help
- **Toolbar Actions**: Quick access buttons for save, export, copy, and help
- **Status Indicators**: Real-time save status and timestamps
- **Error Handling**: User-friendly error messages and recovery
- **Dark Mode Toggle**: Persistent theme switching in header

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/markdown-editor.git
cd markdown-editor

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## Architecture Overview

The application follows a component-based architecture with clear separation of concerns:

- **Frontend Framework**: React 18 with TypeScript for type safety
- **State Management**: Zustand stores with localStorage persistence
- **Build Tool**: Vite 5 for fast development and optimized production builds
- **Styling**: Tailwind CSS v4 beta with dark mode support
- **Export System**: Client-side PDF and DOCX generation
- **Copy System**: Modern Clipboard API with fallback support

For detailed architecture diagrams and documentation, see [Architecture Documentation](docs/ARCHITECTURE.md).

## Project Structure

```
markdown-editor/
├── src/
│   ├── components/       # React components
│   │   ├── modals/      # Modal components
│   │   ├── Editor/      # Editor components
│   │   ├── Preview/     # Preview components
│   │   └── Layout/      # Layout components
│   ├── hooks/           # Custom React hooks
│   ├── stores/          # Zustand state stores
│   ├── lib/             # Library code
│   │   └── export/      # Export utilities
│   ├── utils/           # Helper utilities
│   └── types/           # TypeScript definitions
├── docs/                # Documentation
├── tests/               # Test plans
└── dist/                # Production build
```

## Technology Stack

- **Frontend Framework**: React 18.3.1 with TypeScript 5.2.2
- **Build Tool**: Vite 5.0.10 for fast development and optimized builds
- **Styling**: Tailwind CSS v4.0.0-beta.4 with dark mode support
- **State Management**: Zustand 5.0.2 for simple, performant state with persistence
- **Markdown Parsing**: Marked.js 14.1.2 with GFM support
- **Code Highlighting**: Highlight.js 11.10.0 with 180+ languages
- **Math Rendering**: KaTeX 0.16.11 for LaTeX equations
- **PDF Generation**: jsPDF 2.5.2 with html2canvas 1.4.1
- **DOCX Generation**: docx 9.0.2 with file-saver 2.0.5
- **Icons**: Lucide React 0.462.0
- **UI Components**: React Resizable Panels 2.1.7

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+
- Mobile browsers with limited functionality (desktop recommended for full features)

## Contributing

Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Documentation

- [Architecture Documentation](docs/ARCHITECTURE.md) - Comprehensive architecture with PlantUML diagrams
- [Developer Guide](docs/DEVELOPER_GUIDE.md) - Setup and development workflow
- [Technical Specification](docs/TECHNICAL_SPEC.md) - Implementation details
- [API Documentation](docs/API.md) - Component and utility APIs
- [Deployment Guide](docs/DEPLOYMENT.md) - Production deployment instructions
- [Original Specification](docs/SPECIFICATION.md) - Initial project requirements

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Marked.js](https://marked.js.org/) for markdown parsing
- [Highlight.js](https://highlightjs.org/) for syntax highlighting
- [KaTeX](https://katex.org/) for math rendering
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Zustand](https://zustand-demo.pmnd.rs/) for state management