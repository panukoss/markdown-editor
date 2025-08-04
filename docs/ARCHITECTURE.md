# Architecture Documentation

## Overview

The Markdown Editor is a single-page application (SPA) built with React and TypeScript. It follows a component-based architecture with clear separation of concerns between UI, state management, and business logic.

## System Architecture

```plantuml
@startuml System Architecture
!theme plain

skinparam componentStyle rectangle

package "Client Browser" {
  component [Markdown Editor SPA] {
    component [React Application] as app
    component [Local Storage] as storage
    component [Service Workers] as sw
  }
}

cloud "External Services" {
  component [CDN Assets] as cdn
  note right of cdn : Fonts, static assets
}

component [Web Server] as server
note right of server : Nginx/Apache\nStatic file hosting

[server] --> [app] : Serve SPA
[app] --> [storage] : Persist state
[app] --> [cdn] : Load assets
[app] --> [sw] : Offline support\n(future)

@enduml
```

## Component Architecture

```plantuml
@startuml Component Architecture
!theme plain

package "Application Layer" {
  component [App.tsx] as app
  component [AppLayout] as layout
}

package "UI Components" {
  package "Layout" {
    component [Header] as header
    component [SplitPane] as split
  }
  
  package "Editor" {
    component [MarkdownEditor] as editor
    component [EditorToolbar] as toolbar
  }
  
  package "Preview" {
    component [MarkdownPreview] as preview
  }
  
  package "Modals" {
    component [Modal] as modal
    component [ExportModal] as exportModal
    component [CopyModal] as copyModal
    component [CommandPalette] as cmdPalette
  }
}

package "State Management" {
  component [editorStore] as editorStore
  component [modalStore] as modalStore
  component [themeStore] as themeStore
}

package "Hooks" {
  component [useKeyboardShortcuts] as shortcuts
  component [useSyncScroll] as sync
}

app --> layout
layout --> header
layout --> split
split --> editor
split --> preview

editor ..> editorStore : subscribes
preview ..> editorStore : subscribes
header ..> modalStore : triggers
modal ..> modalStore : subscribes

editor --> toolbar
editor ..> sync : uses
preview ..> sync : uses
layout ..> shortcuts : uses

@enduml
```

## Data Flow Architecture

```plantuml
@startuml Data Flow
!theme plain

actor User
participant "UI Component" as UI
participant "React Hook" as Hook
participant "Zustand Store" as Store
database "Local Storage" as Storage

User -> UI : Interaction
UI -> Hook : Event Handler
Hook -> Store : Update State
Store -> Storage : Persist
Store --> UI : Re-render
UI -> User : Updated View

note over Store : Single source\nof truth

@enduml
```

## State Management Architecture

```plantuml
@startuml State Management
!theme plain

class EditorStore {
  -content: string
  -lastSaved: Date
  -isAutoSaveEnabled: boolean
  +setContent(content: string)
  +setLastSaved(date: Date)
  +toggleAutoSave()
}

class ModalStore {
  -isExportOpen: boolean
  -isCopyOpen: boolean
  -isHelpOpen: boolean
  -isCommandPaletteOpen: boolean
  +openExport()
  +closeExport()
  +openCopy()
  +closeCopy()
}

class ThemeStore {
  -isDarkMode: boolean
  +toggleDarkMode()
  +setDarkMode(isDark: boolean)
}

note top of EditorStore : Persisted to\nLocal Storage

note top of ThemeStore : Persisted to\nLocal Storage

@enduml
```

## Export System Architecture

```plantuml
@startuml Export System
!theme plain

interface ExportHandler {
  +export(content: string, fileName: string): Promise<void>
}

class PDFExporter implements ExportHandler {
  -createTempContainer()
  -applyStyles()
  -renderMarkdown()
  -generatePDF()
  +export(content, fileName)
}

class DOCXExporter implements ExportHandler {
  -parseMarkdown()
  -createDocument()
  -processElements()
  +export(content, fileName)
}

class MarkdownExporter implements ExportHandler {
  -createBlob()
  -triggerDownload()
  +export(content, fileName)
}

class ExportManager {
  -exporters: Map<string, ExportHandler>
  +registerExporter(type, handler)
  +export(type, content, fileName)
}

ExportManager --> ExportHandler : uses
ExportManager --> PDFExporter : creates
ExportManager --> DOCXExporter : creates
ExportManager --> MarkdownExporter : creates

@enduml
```

## Keyboard Shortcut System

```plantuml
@startuml Keyboard System
!theme plain

class ShortcutHandler {
  +key: string
  +ctrl: boolean
  +shift: boolean
  +alt: boolean
  +handler: () => void
  +description: string
}

class KeyboardManager {
  -shortcuts: ShortcutHandler[]
  -isValidContext(): boolean
  +registerShortcut(shortcut: ShortcutHandler): void
  +handleKeyDown(event: KeyboardEvent): void
}

class useKeyboardShortcuts <<hook>> {
  -shortcuts: ShortcutHandler[]
  -setupListeners(): void
  -cleanupListeners(): void
}

KeyboardManager --> ShortcutHandler : manages
useKeyboardShortcuts --> KeyboardManager : uses

note right of KeyboardManager : Context-aware\nshortcut handling

@enduml
```

