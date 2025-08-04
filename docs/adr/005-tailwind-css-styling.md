# ADR-005: Use Tailwind CSS for Styling

## Status
Accepted

## Context
We need a styling solution that:
- Supports dark mode
- Provides consistent design system
- Allows rapid development
- Has good performance
- Works well with React components

## Decision
We will use Tailwind CSS v4 (beta) for styling.

## Consequences

### Positive
- **Rapid development**: Utility classes speed up styling
- **Dark mode**: Built-in dark mode support with `dark:` prefix
- **Consistency**: Design tokens ensure consistent spacing, colors
- **Performance**: PurgeCSS removes unused styles
- **No CSS conflicts**: Utility classes avoid naming conflicts
- **Responsive design**: Mobile-first responsive utilities
- **Customizable**: Easy to extend with custom utilities

### Negative
- **HTML verbosity**: Long class strings in components
- **Learning curve**: Need to learn utility class names
- **Build dependency**: Requires build step for optimization
- **IDE support**: Needs plugins for best experience

### Neutral
- Different approach from traditional CSS
- v4 beta may have some instability

## Example Usage
```tsx
<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
    Title
  </h2>
</div>
```

## Configuration
```javascript
// tailwind.config.js
export default {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Custom extensions
    }
  }
}
```

## Alternatives Considered
1. **CSS Modules**: More boilerplate, slower development
2. **Styled Components**: Runtime overhead, larger bundle
3. **Emotion**: Similar to styled-components concerns
4. **Vanilla CSS**: Too much manual work for consistency
5. **Material-UI**: Too opinionated, larger bundle