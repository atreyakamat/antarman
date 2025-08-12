// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  outDir: './dist',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto', // Auto-inline small CSS files
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  vite: {
    ssr: {
      external: ['@splinetool/react-spline'],
    },
    build: {
      minify: 'esbuild', // Enable minification for production
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@astrojs/tailwind']
          }
        }
      }
    },
    server: {
      fs: {
        strict: false,
      },
    },
  },
});
