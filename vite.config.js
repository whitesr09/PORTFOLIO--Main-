import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the same build works on GitHub Pages
// (/<repo>/ sub-path), Vercel and any static host.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { cssMinify: true, reportCompressedSize: false },
})
