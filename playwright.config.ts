import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3006/person/personopplysninger";

export default defineConfig({
    testDir: "./test/integration",
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    reporter: "list",
    use: {
        baseURL,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
    webServer: process.env.PLAYWRIGHT_BASE_URL
        ? undefined
        : {
              command: "npm start",
              env: {
                  NODE_ENV: "development",
              },
              url: `${baseURL}/api/internal/isAlive`,
              reuseExistingServer: !process.env.CI,
              timeout: 120_000,
          },
});
