import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  server: {
    host: true,
    proxy:
     {
        '/user': {
            target: 'https://notesapp-roks.onrender.com',
            changeOrigin: true,
            secure: true
        },
        '/note':{
        target: 'https://notesapp-roks.onrender.com',
            changeOrigin: true,
            secure: true
        }
    },
  plugins: [react()],
  build:{
    outDir:'build'
  }
}}
)
