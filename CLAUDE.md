# CLAUDE.md - AI Agent Instructions

## Project Overview

This is a **Markdown Editor** - a modern, feature-rich web application built with React, TypeScript, and Vite. It provides real-time preview, syntax highlighting, and comprehensive export capabilities. All processing is done client-side for privacy and performance.

**Current Version**: 1.0.0 (Stable Release)

## Key Features Implemented

### Core Functionality
- ✅ Live markdown preview with synchronized scrolling
- ✅ Syntax highlighting for 180+ languages
- ✅ LaTeX math rendering with KaTeX
- ✅ Dark/light mode with persistence
- ✅ Auto-save to localStorage
- ✅ GitHub Flavored Markdown support

### Export Features
- ✅ PDF export with syntax highlighting
- ✅ DOCX export with proper formatting
- ✅ Markdown file download
- ✅ Copy as Markdown/HTML/Plain Text

### User Interface
- ✅ Command Palette (Ctrl/Cmd+K)
- ✅ Comprehensive keyboard shortcuts
- ✅ Resizable split panes
- ✅ Modal system for exports and settings
- ✅ Help documentation

## Technology Stack

```json
{
  "react": "18.3.1",
  "typescript": "5.2.2",
  "vite": "5.0.10",
  "tailwindcss": "4.0.0-beta.4",
  "zustand": "5.0.2",
  "marked": "14.1.2",
  "highlight.js": "11.10.0",
  "katex": "0.16.11",
  "jspdf": "2.5.2",
  "docx": "9.0.2"
}
```

## Project Structure

```
markdown-editor/
├── src/
│   ├── components/
│   │   ├── modals/         # Modal components (Export, Copy, etc.)
│   │   ├── CommandPalette/ # Command palette component
│   │   ├── Editor/         # Markdown editor
│   │   ├── Preview/        # Preview pane
│   │   ├── Layout/         # Layout components
│   │   └── Help/           # Help documentation
│   ├── hooks/              # Custom React hooks
│   ├── lib/
│   │   └── export/         # Export utilities (PDF, DOCX, MD)
│   ├── stores/             # Zustand state management
│   ├── utils/              # Utility functions
│   └── types/              # TypeScript definitions
├── docs/                   # Comprehensive documentation
│   ├── ARCHITECTURE.md     # System architecture with PlantUML diagrams
│   ├── API.md             # Component and utility API docs
│   ├── DEVELOPER_GUIDE.md  # Development setup and workflow
│   ├── DEPLOYMENT.md       # Deployment instructions
│   ├── SPECIFICATION.md    # Feature specification (planned vs implemented)
│   ├── TECHNICAL_SPEC.md   # Technical implementation details
│   └── adr/               # Architecture Decision Records
├── tests/
│   └── plans/             # Test plans and QA documentation
└── dist/                  # Production build output
```

## Important Working Guidelines

### Git Workflow
- **DO NOT** make git commits unless explicitly ordered to do so
- User needs to validate work before commits
- Always show what will be committed before committing

### Code Style
- Use TypeScript with strict type checking
- Follow existing code patterns and conventions
- Add JSDoc comments for all exported functions/components
- Use Tailwind CSS utilities, avoid custom CSS
- Ensure dark mode support for all UI changes

### State Management
- Use Zustand stores for shared state
- Persist user preferences to localStorage
- Keep component state local when possible

### Testing Requirements
Before any changes:
1. Run `npm run build` to ensure no build errors
2. Test all export formats (PDF, DOCX, Markdown)
3. Verify keyboard shortcuts still work
4. Check dark mode appearance
5. Test in Chrome, Firefox, and Safari

## Common Tasks

### Adding a New Feature
1. Check existing patterns in similar components
2. Update relevant Zustand store if needed
3. Add keyboard shortcut if applicable
4. Update help documentation
5. Test thoroughly before marking complete

### Fixing Bugs
1. Reproduce the issue first
2. Check browser console for errors
3. Review relevant component and store code
4. Test fix across all browsers
5. Ensure no regression in other features

### Adding Keyboard Shortcuts
1. Edit `src/hooks/useKeyboardShortcuts.ts`
2. Check for conflicts with existing shortcuts
3. Update help documentation
4. Add to command palette if applicable

### Modifying Export Functionality
1. Export code is in `src/lib/export/`
2. Test with various markdown content
3. Ensure proper error handling
4. Check output quality and formatting

## Current Known Issues
- Mobile browser support is limited
- Large documents may impact performance
- Mermaid diagram support not implemented

## Build and Deploy

```bash
# Development
npm install
npm run dev

# Production build
npm run build
npm run preview

# The dist/ folder contains static files ready for deployment
```

## Key Files to Know

- `src/App.tsx` - Main application component
- `src/stores/editorStore.ts` - Editor content and settings
- `src/stores/modalStore.ts` - Modal visibility states
- `src/hooks/useKeyboardShortcuts.ts` - All keyboard shortcuts
- `src/lib/export/` - Export functionality
- `src/components/CommandPalette/CommandPalette.tsx` - Command palette

## Documentation

Always refer to these docs for detailed information:
- `/docs/ARCHITECTURE.md` - System design and architecture
- `/docs/API.md` - Component and utility APIs
- `/docs/DEVELOPER_GUIDE.md` - Development workflow
- `/docs/adr/` - Architecture decisions and rationale

## Recent Changes (v1.0.0)

- Implemented comprehensive keyboard shortcuts
- Added command palette with fuzzy search
- Created three copy formats (Markdown, HTML, Plain Text)
- Fixed scroll synchronization to be bidirectional
- Resolved keyboard shortcut conflicts
- Enhanced dark mode styling
- Improved plain text copy formatting
- Fixed PDF export for large documents
- Fixed DOCX export TypeScript errors
- Reorganized project structure
- Created comprehensive documentation

## When Working on This Project

1. **Read First**: Always check the relevant documentation before making changes
2. **Test Thoroughly**: Use the manual testing checklist in DEVELOPER_GUIDE.md
3. **Preserve Features**: Don't break existing functionality
4. **Document Changes**: Update relevant documentation and CHANGELOG.md
5. **Follow Patterns**: Maintain consistency with existing code patterns

Remember: This is a production-ready application. Quality and stability are paramount.