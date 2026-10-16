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
    build: {
        assetsPrefix: "https://cdn.nav.no/min-side/personopplysninger",
    },
    integrations: [react()],
    logger: { entrypoint: "@navikt/astro-logger" },
    i18n: {
        defaultLocale: "nb",
        locales: ["nb", "nn", "en"],
        routing: {
            prefixDefaultLocale: true,
            redirectToDefaultLocale: false,
        },
    },
    env: {
        // Leses ved kjøring (server/secret), siden samme image deployes til alle miljøer.
        // Verdiene for dev og prod settes i nais/<cluster>/nais.yaml; standardverdiene gjelder lokalt.
        schema: {
            APP_ORIGIN: envField.string({ context: "server", access: "secret", default: "http://localhost:4321" }),
            API_PATH: envField.string({ context: "server", access: "secret", default: "/api" }),
            BUILD_VERSION: envField.string({ context: "server", access: "secret", default: "local" }),
            DINE_SAKER_URL: envField.string({ context: "server", access: "secret", default: "https://www.intern.dev.nav.no/dokumentarkiv" }),
            DITT_NAV_URL: envField.string({ context: "server", access: "secret", default: "https://www.intern.dev.nav.no/minside" }),
            ENDRE_KONTONUMMER_URL: envField.string({ context: "server", access: "secret", default: "http://localhost:4321/api" }),
            INNLOGGINGSSTATUS_URL: envField.string({ context: "server", access: "secret", default: "http://localhost:4321/api/auth" }),
            LOGIN_URL: envField.string({ context: "server", access: "secret", default: "http://localhost:4321/oauth2/login" }),
            PDL_URL: envField.string({ context: "server", access: "secret", default: "https://www.intern.dev.nav.no/person/pdl-fullmakt-ui" }),
            SKJERMING_URL: envField.string({
                context: "server",
                access: "secret",
                default: "https://skjerming-ui.intern.dev.nav.no/person/personopplysninger/skjerming",
            }),
            SYKEFRAVAER_URL: envField.string({ context: "server", access: "secret", default: "https://www.ekstern.dev.nav.no/syk/sykefravaer" }),
            TELEMETRY_URL: envField.string({ context: "server", access: "secret", default: "https://telemetry.ekstern.dev.nav.no/collect" }),
            UTBETALINGSOVERSIKT_URL: envField.string({
                context: "server",
                access: "secret",
                default: "https://www.intern.dev.nav.no/utbetalingsoversikt/",
            }),
        },
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
                // Helsesjekkene under /api/internal er Astro-ruter og skal ikke til mock-serveren.
                "^/api/(?!internal/)": `http://localhost:${mockServerPort}`,
            },
        },
    },
});
