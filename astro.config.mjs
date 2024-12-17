// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  outDir: './dist', // Keep this to specify output directory
  vite: {
    ssr: {
      external: ['@splinetool/react-spline'], // Exclude Spline from SSR
    },
    build: {
      minify: false, // Optional: Disable minification for debugging
      sourcemap: false, // Optional: Generate sourcemaps for easier debugging
    },
    server: {
      fs: {
        strict: false, // Allow serving files outside root if needed
      },
    },
  },
});
