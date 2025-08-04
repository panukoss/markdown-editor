# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for the Markdown Editor project.

## What is an ADR?

An Architecture Decision Record captures an important architectural decision made along with its context and consequences.

## ADR Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [001](001-use-react-typescript.md) | Use React with TypeScript | Accepted | 2024-01 |
| [002](002-zustand-state-management.md) | Use Zustand for State Management | Accepted | 2024-01 |
| [003](003-client-side-export.md) | Client-Side PDF and DOCX Export | Accepted | 2024-01 |
| [004](004-marked-js-parser.md) | Use Marked.js for Markdown Parsing | Accepted | 2024-01 |
| [005](005-tailwind-css-styling.md) | Use Tailwind CSS for Styling | Accepted | 2024-01 |

## ADR Template

When creating a new ADR, use this template:

```markdown
# ADR-XXX: [Decision Title]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-XXX]

## Context
[Describe the issue motivating this decision]

## Decision
[Describe the decision and rationale]

## Consequences

### Positive
- [Positive consequence 1]
- [Positive consequence 2]

### Negative
- [Negative consequence 1]
- [Negative consequence 2]

### Neutral
- [Neutral consequence]

## Alternatives Considered
1. **[Alternative 1]**: [Why not chosen]
2. **[Alternative 2]**: [Why not chosen]
```

## Why ADRs?

1. **Document decisions**: Capture the "why" behind technical choices
2. **Share context**: Help new team members understand past decisions
3. **Learn from history**: Avoid repeating past mistakes
4. **Enable change**: Understand impact when revisiting decisions