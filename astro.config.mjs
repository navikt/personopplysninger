import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig, envField } from "astro/config";
import path from "path";

const mockServerPort = Number(process.env.MOCK_SERVER_PORT) || 3007;

export default defineConfig({
    base: "/person/personopplysninger",
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
    integrations: [react()],
    i18n: {
        defaultLocale: "nb",
        locales: ["nb", "nn", "en"],
        routing: {
            prefixDefaultLocale: true,
            redirectToDefaultLocale: true,
        },
    },
    env: {
        schema: {
            PUBLIC_ENV: envField.enum({
                context: "client",
                access: "public",
                values: ["local", "dev", "prod"],
            }),
            PUBLIC_BUILD_VERSION: envField.string({ context: "client", access: "public" }),
            PUBLIC_DINE_SAKER_URL: envField.string({ context: "client", access: "public", url: true }),
            PUBLIC_PDL_URL: envField.string({ context: "client", access: "public", url: true }),
            PUBLIC_SKJERMING_URL: envField.string({ context: "client", access: "public", url: true }),
            PUBLIC_APP_URL: envField.string({ context: "client", access: "public", url: true }),
            PUBLIC_API_URL: envField.string({ context: "client", access: "public", url: true }),
            PUBLIC_ENDRE_KONTONUMMER_URL: envField.string({ context: "client", access: "public", url: true }),
            PUBLIC_UTBETALINGSOVERSIKT_URL: envField.string({ context: "client", access: "public", url: true }),
            PUBLIC_SYKEFRAVAER_URL: envField.string({ context: "client", access: "public", url: true }),
            PUBLIC_LOGIN_URL: envField.string({ context: "client", access: "public", url: true }),
            PUBLIC_DITT_NAV_URL: envField.string({ context: "client", access: "public", url: true }),
            PUBLIC_PENSJONSOPPTJENING_URL: envField.string({ context: "client", access: "public", url: true }),
            PUBLIC_INNLOGGINGSSTATUS_URL: envField.string({ context: "client", access: "public", url: true }),
            PUBLIC_TELEMETRY_URL: envField.string({ context: "client", access: "public", url: true }),
        },
    },
    server: {
        port: 3006,
    },
    vite: {
        build: {
            sourcemap: true,
        },
        resolve: {
            alias: {
                "@": path.resolve("./src"),
            },
        },
        server: {
            proxy: {
                "/api": `http://localhost:${mockServerPort}`,
            },
        },
    },
});
