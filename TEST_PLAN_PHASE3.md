# Test Plan - Phase 3: Help Documentation & Export Features

## Test Environment
- URL: http://localhost:5174/ (or whatever port is shown)
- Browser: Any modern browser
- Have some sample markdown content ready for testing exports

## Test Cases

### 1. Help Documentation System

#### 1.1 Opening Help Modal
**Steps:**
1. Click the Help button (question mark icon) in the header

**Expected:**
- [X] Modal opens with "Help & Documentation" title
- [X] Modal has a close button (X) in top right
- [X] Modal has a sidebar with navigation sections
- [X] "Getting Started" section is selected by default
- [X] Modal background overlay darkens the main content

##### QA FEEDBACK: the modal should not change size as we navigate, it should be a fixed size that only adjusts if the browser window size changes. if the content is long there should be a scroll bar on the modal to review the full content. Dark/light mode switch should also appear on the help modal to allow for easy reading. In dark mode the markdown syntax page text does not respect the dark mode style, all the text appears black on the dark background
#### 1.2 Help Navigation
**Test each    section:**
- [X] **Getting Started** - Shows overview and key features
- [X] **Markdown Syntax** - Shows syntax examples with code blocks
- [X] **Keyboard Shortcuts** - Shows keyboard shortcut table
- [X] **Export Options** - Shows export format descriptions
- [X] **Tips & Tricks** - Shows colored tip cards

**Expected:**
- [X] Clicking each section updates the content area
- [X] Active section is highlighted in sidebar
- [ ] Content scrolls independently from sidebar #QA: the whole modal scrolls
- [X] All code examples are properly formatted

#### 1.3 Modal Interactions
**Test:**
- [X] Click outside modal - should close
- [X] Press ESC key - should close
- [X] Click X button - should close
- [ ] Scroll works within content area #QA: The whole modal scrolls
- [X] Modal is responsive and doesn't break on window resize

#### 1.4 Dark Mode Compatibility
**Test in both light and dark modes:**
- [ ] Modal background and text colors are appropriate #QA: Dark mode markdown section text does not change to a lighter color, we can use white on the help text for markdown on dark mode
- [ ] Code blocks in help docs have proper contrast
- [X] Tip cards maintain readability
- [X] Sidebar navigation is clearly visible

### 2. Export Functionality

#### 2.1 Opening Export Modal
**Steps:**
1. Add some content to the editor (use sample below)
2. Click the Export button (download icon) in the header

**Expected:**
- [X] Modal opens with "Export Document" title
- [X] Shows three export options: PDF, Word Document, Markdown
- [X] Each option has an icon and description
- [X] Modal can be closed same ways as help modal

#### 2.2 Export Validation Content
**Use this sample content for testing all exports:**
```markdown
# Export Test Document

## Text Formatting
This is a paragraph with **bold text** and *italic text*.

## Lists
### Unordered List
- First item
- Second item
  - Nested item
- Third item

### Ordered List
1. First step
2. Second step
3. Third step

## Code Block
```javascript
function testExport() {
  console.log("Testing export functionality");
  return true;
}
```

## Blockquote
> This is a blockquote to test export formatting

## Table
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Links
[Visit GitHub](https://github.com)

## Math (LaTeX)
Inline math: $E = mc^2$

Block math:
$$
\sum_{i=1}^{n} x_i = \frac{n(n+1)}{2}
$$
```

#### 2.3 PDF Export
**Steps:**
1. Click "PDF Document" option
2. Wait for export to complete

**Expected:**
- [X] Loading spinner appears during export 
- [X] PDF downloads with filename format: `document_YYYY-MM-DD.pdf`
- [X] PDF opens correctly in browser/PDF viewer
- [X] All headings are formatted with proper sizes
- [X] Bold and italic text are preserved
- [X] Lists maintain proper indentation #QA: list is indented however list elements, (Bullets or numbers) is misaligned with the text for the entry, the number/bullet sits about 0.25 of a line higher than the text
- [ ] Code blocks have syntax highlighting
- [X] Tables are rendered correctly
- [X] Page breaks are handled properly for long content

##### QA FEEDBACK: content over ~500 lines results in an export error: "Export Error

CanvasRenderingContext2D.scale: Canvas exceeds max size."
#### 2.4 DOCX Export
**Steps:**
1. Click "Word Document" option
2. Wait for export to complete

**Expected:**
- [X] Loading spinner appears during export
- [X] DOCX downloads with filename format: `document_YYYY-MM-DD.docx`
- [ ] Opens correctly in Word/LibreOffice/Google Docs #QA: given example fails to load in word, howver some other documents that dont use every markdown feature seems to work, we appeat to be creating corrupted word files if we try to do everything, we will ned to fix thAT
- [ ] Headings use Word's heading styles #QA: N/A
- [ ] Bold and italic formatting preserved #QA: N/A
- [ ] Lists are proper Word lists (bulleted/numbered) #QA: N/A
- [ ] Code blocks use monospace font #QA: N/A
- [ ] Blockquotes are indented #QA: N/A
- [ ] Document is editable #QA: N/A

##### QA FEEDBACK UNABLE TO COMPLETE DOCX testing do to bad files being outout

#### 2.5 Markdown Export
**Steps:**
1. Click "Markdown File" option

**Expected:**
- [X] MD file downloads immediately (no processing needed)
- [X] Filename format: `document_YYYY-MM-DD.md`
- [X] Content is identical to editor content
- [X] Opens correctly in text editor
- [X] No formatting is lost

#### 2.6 Export Error Handling
**Test:**
- [X] Try exporting with empty editor - should show warning message
- [X] Export buttons are disabled when no content exists
- [X] If export fails, error message appears in red alert box 

### 3. Integration Tests

#### 3.1 Modal Layering
**Test:**
- [ ] Open help modal, then try to open export modal - first should close
- [ ] Open export modal, then try to open help modal - first should close
- [X] Only one modal can be open at a time
##### QA FEEDBACK: due to the UI desgin its not possible to have 2 modals open as the contrals in the back greay out when the modal appears, you are forced to close the modal to open another, this is the desired function, we dont need any more complextiy there
#### 3.2 Workflow Test
**Complete user workflow:**
1. [X] Open help to learn markdown syntax #QA: markdown syntax help in dark mode, text is black, not readable easilyt
2. [X] Type content following help examples
3. [X] Preview updates in real-time
4. [X] Export document in all three formats
5. [X] Verify exports match preview appearance

### 4. Performance Tests
- [X] Help modal opens quickly (< 500ms)
- [X] Export modal opens quickly (< 500ms)
- [X] PDF export completes in reasonable time (< 5s for normal document)
- [X] Large documents (100+ lines) export without freezing UI
- [X] No memory leaks when opening/closing modals repeatedly

### 5. Browser Compatibility
Test in multiple browsers:
- [X] Chrome/Edge - All features work
- [X] Firefox - All features work
- [ ] Safari - All features work (if on Mac) #QA: PC Only at this time

## Known Limitations
- PDF export may have slight formatting differences from preview
- Math equations (LaTeX) may not render in all export formats
- Very large documents may take longer to export as PDF

## Regression Tests
Ensure previous features still work:
- [X] Editor and preview still sync properly
- [X] Syntax highlighting works in both themes
- [X] Theme switching doesn't break modals
- [X] Auto-save continues to function

## Notes for Tester
- Check browser console for any errors during testing
- Note any performance issues or delays
- Test with both short and long documents
- Try edge cases (very long lines, many code blocks, etc.)
