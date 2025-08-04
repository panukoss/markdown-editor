# Test Plan - Phase 1 Fixes

## Issues Fixed

1. **Text boxes height issue** - Editor and preview now take full height of the screen
2. **Dark mode not working** - Theme toggle now properly switches between light and dark modes
3. **Split pane divider not visible** - Divider is now visible and draggable

## Re-test the Following

### 1. Layout Height
**Expected:**
- [X] Editor and preview panels fill the entire screen height (minus header) #QA: TOO BIG, now there are no margins at all, are we sure our styles are loading properly or is the page still this basic?
- [X] No scrollbars on the main window
- [X] Content scrolls within the panels if needed

### 2. Theme Toggle (Fixed)
**Steps:**
1. Click the moon/sun icon in the header

**Expected:**
- [ ] Background colors change (light gray ↔ dark gray/black)
- [ ] Text colors invert appropriately
- [ ] All UI elements update their colors
- [ ] Theme persists after page reload

### 3. Split Pane (Fixed)
**Steps:**
1. Look for the vertical line between editor and preview
2. Hover over it
3. Click and drag

**Expected:**
- [ ] Vertical divider line is visible (gray)
- [ ] Cursor changes to resize indicator on hover
- [ ] Divider turns blue on hover
- [ ] Panels resize smoothly while dragging
- [ ] Size constraints work (20% - 80%)

### 4. Dark Mode Visual Check
**In Dark Mode:**
- [ ] Header: Dark gray background, white text
- [ ] Editor: Dark gray background, light text
- [ ] Preview: Dark background, light text
- [ ] Divider: Darker gray color
- [ ] Icons: Light gray color

**In Light Mode:**
- [ ] Header: White background, dark text
- [ ] Editor: White background, dark text
- [ ] Preview: Light gray background, dark text
- [ ] Divider: Light gray color
- [ ] Icons: Dark gray color

## Next Steps
Once these fixes are verified, we'll proceed with:
- Implementing actual markdown parsing
- Adding syntax highlighting to the editor
- Implementing the preview rendering with proper markdown support
