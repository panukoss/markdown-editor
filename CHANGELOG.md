# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-04

### Added
- Initial release of the Markdown Editor
- Core editor functionality with live preview
- Real-time markdown rendering with synchronized scrolling
- GitHub Flavored Markdown (GFM) support
- Syntax highlighting for 180+ languages via Highlight.js
- LaTeX math equation rendering with KaTeX
- Light and dark mode with system preference detection
- Auto-save functionality with localStorage persistence
- Export functionality:
  - PDF export with syntax highlighting and pagination
  - DOCX export with proper formatting and structure
  - Markdown file download
- Copy functionality in three formats:
  - Raw markdown text
  - HTML (rich text) for document pasting
  - Plain text with preserved formatting
- Comprehensive keyboard shortcuts:
  - Text formatting (Bold: Ctrl+B, Italic: Ctrl+I, Link: Ctrl+L)
  - Save (Ctrl+S)
  - Command Palette (Ctrl+K)
  - Export options (Ctrl+E)
  - Copy options (Ctrl+Shift+Y)
  - Dark mode toggle (Ctrl+Shift+D)
  - Quick exports (PDF: Ctrl+Shift+P, Word: Ctrl+Shift+Alt+D, Markdown: Ctrl+Shift+M)
  - Help (Ctrl+/)
- Command Palette with fuzzy search for all actions
- Resizable split-pane layout
- Comprehensive help documentation
- Full JSDoc documentation for all components
- Architecture Decision Records (ADRs)
- Developer guide and API documentation

### Technical Stack
- React 18.3.1 with TypeScript 5.2.2
- Vite 5.0.10 for build tooling
- Tailwind CSS v4.0.0-beta.4 for styling
- Zustand 5.0.2 for state management
- Marked.js 14.1.2 for markdown parsing
- Highlight.js 11.10.0 for syntax highlighting
- KaTeX 0.16.11 for math rendering
- jsPDF 2.5.2 & html2canvas 1.4.1 for PDF generation
- docx 9.0.2 for Word document generation

### Security
- All processing done client-side for privacy
- XSS protection with DOMPurify
- No external data transmission

### Known Issues
- Mobile browser support is limited
- Large documents may have performance impact on PDF export
- Mermaid diagram support not yet implemented

## [0.9.0] - 2025-08-03 (Pre-release)

### Added
- Beta testing phase with core features
- Initial implementation of editor and preview
- Basic export functionality

## [0.1.0] - 2025-01-15 (Alpha)

### Added
- Project initialization
- Basic project structure
- Development environment setup