import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true, // Ensure globals are enabled
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
