import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/weather-api': {
        target: 'https://api.openweathermap.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/weather-api/, ''),
      },
    },
  },
});
