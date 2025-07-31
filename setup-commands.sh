#!/bin/bash

# Initialize React project with Vite and TypeScript
npm create vite@latest . -- --template react-ts

# Install core dependencies
npm install

# Install UI and styling dependencies
npm install -D tailwindcss postcss autoprefixer
npm install @headlessui/react lucide-react framer-motion

# Install markdown processing libraries
npm install @uiw/react-md-editor @uiw/react-markdown-preview
npm install remark remark-gfm remark-math rehype-katex rehype-highlight
npm install mermaid

# Install export libraries
npm install jspdf html2canvas docx file-saver
npm install --save-dev @types/file-saver

# Install state management
npm install zustand immer

# Install development tools
npm install -D @types/react @types/react-dom
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @vitejs/plugin-react

# Initialize Tailwind CSS
npx tailwindcss init -p