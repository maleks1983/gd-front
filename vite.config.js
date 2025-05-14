import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['vindg.org', 'localhost', '192.168.31.171'], // або просто true
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
      '/login': 'http://localhost:8080'
    }
  }
});
