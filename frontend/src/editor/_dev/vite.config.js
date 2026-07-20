// Standalone dev harness for Terminal 3's editor — not part of the shared app build.
// Run: cd ~/nova/frontend && npx vite --config src/editor/_dev/vite.config.js
// Reuses frontend/node_modules (react/vite already installed by Terminal 2's scaffold).
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: here,
  plugins: [react()],
  server: { port: 5183 },
});
