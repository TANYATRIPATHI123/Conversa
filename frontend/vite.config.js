import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || 'https://conversa-nspg.onrender.com',
  server:{
    proxy:{
      '/api':{
        target:'https://conversa-nspg.onrender.com',
        secure:false
      }
    }
  },
})

