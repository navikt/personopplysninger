/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
    test: {
        name: "astro",
        globals: true,
        environment: "node",
        include: ["src/**/*.astro.test.ts"],
    },
});
