# Test Plan - Phase 4: Copy Functionality

## Test Environment
- URL: http://localhost:5174/ (or whatever port is shown)
- Browser: Any modern browser
- Have some sample markdown content ready for testing

## Test Cases

### 1. Copy Modal

#### 1.1 Opening Copy Modal
**Steps:**
1. Add some content to the editor
2. Click the Copy button (copy icon) in the header

**Expected:**
- [X] Modal opens with "Copy Content" title
- [X] Shows three copy options: Markdown Source, HTML, Plain Text
- [X] Each option has an icon and description
- [X] Modal can be closed using X, Esc, or clicking outside

#### 1.2 Copy Options Display
**Test each option:**
- [X] **Markdown Source** - Shows "Copy the raw markdown text"
- [ ] **HTML** - Shows "Copy the rendered HTML with formatting" #QA: Copied from HTML button and pasted into Word, raw html was on the clipboard rather than the formatted render output
- [X] **Plain Text** - Shows "Copy as plain text without formatting"

### 2. Copy Functionality

#### 2.1 Test Content
**Use this sample content for testing:**
```markdown
# Copy Test Document

This is a **bold** text and this is *italic* text.

## Code Example
```javascript
function copyTest() {
  console.log("Testing copy functionality");
  return true;
}
```

### List Example
- First item
- Second item
- Third item

[Link to GitHub](https://github.com)
```

#### 2.2 Copy Markdown Source
**Steps:**
1. Click "Markdown Source" option

**Expected:**
- [X] Green checkmark appears briefly
- [X] Content is copied to clipboard
- [X] Paste in text editor shows raw markdown with all formatting symbols

#### 2.3 Copy HTML
**Steps:**
1. Click "HTML" option

**Expected:**
- [X] Green checkmark appears briefly
- [X] Content is copied to clipboard
- [ ] Paste in HTML-aware editor shows formatted content #QA: this was not the inteneed function, we want to put the formatted render in the ckipboard as if the yser had copied and pasted from the rendered page
- [X] HTML includes proper tags (h1, h2, p, code, ul, li, etc.) #QA: tags are correct but we dont want tags we want the rich text 

#### 2.4 Copy Plain Text
**Steps:**
1. Click "Plain Text" option

**Expected:**
- [X] Green checkmark appears briefly
- [X] Content is copied to clipboard
- [X] Paste shows text without any formatting or markdown symbols
- [X] Code blocks and lists are preserved as plain text #QA: they are however the lists do not show bullets or numbers, they will bee to be added to the text durin tht copy

### 3. Edge Cases

#### 3.1 Empty Editor
**Steps:**
1. Clear all content from editor
2. Open Copy modal

**Expected:**
- [X] Warning message appears: "No content to copy"
- [X] All copy options are disabled (grayed out)
- [X] Clicking disabled options does nothing

#### 3.2 Large Content
**Steps:**
1. Add 100+ lines of varied markdown content
2. Test all three copy options

**Expected:**
- [ ] All copy operations complete without freezing
- [ ] Full content is copied correctly
- [ ] No truncation or missing parts

#### 3.3 Special Characters
**Test with content containing:**
- [ ] Unicode characters (emoji, special symbols)
- [ ] HTML entities (&lt;, &gt;, &amp;)
- [ ] Code with syntax highlighting
- [ ] Math equations

**Expected:**
- [ ] All characters copy correctly
- [ ] No encoding issues

### 4. Browser Compatibility

#### 4.1 Clipboard API Support
**Test in different browsers:**
- [ ] Chrome/Edge - Modern clipboard API works
- [ ] Firefox - Modern clipboard API works
- [ ] Safari - Falls back to execCommand if needed

#### 4.2 Security Context
**Test in different contexts:**
- [ ] HTTPS - Full functionality
- [ ] HTTP localhost - Full functionality
- [ ] File:// protocol - Fallback method works

### 5. Visual Feedback

#### 5.1 Success Indication
**After successful copy:**
- [ ] Green checkmark appears
- [ ] Checkmark disappears after 2 seconds
- [ ] No layout shift when checkmark appears

#### 5.2 Error Indication
**If copy fails (simulate by denying clipboard permission):**
- [ ] Red error icon appears
- [ ] Error disappears after 2 seconds
- [ ] User can retry the operation

### 6. Integration Tests

#### 6.1 With Other Modals
**Test:**
- [ ] Copy modal closes when Export modal opens
- [ ] Copy modal closes when Help modal opens
- [ ] Only one modal open at a time

#### 6.2 With Theme Switching
**Test:**
- [ ] Copy modal respects current theme
- [ ] Copied content is consistent regardless of theme

#### 6.3 With Live Preview
**Test:**
- [ ] HTML copy includes latest preview changes
- [ ] Copy works while content is being edited

### 7. Accessibility

- [ ] Modal can be navigated with keyboard
- [ ] Tab order is logical
- [ ] Screen readers announce copy status
- [ ] Focus returns to Copy button when modal closes

## Regression Tests
Ensure previous features still work:
- [ ] Editor and preview sync properly
- [ ] Export functionality works
- [ ] Help documentation accessible
- [ ] Theme switching works

## Notes for Tester
- Test clipboard permissions in browser settings
- Try copying and pasting into different applications
- Check browser console for any errors
- Verify copied content matches what's displayed in preview
