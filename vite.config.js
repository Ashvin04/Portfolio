import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // This makes it work on GitHub Pages regardless of the repo name if using relative paths, or I can use /repo-name/
})
