import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts',
    },
    server: {
        watch: {
            usePolling: true,  // Enable polling to detect changes
        },
        host: true,           // Allows access from outside the container
        port: 3000,           // Ensure it matches the Docker EXPOSE port
    },
})
