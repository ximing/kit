import { copyFileSync, existsSync } from 'node:fs';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/kit/',
  plugins: [
    react(),
    {
      name: 'spa-github-pages-fallback',
      closeBundle() {
        if (existsSync('dist/index.html')) {
          copyFileSync('dist/index.html', 'dist/404.html');
        }
      },
    },
  ],
  build: { outDir: 'dist', emptyOutDir: true },
});
