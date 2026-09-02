import { defineConfig, devices } from "@playwright/test";

const PORT = 3006;
const origin = `http://localhost:${PORT}`;
const healthURL = `${origin}/person/personopplysninger/api/internal/isReady`;

export default defineConfig({
    testDir: "./e2e",
    testMatch: "**/*.spec.ts",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? "list" : [["html", { open: "never" }]],
    use: {
        baseURL: origin,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    projects: [
        { name: "chromium", use: { ...devices["Desktop Chrome"] } },
        { name: "mobile", use: { ...devices["Pixel 7"] } },
    ],
    webServer: {
        command: "pnpm dev",
        url: healthURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        env: {
            MOCK_SERVER_PORT: "3107",
        },
    },
});