## Copy System Architecture

```plantuml
@startuml Copy System
!theme plain

class CopyUtils {
  +copyToClipboard(text: string): Promise<boolean>
  +copyRichText(html: string): Promise<boolean>
  +getRenderedHTML(element: HTMLElement): string
  +getPlainTextWithFormatting(element: HTMLElement): string
}

class ClipboardAPI {
  +writeText(text: string): Promise<void>
  +write(items: ClipboardItem[]): Promise<void>
}

class FallbackCopy {
  -createTextArea()
  -selectText()
  -execCommand()
}

CopyUtils --> ClipboardAPI : prefers
CopyUtils --> FallbackCopy : fallback
CopyUtils : Modern API detection

note bottom of FallbackCopy : For older browsers

@enduml
```

## Deployment Architecture

```plantuml
@startuml Deployment
!theme plain

node "Development" {
  component [Vite Dev Server] as dev
  component [HMR] as hmr
  component [TypeScript Compiler] as tsc
}

node "Build Process" {
  component [Vite Build] as build
  component [Rollup] as rollup
  component [Terser] as terser
}

node "Production" {
  folder "dist/" {
    file "index.html" as html
    folder "assets/" {
      file "*.js" as js
      file "*.css" as css
      file "*.woff2" as fonts
    }
  }
}

dev --> build : npm run build
build --> rollup : Bundle
rollup --> terser : Minify
terser --> html : Generate

note right of dev : Local development\nwith hot reload

note right of build : Optimized\nproduction build

@enduml
```

## Security Architecture

```plantuml
@startuml Security
!theme plain

package "Security Layers" {
  component [Content Security Policy] as csp
  component [Input Sanitization] as sanitize
  component [XSS Prevention] as xss
  component [CORS Policy] as cors
}

package "User Input" {
  component [Markdown Editor] as input
  component [File Upload] as upload
}

package "Output" {
  component [HTML Preview] as preview
  component [Export Files] as export
}

input --> sanitize : Process
sanitize --> xss : Validate
xss --> preview : Render

upload --> sanitize : Validate
sanitize --> export : Generate

note top of csp : Restrictive CSP\nheaders

note bottom of xss : DOMPurify for\nHTML sanitization

@enduml
```

## Performance Optimization

```plantuml
@startuml Performance
!theme plain

package "Optimization Strategies" {
  package "Code Splitting" as split {
    component [Lazy Loading] as lazy
    component [Dynamic Imports] as dynamic
  }
  
  package "Asset Optimization" as assets {
    component [Image Compression] as images
    component [Font Subsetting] as fonts
    component [CSS Purging] as css
  }
  
  package "Runtime Optimization" as runtime {
    component [React.memo] as memo
    component [useMemo/useCallback] as hooks
    component [Virtual Scrolling] as virtual
  }
}

note right of split : Reduce initial\nbundle size

note right of assets : Minimize asset\npayload

note right of runtime : Optimize render\nperformance

@enduml
```

## Error Handling Architecture

```plantuml
@startuml Error Handling
!theme plain

class ErrorBoundary {
  -hasError: boolean
  -error: Error
  +componentDidCatch(error, info)
  +render()
}

class ErrorLogger {
  +logError(error: Error, context: string)
  +logWarning(message: string)
  +logInfo(message: string)
}

class UserNotification {
  +showError(message: string)
  +showSuccess(message: string)
  +showWarning(message: string)
}

ErrorBoundary --> ErrorLogger : reports
ErrorBoundary --> UserNotification : displays
ErrorLogger : Console + Sentry\n(future)

note bottom of ErrorBoundary : Catches React\ncomponent errors

@enduml
```

## Technology Decisions

### Frontend Framework: React
- Component-based architecture
- Large ecosystem
- Excellent TypeScript support
- Virtual DOM for performance

### State Management: Zustand
- Minimal boilerplate
- TypeScript-first
- Built-in persistence
- DevTools support

### Build Tool: Vite
- Fast HMR
- Optimized production builds
- Native ES modules
- Built-in TypeScript support

### Styling: Tailwind CSS
- Utility-first approach
- Built-in dark mode
- Tree-shaking unused styles
- Consistent design system

## Scalability Considerations

1. **Code Splitting**: Lazy load heavy features like export functionality
2. **State Management**: Zustand scales well with proper store separation
3. **Component Architecture**: Modular design allows easy feature addition
4. **Build Optimization**: Vite provides excellent optimization out of the box
5. **Browser Storage**: IndexedDB for larger datasets (future enhancement)

## Future Architecture Enhancements

1. **Plugin System**: Allow third-party extensions
2. **Web Workers**: Offload heavy processing
3. **PWA Support**: Offline functionality
4. **Collaboration**: WebRTC for real-time collaboration
5. **Cloud Sync**: Optional cloud storage integration