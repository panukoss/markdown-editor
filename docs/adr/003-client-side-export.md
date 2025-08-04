# ADR-003: Client-Side PDF and DOCX Export

## Status
Accepted

## Context
Users need to export their markdown documents to PDF and Word formats. We need to decide between:
- Server-side rendering and export
- Client-side generation
- Third-party API services

Requirements:
- Privacy (no data sent to servers)
- No backend infrastructure
- Good quality output
- Cross-browser support

## Decision
We will implement client-side export using:
- **PDF**: jsPDF with html2canvas
- **DOCX**: docx library

## Consequences

### Positive
- **Privacy**: All data stays in the user's browser
- **No infrastructure**: No servers to maintain
- **Instant export**: No network latency
- **Offline capable**: Works without internet
- **Cost-effective**: No server or API costs

### Negative
- **Bundle size**: Adds ~500KB to the bundle
- **Browser limitations**: Some features limited by browser APIs
- **Performance**: Large documents may be slow on weak devices
- **Consistency**: Output may vary slightly between browsers

### Neutral
- Quality is good enough for most use cases
- Limited customization compared to server-side solutions

## Implementation Details

### PDF Export
```typescript
// Create temporary container with print styles
// Render markdown to HTML
// Use html2canvas to capture
// Generate PDF with jsPDF
// Handle pagination for long documents
```

### DOCX Export
```typescript
// Parse markdown to tokens
// Map tokens to Word document structure
// Apply appropriate styles
// Generate binary DOCX file
```

## Alternatives Considered
1. **Server-side rendering**: Requires backend, privacy concerns
2. **External APIs**: Cost, privacy, and reliability concerns
3. **Browser print API**: Limited control over output format
4. **WebAssembly solutions**: More complex, larger bundle