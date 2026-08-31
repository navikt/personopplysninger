import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { PersonopplysningerPage } from "./pages/personopplysninger.page";

test.describe("Accessibility in the Astro compatibility shell", () => {
    test("the rendered React front page has no WCAG violations", async ({ page }) => {
        const personopplysninger = new PersonopplysningerPage(page);
        await personopplysninger.goto();
        await expect(page.getByRole("heading", { name: "Personalia" })).toBeVisible();

        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();

        expect(results.violations).toEqual([]);
    });
});
