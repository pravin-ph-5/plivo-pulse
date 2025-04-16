// hah om sai ram om bhaskaraya namaha om namaha sivayaa 

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ Allows imports like "@/components/..."
    },
  },
  server: {
    watch: {
      usePolling: true, // This can help if you're on a system with file-watching issues, such as Windows or networked file systems.
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
