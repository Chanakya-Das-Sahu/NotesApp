import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  server:{
    proxy:{
      '/user':'https://notesapp-roks.onrender.com',
      '/note':'https://notesapp-roks.onrender.com'
      // '/user':'http://localhost:3000',
      // '/note':'http://localhost:3000'
    }
  },
  plugins: [react()]
}
)
