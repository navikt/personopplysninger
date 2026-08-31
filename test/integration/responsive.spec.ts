import { expect, test } from "@playwright/test";
import { PersonopplysningerPage } from "./pages/personopplysninger.page";

test.describe("Responsive Astro compatibility shell", () => {
    for (const viewport of [
        { name: "mobile", width: 375, height: 812 },
        { name: "desktop", width: 1280, height: 800 },
    ]) {
        test(`loads the existing React app in the ${viewport.name} viewport`, async ({ page }) => {
            await page.setViewportSize({ width: viewport.width, height: viewport.height });

            const personopplysninger = new PersonopplysningerPage(page);
            await personopplysninger.goto();

            await expect(personopplysninger.heading).toBeVisible();
        });
    }
});
