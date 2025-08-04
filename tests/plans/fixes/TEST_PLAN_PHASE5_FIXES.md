# Test Plan - Fixes Validation

## Overview
This test plan validates the fixes implemented based on issues identified in TEST_PLAN_PHASE5.md

## Test Environment
- URL: http://localhost:5174/
- Browser: Test in multiple browsers (Chrome, Firefox, Edge, Opera)
- Test on both Windows/Linux (Ctrl) and Mac (Cmd) if possible

## Fix 1: Keyboard Shortcut Conflicts

### 1.1 Copy Options Shortcut
**Previous**: Ctrl/Cmd + Shift + C (conflicted with browser dev console)
**New**: Ctrl/Cmd + Shift + Y

**Test Steps:**
1. Press Ctrl/Cmd + Shift + Y
2. Verify Copy Modal opens
3. Test in all browsers, especially those with dev console shortcuts
4. Verify Command Palette shows updated shortcut
5. Verify Help documentation shows updated shortcut

**Expected:**
- [X] Copy modal opens without conflicts
- [X] Browser dev console doesn't open
- [X] All documentation reflects new shortcut

### 1.2 Word Export Shortcut
**Previous**: Ctrl/Cmd + Shift + W (conflicted with window close)
**New**: Ctrl/Cmd + Shift + Alt + D

**Test Steps:**
1. Add sample content to editor
2. Press Ctrl/Cmd + Shift + Alt + D
3. Test on Windows, Linux, and Mac
4. Verify Command Palette shows updated shortcut
5. Verify Help documentation shows updated shortcut

**Expected:**
- [X] Word document downloads immediately
- [X] Browser window doesn't close
- [X] Works with all modifier keys (Ctrl/Cmd + Shift + Alt)
- [X] All documentation reflects new shortcut

## Fix 2: HTML Copy Functionality

### 2.1 Rich Text Copy
**Issue**: HTML copy was copying raw HTML instead of formatted text

**Test Steps:**
1. Add this test content:
```markdown
# Test Document

This is **bold** and this is *italic*.

## Lists
- Item 1
- Item 2
  - Nested item

1. First
2. Second
3. Third

### Code
```javascript
console.log("Hello World");
```

[Link to Google](https://google.com)
```

2. Open Copy Modal (Ctrl/Cmd + Shift + Y)
3. Click "HTML" option
4. Paste into:
   - Microsoft Word
   - Google Docs
   - Rich text email editor
   - Any HTML-aware application

**Expected:**
- [X] Pasted content shows formatted text (not raw HTML tags)
- [X] Bold and italic formatting preserved
- [X] Headers appear as different sizes
- [X] Lists maintain structure
- [ ] Code blocks have monospace font #QA: code blocks do not have special formatting/color/etc
- [X] Links are clickable

### 2.2 Browser Compatibility
**Test rich text copy in:**
- [X] Chrome/Edge - Modern Clipboard API
- [X] Firefox - Modern Clipboard API
- [ ] Safari - Fallback method #QA: not tested
- [X] Opera - Both methods

## Fix 3: Command Palette Dark Mode Input

### 3.1 Search Input Styling
**Issue**: Search input text was not visible in dark mode

**Test Steps:**
1. Enable dark mode (Ctrl/Cmd + Shift + D)
2. Open Command Palette (Ctrl/Cmd + K)
3. Type in the search box
4. Switch between light and dark modes while palette is open

**Expected:**
- [X] Text is clearly visible in dark mode (light text on dark background)
- [X] Text is clearly visible in light mode (dark text on light background)
- [X] Placeholder text has appropriate contrast
- [X] Focus ring color is visible in both modes

## Fix 4: Plain Text Copy with Formatting

### 4.1 List Formatting
**Issue**: Plain text copy didn't include bullets or numbers for lists

**Test Steps:**
1. Use the same test content from Fix 2.1
2. Open Copy Modal
3. Click "Plain Text" option
4. Paste into a plain text editor (Notepad, TextEdit, etc.)

