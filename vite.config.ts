import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const isLocal = process.env.VITE_ENV === 'local';

export default defineConfig(() => {
    return {
        define: {
            'process.env': {},
        },
        build: {
            outDir: 'build',
            assetsInlineLimit: 0,
            sourcemap: true,
        },
        base: isLocal ? '' : process.env.PUBLIC_URL,
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            port: 3006,
        },
    };
});
