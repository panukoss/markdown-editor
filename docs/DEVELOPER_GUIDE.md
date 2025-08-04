# Developer Guide

## Table of Contents

- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Testing](#testing)
- [Building](#building)
- [Debugging](#debugging)
- [Contributing](#contributing)

## Getting Started

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher
- **Git**: For version control
- **VS Code** (recommended): With recommended extensions

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/markdown-editor.git
   cd markdown-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### VS Code Extensions

Recommended extensions for the best development experience:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "csstools.postcss",
    "yoavbls.pretty-ts-errors",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

## Development Environment

### Environment Variables

Create a `.env.local` file for local development:

```bash
# Example environment variables (currently none required)
# VITE_API_URL=http://localhost:3000
```

### Browser Extensions

Useful browser extensions:
- **React Developer Tools**: Debug React components
- **Redux DevTools**: Monitor Zustand stores
- **Lighthouse**: Performance auditing

## Project Structure

```
markdown-editor/
├── src/
│   ├── components/          # React components
│   │   ├── modals/         # Modal components
│   │   ├── CommandPalette/ # Command palette
│   │   ├── Editor/         # Editor components
│   │   ├── Help/           # Help documentation
│   │   ├── Layout/         # Layout components
│   │   └── Preview/        # Preview components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Library code
│   │   └── export/         # Export utilities
│   ├── stores/             # Zustand stores
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Application entry
│   └── index.css           # Global styles
├── public/                 # Static assets
├── docs/                   # Documentation
│   └── adr/               # Architecture decisions
├── tests/                  # Test files
│   └── plans/             # Test plans
└── [config files]          # Configuration
```

### Key Files

- `src/App.tsx` - Main application component with layout
- `src/stores/editorStore.ts` - Editor state management
- `src/components/Editor/MarkdownEditor.tsx` - Main editor
- `src/components/Preview/MarkdownPreview.tsx` - Preview pane
- `src/hooks/useKeyboardShortcuts.ts` - Keyboard handling

## Development Workflow

### 1. Feature Development

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and test
npm run dev

# Run type checking
npm run typecheck

# Commit changes
git add .
git commit -m "feat: add your feature"

# Push to remote
git push origin feature/your-feature-name
```

### 2. Component Development

When creating new components:

```typescript
// src/components/YourComponent/YourComponent.tsx
import React from 'react'

/**
 * Component description
 */
interface YourComponentProps {
  /** Prop description */
  prop: string
}

/**
 * Component documentation
 */
export const YourComponent: React.FC<YourComponentProps> = ({ prop }) => {
  return <div>{prop}</div>
}
```

### 3. State Management

Adding new stores:

```typescript
// src/stores/yourStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface YourStore {
  value: string
  setValue: (value: string) => void
}

export const useYourStore = create<YourStore>()(
  persist(
    (set) => ({
      value: '',
      setValue: (value) => set({ value })
    }),
    { name: 'your-storage' }
  )
)
```

### 4. Adding Keyboard Shortcuts

Add to `src/hooks/useKeyboardShortcuts.ts`:

```typescript
{
  key: 'n',
  ctrl: true,
  handler: () => {
    // Your handler
  },
  description: 'New action'
}
```

## Code Style

### TypeScript Guidelines

- Use explicit types for function parameters
- Prefer interfaces over types for objects
- Use const assertions for literal types
- Document all exported functions and components

### React Guidelines

- Use functional components with hooks
- Memoize expensive computations
- Use proper dependency arrays in hooks
- Keep components focused and small

### Tailwind CSS Guidelines

- Use utility classes, avoid custom CSS
- Follow mobile-first responsive design
- Use dark mode variants consistently
- Extract repeated patterns to components

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `PascalCase.ts`
- Hooks: `useCamelCase.ts`

## Testing

### Running Tests

```bash
# Type checking
npm run typecheck

# Linting (when configured)
npm run lint

# Build test
npm run build
```

### Manual Testing Checklist

Before submitting changes:

- [ ] Editor functionality works
- [ ] Preview updates in real-time
- [ ] Dark mode toggles properly
- [ ] Keyboard shortcuts function
- [ ] Export features work (PDF, DOCX, MD)
- [ ] Copy features work in all formats
- [ ] No console errors
- [ ] Responsive design maintained

## Building

### Development Build

```bash
npm run dev
```

Features:
- Hot Module Replacement (HMR)
- Source maps
- Fast refresh
- Error overlay

### Production Build

```bash
npm run build
```

Output:
- Minified bundles in `dist/`
- Optimized assets
- Tree-shaken code
- Compressed output

### Preview Production Build

```bash
npm run preview
```

## Debugging

### Common Issues

1. **Build Errors**
   ```bash
   # Clear cache and rebuild
   rm -rf node_modules dist
   npm install
   npm run build
   ```

2. **Type Errors**
   ```bash
   # Check TypeScript errors
   npm run typecheck
   ```

3. **State Issues**
   - Open Redux DevTools
   - Check Zustand stores
   - Clear localStorage if needed

### Debug Mode

Add to your code for debugging:

```typescript
if (import.meta.env.DEV) {
  console.log('Debug info:', data)
}
```

## Contributing

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Changes are documented
- [ ] No unnecessary dependencies added
- [ ] Performance impact considered
- [ ] Accessibility maintained
- [ ] Cross-browser tested

### Pull Request Process

1. Update documentation
2. Add JSDoc comments
3. Test all features
4. Update CHANGELOG.md
5. Request review

### Commit Message Format

Follow conventional commits:

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
perf: performance improvements
test: add tests
chore: maintenance tasks
```

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Vite Guide](https://vitejs.dev/guide/)

## Getting Help

- Check existing [issues](https://github.com/yourusername/markdown-editor/issues)
- Review [ADRs](./adr/) for architecture decisions
- Consult [API documentation](./API.md)
- Ask in discussions or create an issue