**Expected:**
- [X] Unordered lists show bullet points (•)
- [X] Ordered lists show numbers (1. 2. 3.)
- [ ] Nested lists maintain indentation
- [X] Proper spacing between list items
- [X] No HTML tags or markdown syntax

### 4.2 Complex Content
**Test with:**
```markdown
# Document Title

## Section with Lists

### Unordered List
- First item
- Second item
  - Nested item 1
  - Nested item 2
- Third item

### Ordered List
1. Step one
2. Step two
   a. Sub-step
   b. Another sub-step
3. Step three

### Mixed Content
This paragraph has **bold** and *italic* text.

> This is a blockquote
> with multiple lines

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
| Data 3   | Data 4   |
```

**Expected:**
- [ ] All list types formatted correctly #QA: subitems not indenting properly 
- [ ] Tables converted to readable plain text - #QA: table can translate 1:1 with markdown formattin
- [X] Blockquotes indicated with ">" prefix
- [ ] Clean, readable output without formatting artifacts #QA: blockquotes have excessive lines

## Fix 5: Theme Persistence

### 5.1 localStorage Persistence
**Test Steps:**
1. Set dark mode (Ctrl/Cmd + Shift + D)
2. Refresh the page (F5)
3. Close browser completely
4. Reopen browser and navigate to app
5. Clear localStorage and refresh

**Expected:**
- [X] Dark mode persists after page refresh
- [X] Dark mode persists after browser restart
- [X] Theme reverts to light after clearing localStorage
- [X] No flash of wrong theme on page load

### 5.2 Cross-Component Sync
**Test theme consistency across:**
- [X] Main editor and preview
- [ ] All modals (Export, Copy, Help, Command Palette) #QA: General theme consistent, error case of empty content on Copy and Download modals is inconsistent. Use the Copy modal error style for both
- [X] Header and buttons
- [X]  Notification toasts

## Regression Tests

### 6.1 Original Functionality
Verify nothing broke:
- [X] Editor still accepts input
- [X] Preview updates in real-time
- [X] All export formats work (PDF, Word, Markdown)
- [X] Auto-save functionality works
- [X] Resizable panes work
- [X] Synchronized scrolling works

### 6.2 Other Shortcuts
Test non-modified shortcuts still work:
- [X] Ctrl/Cmd + S (Save)
- [X] Ctrl/Cmd + E (Export Modal)
- [X] Ctrl/Cmd + / (Help)
- [X] Ctrl/Cmd + K (Command Palette - when not in editor)
- [X] Ctrl/Cmd + B/I/K (Bold/Italic/Link in editor)

####QA: Shortcuts no longer work when cursor is active in the editor text box, instead shortcuts use browser shortcuts. If the cursor is not active in the tedt box the shortcuts work as expetect 
## Performance Tests

- [X] Command palette opens instantly
- [X] Copy operations complete quickly
- [X] Theme switching has no lag
- [X] No memory leaks with repeated operations

## Accessibility Tests

- [ ] All shortcuts work with screen readers #QA: Not testing at this time
- [X] Tab navigation works in all modals #QA: I have to manually click on teh modal body before pressing tab, other wise we are cycling through the buttons on the parent ui and the tab focus never makes it to the modal. 
- [X] Focus indicators visible in both themes
- [X] No color contrast issues in dark mode

## Notes for QA

1. **Browser-Specific Testing**: Pay special attention to Opera and Safari as they had specific conflicts
2. **Modifier Keys**: Test both Ctrl (Windows/Linux) and Cmd (Mac) variants
3. **Copy Testing**: Have multiple target applications ready for paste testing
4. **Theme Testing**: Check for any elements that don't properly switch themes
5. **Error Handling**: Test copy operations with clipboard permissions denied

## Sign-off Checklist

- [ ] All keyboard shortcut conflicts resolved
- [X] HTML copy produces formatted text (not raw HTML)
- [X] Command palette search visible in dark mode
- [ ] Plain text copy includes proper list formatting
- [X] Theme preference persists across sessions
- [X] No regressions in existing functionality
- [X] All documentation updated with new shortcuts
