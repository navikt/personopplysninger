import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { honoMockPlugin } from "./src/mocks/vitePlugin";

const isLocal = process.env.VITE_ENV === "local";

export default defineConfig(() => {
    return {
        define: {
            "process.env": {},
        },
        build: {
            outDir: "build",
            assetsInlineLimit: 0,
            sourcemap: true,
        },
        base: isLocal ? "" : process.env.PUBLIC_URL,
        plugins: [
            honoMockPlugin(),
            react(),
            nodePolyfills({
                globals: {
                    process: true,
                },
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            port: 3006,
        },
    };
});
