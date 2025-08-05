import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    // Set base URL from environment variable or default to root
    base: env.VITE_BASE_URL || '/',
    plugins: [
      react(),
      tailwindcss()
    ],
    server: {
      host: true, // Listen on all addresses
      port: 5173,
      strictPort: false, // Use next available port if 5173 is taken
    },
    build: {
      chunkSizeWarningLimit: 4000, // Increase limit to 4MB (we have large libraries like jsPDF, docx, etc.)
    }
  }
})