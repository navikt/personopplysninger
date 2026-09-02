import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const basePath = "/person/personopplysninger";
const pages = [`${basePath}/nb/`, `${basePath}/nn/`, `${basePath}/en/`, `${basePath}/nb/institusjonsopphold`];

test.describe("Accessibility (WCAG 2.1 AA)", () => {
    for (const path of pages) {
        test(`${path} should have no a11y violations`, async ({ page }) => {
            await page.goto(path);
            // Wait for the authenticated app shell to finish loading before scanning.
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

            const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();

            expect(results.violations).toEqual([]);
        });
    }
});
