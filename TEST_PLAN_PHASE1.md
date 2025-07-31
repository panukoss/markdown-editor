# Test Plan - Phase 1: Core Layout and Theme System

## Test Environment
- URL: http://localhost:5173/
- Browser: Any modern browser (Chrome, Firefox, Safari, Edge)

## Test Cases

### 1. Initial Load
**Expected:**
- [ ] Application loads without errors
- [X] Split-pane layout is visible with Editor on left, Preview on right #QA: text boxes are small and only take up the top 25% of the sceen, the font size should be adjustable for usablilty
- [X] Header is visible with title "Markdown Editor"
- [X] Default light theme is applied #QA: appears to load without any css erros, icons are shown properly, i assume this is light mode working

### 2. Theme Toggle
**Steps:**
1. Click the moon/sun icon in the header (top right)

**Expected:**
- [ ] Theme switches between light and dark mode #QA: Button click works and icon on button changes however there is no change to the UI such as changing the background or text colors
- [ ] All components update their colors appropriately #QA: not functiona
- [ ] Theme preference persists after page reload #QA: N/A unable to test

### 3. Split Pane Resizing
**Steps:**
1. Hover over the vertical divider between Editor and Preview
2. Click and drag left/right
 
**Expected:** #QA: does not work, no action acvailable, no cursor changes, divider not visible
- [ ] Cursor changes to resize indicator
- [ ] Divider highlights on hover (blue color)
- [ ] Panes resize smoothly while dragging
- [ ] Minimum width constraints are enforced (20% - 80%)

### 4. Editor Functionality
**Steps:**
1. Click in the editor area
2. Type some text

**Expected:**
- [X] Text appears in the editor as typed
- [X] Editor has monospace font
- [X ] Content persists after page reload (auto-save)

### 5. Header Buttons
**Expected:**
- [X] All header buttons are visible: Save, Export, Copy, Help, Theme toggle
- [X] Buttons show hover effects
- [X] Tooltips appear on hover

### 6. Responsive Behavior
**Steps:**
1. Resize browser window

**Expected:**
- [X] Layout remains functional at different sizes
- [X] No horizontal scrollbars appear
- [X] UI elements remain accessible

## Visual Checklist

### Light Mode #QA: N/A Light/Dark mode not currently working
- [ ] White/light gray backgrounds
- [ ] Dark text for readability
- [ ] Subtle borders and dividers
- [ ] Blue accent for interactive elements

### Dark Mode  #QA: N/A Light/Dark mode not currently working
- [ ] Dark gray/black backgrounds
- [ ] Light text for readability
- [ ] Darker borders and dividers
- [ ] Consistent accent colors

## Known Issues for Phase 1
- Preview shows raw text (markdown parsing not yet implemented)
- Header buttons are not functional yet (except theme toggle)
- No syntax highlighting in editor yet

## Notes
Please report any issues with:
1. Visual glitches or alignment problems
2. Theme switching issues
3. Performance problems
4. Browser-specific issues
