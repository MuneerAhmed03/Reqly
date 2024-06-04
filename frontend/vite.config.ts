import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const { VITE_REQLY_URL } = loadEnv("", process.cwd()) || "http://localhost:3000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort:true,
    port: 8080,
    proxy: {
      "/socket.io": {
        target: VITE_REQLY_URL,
        ws: true,
        changeOrigin: true,
      },
    },
  },
  // preview: {
  //   host: '0.0.0.0',
  //   port: 8000,
  // },
});
