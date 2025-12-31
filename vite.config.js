import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  resolve: {
    alias: [
      // Fix for @react-pdf/renderer with Vite - resolve all pako subpath imports
      {
        find: /^pako\/lib\/(.*)$/,
        replacement: path.resolve(__dirname, 'node_modules/pako/lib/$1'),
      },
    ],
  },
  optimizeDeps: {
    include: ['@react-pdf/renderer', 'pako'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
})
