import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { honoMockPlugin } from "./src/mocks/vitePlugin";

const isLocal = process.env.VITE_ENV === "local";

export default defineConfig(() => {
    return {
        define: {
            "process.env": {},
        },
        envDir: process.env.VITE_ENV_DIR ?? ".",
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
                "@": new URL("./src", import.meta.url).pathname,
            },
        },
        server: {
            port: 3006,
        },
    };
});
