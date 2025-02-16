import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isDevelopment = process.env.NODE_ENV === 'development';

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    manifest: true,
  },
  server: isDevelopment ? {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  } : {},
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
