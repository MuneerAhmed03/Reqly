import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const { VITE_REQLY_URL } = loadEnv('', process.cwd())

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: VITE_REQLY_URL,
        ws: true,
        changeOrigin: true,
      },
    },
  },
})
