import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: 'src/setupTests',
        mockReset: true,
    },
})
