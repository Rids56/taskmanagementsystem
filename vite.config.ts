import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// React Compiler is enabled via babel plugin inside @vitejs/plugin-react
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    // alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
  plugins: [
    react({
      exclude: ['**/node_modules/**'],
      babel: {
        plugins: [
          'babel-plugin-react-compiler', // React Compiler — auto-memoizes your components
        ],
      },
    }),
  ],
  base: '/taskmanagementsystem/',
});
