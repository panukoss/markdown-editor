# Project Structure

This document outlines the organization of the Markdown Editor project.

## Directory Structure

```
markdown-editor/
├── docs/                       # Project documentation
│   ├── CLAUDE.md              # AI assistant guidelines
│   ├── CONTRIBUTING.md        # Contribution guidelines
│   ├── DEVELOPER_GUIDE.md     # Developer documentation
│   ├── PROJECT_STRUCTURE.md   # This file
│   ├── SPECIFICATION.md       # Feature specifications
│   └── TECHNICAL_SPEC.md      # Technical architecture
│
├── tests/                      # Test documentation
│   └── plans/                 # Test plans by phase
│       ├── TEST_PLAN_PHASE1.md
│       ├── TEST_PLAN_PHASE2.md
│       ├── TEST_PLAN_PHASE3.md
│       ├── TEST_PLAN_PHASE4.md
│       ├── TEST_PLAN_PHASE5.md
│       └── fixes/             # Test fixes and validations
│           ├── TEST_PLAN_PHASE1_FIXES.md
│           ├── TEST_PLAN_PHASE5_FIXES.md
│           ├── TEST_PLAN_PHASE5_FIXES_COMPLETE.md
│           └── TEST_PLAN_FINAL_FIXES.md
│
├── src/                        # Source code
│   ├── components/            # React components
│   │   ├── CommandPalette/    # Command palette component
│   │   ├── Common/           # Shared components
│   │   ├── Editor/           # Editor components
│   │   ├── Help/             # Help documentation component
│   │   ├── Layout/           # Layout components
│   │   ├── modals/           # All modal components
│   │   │   ├── Modal.tsx     # Base modal component
│   │   │   ├── CopyModal.tsx
│   │   │   └── ExportModal.tsx
│   │   └── Preview/          # Preview components
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useKeyboardShortcuts.ts
│   │   └── useSyncScroll.ts
│   │
│   ├── lib/                  # Library code
│   │   ├── export/           # Export utilities
│   │   │   ├── exportDocx.ts
│   │   │   ├── exportMarkdown.ts
│   │   │   └── exportPDF.ts
│   │   └── rehypeHighlightCustom.ts
│   │
│   ├── stores/               # State management (Zustand)
│   │   ├── editorStore.ts
│   │   ├── modalStore.ts
│   │   └── themeStore.ts
│   │
│   ├── styles/               # CSS and styling
│   │   └── syntax-highlighting.css
│   │
│   ├── types/                # TypeScript type definitions
│   │   ├── index.ts
│   │   ├── editor.types.ts
│   │   ├── export.types.ts
│   │   └── modal.types.ts
│   │
│   ├── utils/                # Utility functions
│   │   └── copyUtils.ts
│   │
│   ├── App.tsx               # Root component
│   ├── App.css              # App styles
│   ├── index.css            # Global styles
│   └── main.tsx             # Entry point
│
├── Configuration Files
│   ├── .eslintrc.cjs        # ESLint config
│   ├── .gitignore           # Git ignore rules
│   ├── .prettierrc          # Prettier config
│   ├── package.json         # NPM package config
│   ├── tsconfig.json        # TypeScript config
│   ├── tsconfig.node.json   # TypeScript Node config
│   └── vite.config.ts       # Vite build config
│
├── README.md                # Main project documentation
├── index.html               # HTML template
└── setup-commands.sh        # Setup automation script
```

## Component Organization

### Modals
All modal components are consolidated in `src/components/modals/`:
- `Modal.tsx` - Base modal component with focus management
- `CopyModal.tsx` - Copy functionality with multiple formats
- `ExportModal.tsx` - Export to PDF/DOCX/Markdown

### Export Utilities
Export functionality is organized in `src/lib/export/`:
- `exportPDF.ts` - PDF generation using jsPDF
- `exportDocx.ts` - Word document generation
- `exportMarkdown.ts` - Markdown file download

### State Management
Zustand stores in `src/stores/`:
- `editorStore.ts` - Editor content and auto-save state
- `modalStore.ts` - Modal visibility state
- `themeStore.ts` - Theme preferences with persistence

### Type Definitions
TypeScript types in `src/types/`:
- `editor.types.ts` - Editor-related types
- `export.types.ts` - Export and copy types
- `modal.types.ts` - Modal component types

## Key Design Decisions

1. **Documentation Organization**: All docs moved to `docs/` directory for cleaner root
2. **Test Plans**: Organized by phase with fixes in subdirectory
3. **Modal Consolidation**: All modals in single directory for consistency
4. **Export Library**: Export utilities separated into `lib/export/`
5. **Type Safety**: Dedicated types directory for better organization

## Import Path Examples

```typescript
// Modal imports
import { Modal } from '@/components/modals/Modal';
import { CopyModal } from '@/components/modals/CopyModal';

// Export utilities
import { exportToPDF } from '@/lib/export/exportPDF';

// Types
import { Command, ModalProps } from '@/types';

// Stores
import { useEditorStore } from '@/stores/editorStore';
```

## Future Improvements

1. Add unit tests in `src/__tests__/` directory
2. Create `src/constants/` for app constants
3. Add `src/lib/markdown/` for markdown processing utilities
4. Implement theme files in `src/styles/themes/`
5. Add integration tests alongside test plans