# Contributing to Markdown Editor

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the Markdown Editor project.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/markdown-editor.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Code Style

- We use TypeScript with strict mode enabled
- Prettier for code formatting (runs automatically on commit)
- ESLint for code quality
- Follow existing patterns in the codebase

## Component Guidelines

### Creating New Components

1. Use functional components with TypeScript
2. Place components in appropriate directories under `src/components/`
3. Include proper TypeScript types
4. Add JSDoc comments for complex logic

Example:
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  // Component logic
};
```

### State Management

- Use Zustand stores for global state
- Keep component state local when possible
- Follow the existing store patterns

## Testing

- Write tests for new features
- Ensure existing tests pass: `npm test`
- Test files should be colocated with components

## Pull Request Process

1. Update documentation for any API changes
2. Ensure all tests pass
3. Update the README.md if needed
4. Submit PR with clear description of changes

## Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build process or auxiliary tool changes

## Questions?

Feel free to open an issue for any questions or concerns.