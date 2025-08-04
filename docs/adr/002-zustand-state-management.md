# ADR-002: Use Zustand for State Management

## Status
Accepted

## Context
The markdown editor needs state management for:
- Editor content
- Theme preferences
- Modal states
- Auto-save functionality
- User preferences persistence

Requirements:
- Simple API
- TypeScript support
- localStorage persistence
- Minimal boilerplate
- Good performance

## Decision
We will use Zustand for state management instead of Redux or Context API.

## Consequences

### Positive
- **Minimal boilerplate**: Clean, simple store definitions
- **TypeScript-first**: Excellent TypeScript support out of the box
- **Small bundle size**: Only ~3KB gzipped
- **Built-in persistence**: Easy localStorage integration
- **No providers needed**: Components can directly use stores
- **DevTools support**: Works with Redux DevTools
- **Performance**: No unnecessary re-renders

### Negative
- **Less ecosystem**: Smaller ecosystem compared to Redux
- **Less structure**: More freedom can lead to inconsistent patterns
- **Documentation**: Less extensive documentation than Redux

### Neutral
- Unopinionated approach requires team conventions
- Simpler than Redux but more structured than Context API

## Code Example
```typescript
const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      content: '',
      setContent: (content) => set({ content }),
    }),
    { name: 'editor-storage' }
  )
)
```

## Alternatives Considered
1. **Redux Toolkit**: More boilerplate, overkill for our needs
2. **Context API**: Performance issues with frequent updates
3. **MobX**: More complex, class-based approach
4. **Valtio**: Similar to Zustand but less mature