import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

const wcagTags = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];

const finnBrudd = async (page: Page) => (await new AxeBuilder({ page }).include("main").withTags(wcagTags).analyze()).violations;

test.describe("Personopplysninger forside", () => {
    test("har norsk dokumentsemantikk og ingen WCAG AA-brudd i hovedinnholdet", async ({ page }) => {
        const response = await page.goto("nb/", { waitUntil: "domcontentloaded" });

        expect(response?.ok(), "Expected the Norwegian home route to return a successful response").toBeTruthy();
        await expect(page).toHaveTitle("Personopplysninger - www.nav.no");
        await expect(page.locator("html")).toHaveAttribute("lang", "nb");

        const main = page.getByRole("main");
        await expect(main).toHaveCount(1);
        await expect(main.getByRole("heading", { level: 1, name: "Personopplysninger" })).toBeVisible();

        await expect(main.getByText("Fornavn", { exact: true })).toBeVisible();

        expect(await finnBrudd(page)).toEqual([]);
    });
});

const historikkOgDetaljer = [
    { sti: "nb/dsop", innhold: "STOREBRAND LIVSFORSIKRING AS" },
    { sti: "nb/dsop/2019-06-18T10%3A45%3A51.634", innhold: "STOREBRAND LIVSFORSIKRING AS" },
    { sti: "nb/institusjonsopphold", innhold: "VIK FENGSEL" },
    { sti: "nb/institusjonsopphold/2017-10-02T07%3A38%3A56.816", innhold: "VIK FENGSEL" },
];

for (const { sti, innhold } of historikkOgDetaljer) {
    test(`${sti} har ingen WCAG AA-brudd i hovedinnholdet`, async ({ page }) => {
        const response = await page.goto(sti, { waitUntil: "domcontentloaded" });

        expect(response?.status()).toBe(200);
        await expect(page.getByRole("main").getByText(innhold).first()).toBeVisible();

        expect(await finnBrudd(page)).toEqual([]);
    });
}
