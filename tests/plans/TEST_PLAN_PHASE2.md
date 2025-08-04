# Test Plan - Phase 2: Markdown Editor and Live Preview

## Test Environment
- URL: http://localhost:5174/ (or whatever port is shown)
- Browser: Any modern browser

## Test Cases

### 1. Markdown Editor
**Expected:**
- [X] Editor shows with toolbar buttons
- [X] Monospace font in editor
- [X] Auto-save indicator visible in editor header
- [X] Content persists after page reload

### 2. Editor Toolbar
**Test each button:**
- [X] **Bold** - Wraps selected text with `**`
- [X] **Italic** - Wraps selected text with `*`
- [X] **Quote** - Adds `> ` at line start
- [X] **Code** - Wraps with backticks
- [X] **Link** - Inserts `[text](url)`
- [X] **Image** - Inserts `![alt text](url)`
- [X] **Unordered List** - Adds `- ` at line start
- [X] **Ordered List** - Adds `1. ` at line start
- [X] **Table** - Inserts table template
- [X] **Horizontal Rule** - Inserts `---`

### 3. Keyboard Shortcuts
**Test:**
- [X] `Ctrl/Cmd + B` - Bold
- [X] `Ctrl/Cmd + I` - Italic
- [X] `Ctrl/Cmd + K` - Link

### 4. Live Preview Rendering
**Test these markdown elements:**

```markdown
# Heading 1
## Heading 2
### Heading 3

Regular paragraph with **bold** and *italic* text.

> This is a blockquote

- Unordered list item 1
- Unordered list item 2

1. Ordered list item 1
2. Ordered list item 2

`inline code` and code blocks:

```javascript
function hello() {
  console.log("Hello, World!");
}
```

[Link to Google](https://google.com)

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |

Math equation: $E = mc^2$

---
```

**Expected:**
- [X] All headings render with proper sizes
- [X] Bold and italic formatting works
- [X] Blockquotes have left border
- [] Lists render properly #QA: lists are there however this is no number for ordered lists and no bullet visible for an unorded list
- [X] Code blocks have syntax highlighting
- [X] Links are clickable
- [X] Tables render with borders
- [X] Math equations render (if supported)
- [X] Horizontal rules show

### 5. Synchronized Scrolling
**Steps:**
1. Add enough content to make both panels scrollable
2. Scroll in the editor

**Expected:**
- [X] Preview scrolls proportionally with editor
- [X] Scrolling is smooth, not jumpy #QA: scrolling the text window is smooth, the linked scrolling of the rendered view however is not smooth, this is an arfiact from the realist of the different displays of raw ascii and rendered text, jumping is a given, can we make the transistion jump on the rendered size be smooth with its "jump"

### 6. Dark Mode Compatibility
**Test in both light and dark modes:**
- [X] Editor text is visible
- [X] Preview text is visible #QA: preveiw text does not change when the theme is changed
- [ ] Code blocks have appropriate background #QA: they do have the right background in dark mopde however its stuck in dark mode and does not appear correct in light mode, note, thios is just the preview pane with the issue
- [] All UI elements have good contrast

### 7. Auto-save Feature
**Steps:**
1. Type some content
2. Wait 2 seconds
3. Refresh the page

**Expected:**
- [X] Content is restored after refresh
- [X] Auto-save indicator shows in editor

## Known Limitations
- Mermaid diagrams not yet implemented
- Image uploads not yet implemented
- No find/replace functionality yet

## Performance Check
- [X] Typing feels responsive
- [X] Preview updates quickly
- [X] No lag with large documents (test with 100+ lines)
