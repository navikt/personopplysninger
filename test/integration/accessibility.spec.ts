import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Personopplysninger forside", () => {
    test("har norsk dokumentsemantikk og ingen WCAG AA-brudd i hovedinnholdet", async ({ page }) => {
        const response = await page.goto("/nb/", { waitUntil: "domcontentloaded" });

        expect(response?.ok(), "Expected the Norwegian home route to return a successful response").toBeTruthy();
        await expect(page).toHaveTitle("Personopplysninger");
        await expect(page.locator("html")).toHaveAttribute("lang", "nb");

        const main = page.getByRole("main");
        await expect(main).toHaveCount(1);
        await expect(main.getByRole("heading", { level: 1, name: "Personopplysninger" })).toBeVisible();

        // Wait for mocked person data so axe evaluates the rendered route, not only its loading state.
        await expect(main.getByText("Fornavn", { exact: true })).toBeVisible();

        const results = await new AxeBuilder({ page })
            // The NAV decorator is server-rendered and maintained independently of this application.
            .include("main")
            .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
            .analyze();

        expect(results.violations).toEqual([]);
    });
});
