# Test Plan - Phase 5: Keyboard Shortcuts & Command Palette

## Test Environment
- URL: http://localhost:5174/ (or whatever port is shown)
- Browser: Any modern browser
- Test on both Windows/Linux (Ctrl) and Mac (Cmd) if possible

## Test Cases

### 1. Editor Shortcuts

#### 1.1 Text Formatting
**Test in the editor textarea:**
- [X] **Bold** - Select text, press Ctrl/Cmd + B
- [X] **Italic** - Select text, press Ctrl/Cmd + I  
- [X] **Link** - Select text, press Ctrl/Cmd + K

**Expected:**
- Selected text is wrapped with appropriate markdown syntax
- Cursor position is maintained correctly
- Works with both Ctrl (Windows/Linux) and Cmd (Mac)

#### 1.2 Save Functionality
**Steps:**
1. Add/modify content
2. Press Ctrl/Cmd + S

**Expected:**
- [X] Green "Document saved" notification appears
- [X] Notification disappears after 2 seconds
- [X] Auto-save indicator updates
- [X] Works even when editor is focused

### 2. Application Shortcuts

#### 2.1 Modal Shortcuts
**Test each shortcut:**
- [X] **Export Modal** - Ctrl/Cmd + E opens export options
- [ ] **Copy Modal** - Ctrl/Cmd + Shift + C opens copy options #QA: Chosen shortcut conflicts with the app shortcut to  the browser's dev console
- [X] **Help Modal** - Ctrl/Cmd + / shows help documentation #QA: Works however conflicts with AI search shortcuts in some browsers (Oprea)

**Expected:**
- Correct modal opens
- Previous modal closes if one was open
- Focus moves to modal

#### 2.2 Theme Toggle
**Steps:**
1. Press Ctrl/Cmd + Shift + D

**Expected:**
- [X] Theme toggles between light and dark
- [X] All components update immediately
- [ ] Preference is saved

#### 2.3 Quick Export
**Test with sample content:**
- [X] **PDF Export** - Ctrl/Cmd + Shift + P
- [ ] **Word Export** - Ctrl/Cmd + Shift + W #QA: Conflits with application close shortcut
- [X] **Markdown Export** - Ctrl/Cmd + Shift + M

**Expected:**
- File downloads immediately
- Correct format and filename
- No modal opens

### 3. Command Palette

#### 3.1 Opening Command Palette
**Steps:**
1. Press Ctrl/Cmd + K

**Expected:**
- [X] Command palette modal opens
- [X] Search input is focused
- [X] Shows all available commands grouped by category

#### 3.2 Search Functionality
**Test:**
- [X] Type "export" - filters to export commands
- [X] Type "dark" - shows theme toggle
- [X] Type "save" - shows save command
- [X] Clear search - shows all commands again

**Expected:**
- Real-time filtering as you type
- Case-insensitive search
- Matches command titles and categories

#### 3.3 Navigation
**Test keyboard navigation:**
- [X] **Arrow Down** - selects next command
- [X] **Arrow Up** - selects previous command
- [X] **Enter** - executes selected command
- [X] **Escape** - closes palette

**Expected:**
- Visual highlight moves with selection
- Wraps at top/bottom of list
- Selected command executes correctly

#### 3.4 Mouse Interaction
**Test:**
- [X] Hover highlights commands
- [X] Click executes command
- [X] Click X or outside closes palette

### 4. Shortcut Conflicts

#### 4.1 Browser Shortcuts
**Test potential conflicts:**
- [X] Ctrl/Cmd + S doesn't trigger browser save dialog
- [X] Ctrl/Cmd + K doesn't focus browser search
- [ ] Other shortcuts don't interfere with browser #QA: Some conflicts, review specific shortcuts QA notes for details

#### 4.2 Focus Context
**Test shortcuts in different contexts:**
- [X] Work when editor is focused
- [X] Work when preview is focused
- [X] Don't trigger when typing in modal inputs

### 5. Command Execution

#### 5.1 File Commands
**From command palette, test:**
- [X] Save Document - saves and shows notification
- [X] Export Document - opens export modal
- [X] Export as PDF/Word/Markdown - downloads file

#### 5.2 Edit Commands
**Test:**
- [X] Copy Options - opens copy modal

#### 5.3 View Commands
**Test:**
- [X] Toggle Dark Mode - switches theme

#### 5.4 Help Commands
**Test:**
- [X] Show Help - opens help modal #QA: works in edge, conflicts shortcut in opera

### 6. Visual Feedback

#### 6.1 Command Palette UI
**Verify:**
- [X] Commands show shortcuts on the right
- [X] Categories are clearly labeled
- [X] Selected item has distinct highlight
- [ ] Dark mode styling is correct #QA: Text input for search does not change to correct dark mode color

#### 6.2 Save Notification
**Verify:**
- [X] Appears in bottom-right corner
- [X] Green background with white text
- [X] Doesn't block other UI elements
- [X] Smooth fade out

### 7. Edge Cases

#### 7.1 Rapid Shortcut Use
**Test:**
- [X] Press save multiple times quickly
- [X] Toggle theme rapidly
- [X] Open/close modals quickly

**Expected:**
- No crashes or freezes
- Latest action takes precedence
- UI remains responsive

#### 7.2 Empty Editor
**Test shortcuts with no content:**
- [X] Export shortcuts show warning or do nothing
- [X] Copy shortcuts show empty content warning
- [X] Save works (saves empty state)

#### 7.3 Command Palette Edge Cases
**Test:**
- [X] Search for non-existent command
- [X] Very long search query
- [X] Special characters in search

### 8. Accessibility

#### 8.1 Screen Reader Support
- [ ] Shortcuts are announced correctly #QA: Not currently testing
- [X] Command palette items are readable
- [X] Focus management is proper

#### 8.2 Keyboard-Only Navigation
- [ ] All features accessible without mouse #QA: Tab selection works on main screen however its currentlu not possile to navigate the internals of the older modals. THe new command list modal satarts with keyboard nav right away
- [X] Tab order is logical
- [ ] No keyboard traps

### 9. Documentation

#### 9.1 Help Modal
**Verify shortcuts section shows:**
- [X] All editor shortcuts
- [X] All application shortcuts
- [X] Quick export shortcuts
- [X] Correct key combinations for OS

### 10. Browser Compatibility

**Test in different browsers:**
- [X] Chrome/Edge - All shortcuts work
- [X] Firefox - All shortcuts work
- [ ] Safari - Cmd key works on Mac #QA: Not currently testing
- [ ] Opera - All shortcuts work #QA: see notes on commands

## Performance Tests

- [X] Command palette opens instantly
- [X] Search filtering has no lag
- [X] Shortcuts execute immediately
- [X] No memory leaks with repeated use

## Regression Tests

- [X] Editor still accepts text input
- [X] Copy/paste still works normally
- [X] All modals still function
- [X] Export features work correctly

## Notes for Tester
- Test both Ctrl (Windows/Linux) and Cmd (Mac) modifiers
- Check browser console for errors
- Verify shortcuts match documentation
- Test with keyboard layouts if available
