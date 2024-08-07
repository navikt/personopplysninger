import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

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
        plugins: [
            react(),
            // fetch-mock calls global 'process' which is not available
            // in the browser, so mock this.
            nodePolyfills({
                globals: {
                    process: true,
                },
            }),
        ],
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
