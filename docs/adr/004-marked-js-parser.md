# ADR-004: Use Marked.js for Markdown Parsing

## Status
Accepted

## Context
We need a markdown parser that:
- Supports GitHub Flavored Markdown (GFM)
- Has good performance for real-time preview
- Allows custom renderers
- Supports extensions (math, syntax highlighting)
- Has a small footprint
- Is actively maintained

## Decision
We will use Marked.js as our markdown parser.

## Consequences

### Positive
- **Performance**: One of the fastest markdown parsers
- **GFM support**: Full GitHub Flavored Markdown support
- **Extensibility**: Custom renderer support for our needs
- **Bundle size**: Relatively small (~30KB gzipped)
- **Active development**: Well-maintained with regular updates
- **Security**: Built-in XSS protection options
- **Synchronous API**: Better for our real-time preview

### Negative
- **Limited plugin ecosystem**: Compared to remark/rehype
- **Less flexible**: AST manipulation is limited
- **Math support**: Requires additional library (KaTeX)

### Neutral
- Simple API suits our straightforward needs
- Good balance between features and performance

## Implementation
```typescript
marked.setOptions({
  gfm: true,
  breaks: true,
  renderer: customRenderer
})

const html = marked(markdown)
```

## Alternatives Considered
1. **markdown-it**: More plugins but slightly slower
2. **remark/rehype**: More powerful but complex and larger
3. **Showdown**: Older, less performant
4. **Commonmark.js**: Too basic, lacks GFM features