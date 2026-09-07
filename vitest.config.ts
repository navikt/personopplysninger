import react from "@vitejs/plugin-react";
import path from "path";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true, // Ensure globals are enabled
        environment: "jsdom",
        setupFiles: "./setupTests.ts",
        exclude: [...configDefaults.exclude, "test/integration/**"],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
