import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,  // Enable polling to detect changes
    },
    host: true,           // Allows access from outside the container
    port: 3000,           // Ensure it matches the Docker EXPOSE port
  },
})
