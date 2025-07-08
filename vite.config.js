import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'src', // C:\Users\Torma\OneDrive\Desktop\New folder\Focus-flow-react\index.html
  build: {
    rollupOptions: {
      input: 'relative/path/to/index.html'
    }
  }
});