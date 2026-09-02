import { expect, test } from "@playwright/test";

const url = "/person/personopplysninger/nb/";

test.describe("Responsive", () => {
    test("renders the page title on mobile viewport", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto(url);
        await expect(page.getByRole("heading", { level: 1, name: "Personopplysninger" })).toBeVisible();
    });

    test("renders the page title on desktop viewport", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(url);
        await expect(page.getByRole("heading", { level: 1, name: "Personopplysninger" })).toBeVisible();
    });
});
