import { fileURLToPath } from "node:url";
import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig, envField } from "astro/config";

const mockServerPort = Number(process.env.MOCK_SERVER_PORT) || 3007;
const useCdnAssets = process.env.GITHUB_ACTIONS === "true";

// Server-context, secret-access fields are never inlined into the client bundle.
// Values are read from process.env at request time, which lets a single built
// image serve both the public (personbruker) and internal (min-side) Nais
// Applications with different values injected through env vars in nais/*.
const serverSecret = (defaultValue) => envField.string({ context: "server", access: "secret", default: defaultValue });

export default defineConfig({
    base: "/person/personopplysninger",
    compressHTML: true,
    build: {
        ...(useCdnAssets && {
            assetsPrefix: "https://cdn.nav.no/min-side/personopplysninger",
        }),
    },
    server: {
        port: 3006,
    },
    vite: {
        build: {
            assetsInlineLimit: 0,
            sourcemap: true,
        },
        server: {
            proxy: {
                "/api": `http://localhost:${mockServerPort}`,
            },
        },
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
    },
    integrations: [react()],
    logger: {
        entrypoint: "@navikt/astro-logger",
    },
    i18n: {
        defaultLocale: "nb",
        locales: ["nb", "nn", "en"],
        routing: "manual",
    },
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
    env: {
        schema: {
            APP_ENV: envField.enum({
                context: "server",
                access: "secret",
                values: ["local", "dev", "prod"],
                default: "local",
            }),
            BUILD_VERSION: serverSecret("localbuild"),
            APP_URL: serverSecret("http://localhost:3006/person/personopplysninger"),
            API_URL: serverSecret("/api"),
            ENDRE_KONTONUMMER_URL: serverSecret("/api"),
            INNLOGGINGSSTATUS_URL: serverSecret("/api/auth"),
            LOGIN_URL: serverSecret("https://loginservice-q.nav.no/login"),
            DINE_SAKER_URL: serverSecret("https://www.nav.no/dokumentarkiv"),
            DITT_NAV_URL: serverSecret("https://www.nav.no/minside"),
            PDL_URL: serverSecret("https://www.nav.no/person/pdl-fullmakt-ui"),
            SKJERMING_URL: serverSecret("https://www.nav.no/person/personopplysninger/skjerming"),
            SYKEFRAVAER_URL: serverSecret("https://www.ekstern.dev.nav.no/syk/sykefravaer"),
            UTBETALINGSOVERSIKT_URL: serverSecret("https://www.intern.dev.nav.no/utbetalingsoversikt"),
            TELEMETRY_URL: serverSecret("http://localhost:12347/collect"),
        },
    },
});
