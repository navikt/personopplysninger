import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PLAYWRIGHT_PORT ?? 4321);
const origin = `http://127.0.0.1:${port}`;
const basePath = "/person/personopplysninger";

export default defineConfig({
    testDir: "./test/integration",
    testMatch: "**/*.spec.ts",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: "list",
    use: {
        baseURL: origin,
        screenshot: "only-on-failure",
        trace: "on-first-retry",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
    webServer: {
        command: `npm run start:astro -- --port ${port}`,
        url: `${origin}${basePath}/nb/`,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        env: {
            ASTRO_DISABLE_DECORATOR: "true",
            ASTRO_ENV_DIR: "test/integration/env",
            ASTRO_TELEMETRY_DISABLED: "1",
            VITE_API_URL: "/api",
            VITE_APP_URL: `${origin}${basePath}`,
            VITE_BUILD_VERSION: "test",
            VITE_DINE_SAKER_URL: "https://www.nav.no/dokumentarkiv",
            VITE_DITT_NAV_URL: "https://www.nav.no/minside",
            VITE_ENDRE_KONTONUMMER_URL: "/api",
            VITE_ENV: "local",
            VITE_INNLOGGINGSSTATUS_URL: "/api/auth",
            VITE_LOGIN_URL: "https://loginservice-q.nav.no/login",
            VITE_PDL_URL: "https://www.nav.no/person/pdl-fullmakt-ui",
            VITE_SKJERMING_URL: "https://www.nav.no/person/personopplysninger/skjerming",
            VITE_SYKEFRAVAER_URL: "https://www.ekstern.dev.nav.no/syk/sykefravaer",
            VITE_TELEMETRY_URL: `${origin}/collect`,
            VITE_UTBETALINGSOVERSIKT_URL: "https://www.intern.dev.nav.no/utbetalingsoversikt",
        },
    },
});
