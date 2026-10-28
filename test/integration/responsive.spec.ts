import { expect, test } from "@playwright/test";

test("forsiden holder seg innenfor mobilbredde", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("nb/");

    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
