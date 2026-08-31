import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
    envDir: "test/integration/env",
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        include: ["src/__tests__/**/*.test.{ts,tsx}"],
        setupFiles: "./setupTests.ts",
    },
    resolve: {
        alias: {
            "@": new URL("./src", import.meta.url).pathname,
        },
    },
});
