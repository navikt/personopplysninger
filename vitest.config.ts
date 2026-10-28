import path from "path";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        projects: [
            {
                extends: true,
                test: {
                    name: "unit",
                    globals: true,
                    environment: "jsdom",
                    setupFiles: "./setupTests.ts",
                    exclude: [...configDefaults.exclude, "test/integration/**", "src/**/*.astro.test.ts"],
                },
            },
            "./vitest.astro.config.ts",
        ],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
