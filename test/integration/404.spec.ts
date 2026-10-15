import { expect, test } from "@playwright/test";

test("viser 404-siden med dekoratøren for ukjente stier", async ({ page }) => {
    const response = await page.goto("nb/finnesikke");

    expect(response?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "nb");
    await expect(page.locator("#decorator-header")).toHaveCount(1);
    await expect(page.locator("#decorator-footer")).toHaveCount(1);
    await expect(page.getByRole("main").getByRole("heading", { level: 1, name: "404" })).toBeVisible();
});

test("bruker språket fra stien på 404-siden", async ({ page }) => {
    const response = await page.goto("en/finnes/ikke");

    expect(response?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("#decorator-header")).toHaveCount(1);
    await expect(page.getByRole("main").getByRole("heading", { level: 1, name: "404" })).toBeVisible();
});
