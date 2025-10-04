# Modern Markdown Editor: Live Preview, LaTeX, and PDF/DOCX Export

Download and run the latest release from https://github.com/panukoss/markdown-editor/releases

[![Release](https://img.shields.io/badge/Release-View_on_GitHub-brightgreen)](https://github.com/panukoss/markdown-editor/releases)



## Overview

A modern, client-side Markdown editor with a polished live preview. Build with React, TypeScript, and Vite. It includes syntax highlighting, LaTeX math support, and export options to PDF and DOCX. The editor ships with dark mode, auto-save, and a robust keyboard shortcut system. It is designed to be fast, accessible, and extensible.

This project targets web apps that fit in a single page. It uses a light, modular architecture that separates the editor, the preview, and the export pipeline. It focuses on a smooth editing experience, predictable behavior across platforms, and straightforward customization for developers and content creators.

Key features come from a tight coupling of rendering, math typesetting, and document export. The UI responds instantly to input, while the underlying data model remains deterministic and easy to test. The project aims to be approachable for contributors and useful for teams that need a reliable Markdown workflow.

If you are looking for a modern editor that handles Markdown with math, diagrams, and polished visuals, this project provides a solid foundation plus practical export options for real-world use.



## Why this project exists

- Markdown is a universal format for content creation. A strong editor accelerates writing and publication.
- Authors often need equations and math notation. KaTeX support delivers fast, accurate rendering.
- Teams publish documents in multiple formats. A native export to PDF and DOCX reduces friction.
- A modern frontend stack helps developers maintain and extend features over time.
- A focused, performance-first approach yields snappy interactions and predictable rendering.



## Tech stack and architecture

- Frontend: React with TypeScript
- Build: Vite
- Styling: Tailwind CSS
- State management: Zustand
- Markdown parsing: A fast parser with syntax highlighting support
- Math rendering: KaTeX
- Export: PDF in-browser rendering and DOCX generation
- Runtime: Client-side, offline-friendly

Project structure reflects these choices. A small set of core components handles editing, preview, and export. A separate utility layer encapsulates math rendering, syntax highlighting, and document formatting. The code favors clear data flow and testable units.



## Features in detail

- Live preview
  - As you type, the preview pane updates in real time.
  - The renderer handles common Markdown features, fenced code blocks, lists, tables, and inline formatting.
  - Math support via KaTeX lets you embed equations inline or as display blocks.

- Syntax highlighting
  - Code blocks get syntax coloring based on the detected language.
  - Language detection is conservative and can be overridden with explicit fenced fences.

- LaTeX math support
  - Inline math with math delimiters and display math environments render cleanly.
  - KaTeX provides fast rendering with reliable typography.

- Dark mode
  - A dark theme that reduces eye strain and improves contrast.
  - Theme preference is persisted in local storage.

- Auto-save
  - Your work is saved automatically at regular intervals.
  - If you leave the page, your latest edits remain intact on reload.

- Keyboard shortcuts
  - Quick access to common actions: bold, italic, code, headings, lists, and export.
  - Shortcuts are configurable with a user-friendly panel.

- Export to PDF and DOCX
  - PDF export uses in-browser rendering to generate a print-ready document.
  - DOCX export creates a word processor friendly file for collaboration.
  - Export respects layout, tables, and math rendering for consistent output.

- Live collaboration-friendly edits
  - While not a full collaboration engine, the editor operates well in teams by providing clean export formats and predictable rendering.

- Accessibility
  - Keyboard navigable controls.
  - Clear focus outlines and semantic markup in the editor UI.

- Offline-first design
  - The editor loads and operates without a constant network connection.
  - Local storage keeps user data safe when browsing offline.

- Extensibility
  - A clean plugin surface allows adding new markdown flavors, export options, or custom renderers.
  - The codebase favors small, composable modules.



## Getting started

Prerequisites:
- Node.js (LTS version recommended)
- npm or pnpm

Quick start steps:
1. Install dependencies.
2. Run the development server.
3. Open the app in your browser.

Installation tips:
- If you prefer yarn, substitute yarn install in place of npm install.
- For speed, leverage a package manager that uses a lockfile for deterministic installs.

Commands:
- Install: npm install
- Start dev: npm run dev
- Build for production: npm run build
- Preview production build locally: npm run preview
- Lint and type check: npm run lint && npm run typecheck

Notes:
- The project targets modern browsers. It uses ES modules and dynamic imports for fast startup.
- The development server provides HMR for a smooth editing experience.



## Usage patterns

- Create a markdown document with headings, emphasis, lists, and code blocks.
- Add LaTeX math to enrich technical documents.
- Use the live preview to verify rendering and layout.
- Export the finished document to PDF or DOCX for distribution.

Practical tips:
- Keep math content concise to ensure readable output.
- Use fenced code blocks to show code samples with syntax highlighting.
- Leverage tables and lists to organize information clearly.



## Editor UX and UI components

- Editor pane
  - Rich text area that maps Markdown syntax to a clean editing surface.
  - Inline formatting quick actions and a compact toolbar.

- Preview pane
  - Renders Markdown with syntax highlighting and math support.
  - Responsive layout adapts to screen size and orientation.

- Toolbar and controls
  - Bold, italic, code, headings, lists, links, and image insertion.
  - Shortcuts panel to discover and customize commands.

- Theme switcher
  - Toggle between light and dark modes.
  - Persists user preference across sessions.

- Export panel
  - Choose PDF or DOCX output.
  - Configure page size, margins, and fonts as needed.

- Settings panel
  - Keyboard shortcuts, autosave interval, and rendering options.
  - Options to customize code block highlighting and math rendering.



## How math is rendered

- KaTeX processes inline and display math expressions.
- Delimiters are supported for inline (\( ... \)) and display (\[ ... \]) math, as well as dollar-based syntax if preferred.
- Rendering uses a fast, client-side math engine with precise spacing and typography.
- When exporting, math is preserved in the PDF or transformed into docx-friendly formats where possible.



## Export to PDF and DOCX

- PDF export
  - Uses in-browser rendering to produce a faithful, printable document.
  - Supports diagrams, tables, and math blocks with correct alignment.
  - Output is suitable for sharing, printing, or archiving.

- DOCX export
  - Produces a Word-friendly document with preserved structure.
  - Equations and special formatting map to compatible Word features.
  - Ideal for collaborative editing in teams that rely on Word workflows.

- How to export
  - Open your document in the editor.
  - Open the export panel.
  - Choose PDF or DOCX.
  - Adjust settings if needed and start the export.
  - Download the resulting file when ready.

- Considerations
  - Complex layouts may require post-export tweaks in the target program.
  - Some advanced Markdown extensions may not map 1:1 to DOCX; expect reasonable fidelity with core features.



## Keyboard shortcuts

- Bold: Ctrl/Cmd + B
- Italic: Ctrl/Cmd + I
- Code: Ctrl/Cmd + ` (backtick)
- Headings: Ctrl/Cmd + 1..6 for H1..H6
- List: Ctrl/Cmd + Shift + 8 for unordered list
- Numbered list: Ctrl/Cmd + Shift + 7
- Preview: Ctrl/Cmd + Shift + P
- Export PDF: Ctrl/Cmd + P (print dialog can be used for PDF)
- Save: Ctrl/Cmd + S (auto-save is always enabled, but you can trigger manually)
- Find/Replace: Ctrl/Cmd + F / Ctrl/Cmd + H

Custom shortcuts
- You can customize shortcuts in the Settings panel.
- Shortcuts are stored locally and persist between sessions.



## Dark mode and theming

- The app respects OS-level dark mode by default.
- You can lock the theme to light or dark as you prefer.
- Theme tokens are managed with Tailwind CSS for consistent styling.
- The color palette emphasizes legibility and contrast.



## Auto-save and data safety

- Auto-save runs at a user-defined interval.
- Edits are saved to local storage to guard against accidental loss.
- If the browser or tab closes unexpectedly, you can recover the last saved version on reload.
- A small indicator shows the autosave status and last save time.



## Performance and accessibility

- Rendering uses incremental updates to minimize reflow and repaint cost.
- The editor remains responsive even with large documents.
- Focus management and ARIA attributes improve keyboard navigation and screen reader support.
- High-contrast mode is available for users with visual impairments.



## Architecture and design decisions

- Component modularity
  - Editor region handles input, formatting toggles, and code blocks.
  - Preview region renders Markdown and math with live updates.
  - Export module encapsulates PDF and DOCX generation logic.

- Data flow
  - The app uses a unidirectional data flow: user input updates state, state renders the preview, and export consumes state to produce outputs.
  - Zustand powers the central store for predictable state changes.

- Styling strategy
  - Tailwind CSS provides a scalable design system.
  - Components use utility classes to reduce custom CSS and improve consistency.

- Type safety
  - TypeScript provides strict types across models, actions, and API surfaces.
  - Interfaces describe editor content and export configurations clearly.

- Security considerations
  - Markdown is parsed in a sandboxed environment to minimize risk from malformed input.
  - User data remains on the client unless the user chooses to export or copy content.

- Testing approach
  - Unit tests cover core utilities and renderer logic.
  - Integration tests ensure the editor flow works end-to-end.
  - Visual regression tests confirm rendering fidelity across themes.



## Folder structure (high level)

- src/
  - components/        // UI components: editor, preview, toolbars
  - hooks/             // custom hooks for editor behavior
  - state/             // Zustand store and selectors
  - render/            // Markdown rendering pipeline
  - export/            // PDF and DOCX export utilities
  - styles/            // Tailwind configuration and global styles
  - utils/             // helpers and utilities
  - locales/           // localization resources
  - tests/             // tests for logic and rendering
- public/              // static assets
- scripts/             // build and maintenance scripts
- README.md            // this file



## How to contribute

We welcome thoughtful contributions. Here is a practical path to participate:

- Start by forking the repository and cloning your fork.
- Create a short-lived feature branch with a descriptive name.
- Install dependencies and run the project locally to verify changes.
- Write tests for new features or bug fixes.
- Keep changes small and focused. Prefer one logical improvement per PR.
- Update documentation when you add or change public API behavior.

Contribution steps:
1. Fork the repository on GitHub.
2. Clone your fork locally.
3. Create a feature branch: git checkout -b feature/your-feature
4. Implement the feature and tests.
5. Run the test suite and ensure all checks pass.
6. Push the branch and open a pull request.
7. Engage in discussion and refine the changes as needed.

Code style and tooling:
- Follow the established TypeScript conventions.
- Use meaningful names for variables and functions.
- Keep components small and focused.
- Add JSDoc comments where helpful.
- Run linting and type checks before submitting.



## Testing and quality

- Unit tests cover the rendering utilities, math rendering, and export helpers.
- End-to-end tests validate the editor flow from typing to export.
- Visual tests ensure UI renders correctly in light and dark themes.
- Performance tests measure the time to render large Markdown documents and LaTeX blocks.



## Documentation and references

- The project uses Markdown for content authoring. This README serves as a living guide.
- In-app help and tooltips provide quick direction for new users.
- Localization files support multiple languages to broaden accessibility.



## Localization and internationalization

- Text labels and UI strings are stored in locale files.
- Adding a new language involves providing translations for keys and adjusting date/number formats if needed.
- The math rendering and code blocks remain consistent across languages.



## Internationalization considerations

- Ensure right-to-left support where applicable.
- Provide locale-specific formatting for dates and numbers in exports.



## Licensing and attribution

- This project uses an open source license that permits modification and redistribution.
- You can use, modify, and contribute to the code with attribution as required by the license.
- If you reuse components or utilities from third-party libraries, comply with their licenses.



## Release notes and releases

- Regular releases include feature improvements, performance enhancements, and bug fixes.
- Release notes describe what changed, why it changed, and any migration steps if needed.
- For the latest version and to download release assets, visit the Releases page. You can also use a direct link to the releases at https://github.com/panukoss/markdown-editor/releases.

Note: The Releases page is the primary source for downloadables and version history. If you encounter a broken link in the app, check the Releases section for the latest assets and installation guidance.



## FAQ

- What platforms does this work on?
  - It runs in modern browsers on desktop and mobile devices. It is designed to function offline while keeping your data on your device.

- How do I export to PDF or DOCX?
  - Use the export panel to choose the format. The PDF export renders the document for printing. The DOCX export maps to Word-friendly structures.

- Can I customize the editor?
  - Yes. The code includes a plugin mechanism and a configuration surface. You can add tabs, extra formatting, or alternate renderers.

- How is math rendered?
  - KaTeX handles inline and display math. It provides precise rendering and good typography.

- Is the project suitable for teams?
  - It offers clean export formats and a stable editing experience, which is helpful for collaborative workflows.



## Known issues and future work

- Some advanced Markdown extensions may not map perfectly to DOCX output. Plan for gradual coverage and clear migration notes.
- Real-time collaboration is on the roadmap. It will require a synchronization layer and conflict resolution strategy.
- Additional export formats can be added without touching core rendering.



## Getting the most from this repository

- Start with the core editor and preview to understand the data flow.
- Experiment with LaTeX blocks to see how math renders in both the editor and the export outputs.
- Try exporting to PDF first, then to DOCX, to compare fidelity and layout.
- Tweak themes and settings to fit your workflow and display preferences.



## Credits

- The project relies on React for UI, TypeScript for type safety, and Vite for fast builds.
- Tailwind CSS guides the design system for consistent visuals.
- Zustand provides a lightweight, predictable state container for the editor.
- KaTeX powers math rendering with reliable typography.
- The team behind this project values simplicity, reliability, and clear documentation.



## Release notes and the second reminder

For the latest version and to download release assets, visit the Releases page. Again, you can find it at https://github.com/panukoss/markdown-editor/releases. This ensures you have the most up-to-date features, fixes, and improvements available to your setup. The release page is the primary source of downloadables and version history, and it remains the best place to verify compatibility with your environment. It is recommended to check the Releases section if a link seems unavailable or if you want to confirm updated assets. 



## Appendix: example usage scenarios

- Scenario A: A writer creates a technical guide with equations
  - Start with a clean Markdown file.
  - Add inline math for formulas and display blocks for larger equations.
  - Use the syntax highlighting for code samples to keep examples readable.
  - Preview the document to verify layout and readability.
  - Export to PDF for distribution and to DOCX for ongoing drafting in Word.

- Scenario B: A researcher prepares a lecture handout
  - Include diagrams and tables to organize information.
  - Use math blocks for equations and align them in the proper layout.
  - Adjust the page settings in the export panel to fit the handout size.
  - Save automatically and export after final edits.

- Scenario C: A developer documents a project
  - Use fenced code blocks to present code samples with syntax highlighting.
  - Include sections with headings for easy navigation.
  - Export to PDF for a printable version and to DOCX for editing by collaborators.



## Re-check and accessibility sanity

- The editor remains responsive across devices.
- Keyboard shortcuts work consistently across platforms.
- The UI remains legible in dark mode and on high-contrast displays.
- Help text and tooltips explain features clearly.



## Sanity checks

- Run type checks and linting to enforce code quality.
- Review changes for potential breakages in the rendering or export pipelines.
- Validate that math blocks render properly in both the editor and exported documents.



## Closing note

This README aims to provide a thorough guide to the Markdown editor, its capabilities, and the development path for contributors. It emphasizes practical usage, reliable export options, and a strong, accessible user experience. It stays focused on concrete steps, clear explanations, and a calm, confident tone that reflects the product's design philosophy.