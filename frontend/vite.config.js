import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, '')
  const proxy = {
    '/api': {
      target: env.BACKEND_URL || 'http://127.0.0.1:4000',
      // Preserve the browser-facing Host for the backend's origin checks.
      changeOrigin: false
    }
  }
  return {
    plugins: [react()],
    server: { host: '127.0.0.1', port: 5174, strictPort: true, proxy },
    preview: { proxy }
  }
})
