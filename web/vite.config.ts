import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert()
  ],
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: "../dist",
    emptyOutDir: true
  },
  envDir: "../"
})