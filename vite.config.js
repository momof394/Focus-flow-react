import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // This tells Vite to use the root of the project
  build: {
    outDir: 'dist',
  },
})
