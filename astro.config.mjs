import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

const basePath = "/person/personopplysninger";
const envDir = process.env.ASTRO_ENV_DIR ?? (process.env.NODE_ENV === "test" ? "test/integration/env" : ".");

export default defineConfig({
    base: basePath,
    srcDir: "./src/astro",
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
    integrations: [react()],
    logger: {
        entrypoint: "./src/server/astroLogger.ts",
    },
    i18n: {
        defaultLocale: "nb",
        locales: ["nb", "nn", "en"],
        routing: {
            prefixDefaultLocale: true,
            redirectToDefaultLocale: true,
        },
    },
    server: {
        host: "127.0.0.1",
    },
    vite: {
        envDir,
        build: {
            sourcemap: true,
        },
        resolve: {
            alias: {
                "@": new URL("./src", import.meta.url).pathname,
            },
        },
        ssr: {
            // Astro and React Router require incompatible cookie majors.
            noExternal: ["cookie"],
        },
    },
});
