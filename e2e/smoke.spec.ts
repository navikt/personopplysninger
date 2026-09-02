import { expect, test } from "@playwright/test";

const basePath = "/person/personopplysninger";

test.describe("Smoke", () => {
    test("root redirects to the default locale (nb)", async ({ page }) => {
        await page.goto(`${basePath}/`);
        await expect(page).toHaveURL(new RegExp(`${basePath}/nb/?$`));
        await expect(page.getByRole("heading", { level: 1, name: "Personopplysninger" })).toBeVisible();
    });

    test("post-login path parameter restores the original deep link", async ({ page }) => {
        const target = `${basePath}/nb/institusjonsopphold`;
        await page.goto(`${basePath}/?path=${btoa(target)}`);
        await expect(page).toHaveURL(new RegExp(`${target}/?$`));
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test("nb locale renders the app shell", async ({ page }) => {
        await page.goto(`${basePath}/nb/`);
        await expect(page.getByRole("heading", { level: 1, name: "Personopplysninger" })).toBeVisible();
    });

    test("nn locale renders the app shell", async ({ page }) => {
        await page.goto(`${basePath}/nn/`);
        await expect(page.getByRole("heading", { level: 1, name: "Personopplysningar" })).toBeVisible();
    });

    test("en locale renders the app shell", async ({ page }) => {
        await page.goto(`${basePath}/en/`);
        await expect(page.getByRole("heading", { level: 1, name: "Personal data" })).toBeVisible();
    });

    test("a representative deep link (institusjonsopphold) renders via client-side routing", async ({ page }) => {
        await page.goto(`${basePath}/nb/institusjonsopphold`);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test("an unknown deep link under a locale shows the client-side not-found page", async ({ page }) => {
        await page.goto(`${basePath}/nb/dette-finnes-ikke`);
        await expect(page.getByText("404")).toBeVisible();
    });

    test("a path without a locale is redirected to the default locale", async ({ page }) => {
        await page.goto(`${basePath}/dette-finnes-ikke-uten-locale`);
        await expect(page).toHaveURL(new RegExp(`${basePath}/nb/dette-finnes-ikke-uten-locale/?$`));
        await expect(page.getByText("404")).toBeVisible();
    });

    test("liveness and readiness probes respond with 200", async ({ page }) => {
        const alive = await page.request.get(`${basePath}/api/internal/isAlive`);
        expect(alive.status()).toBe(200);

        const ready = await page.request.get(`${basePath}/api/internal/isReady`);
        expect(ready.status()).toBe(200);
    });
});
