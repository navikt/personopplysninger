import { fileURLToPath } from "node:url";
import { getViteConfig } from "astro/config";

export default getViteConfig({
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    // Astro's helper accepts this at runtime, but its type here doesn't include Vitest's augmentation.
    // @ts-expect-error Vitest config
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./setupTests.ts"],
        include: ["src/**/*.test.{ts,tsx}"],
    },
});
