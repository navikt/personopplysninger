import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

const wcagTags = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];

const finnBrudd = async (page: Page) => (await new AxeBuilder({ page }).include("main").withTags(wcagTags).analyze()).violations;

const historikkOgDetaljer = [
    { sti: "nb/", innhold: "Fornavn" },
    { sti: "nb/dsop", innhold: "STOREBRAND LIVSFORSIKRING AS" },
    { sti: "nb/dsop/2019-06-18T10%3A45%3A51.634", innhold: "STOREBRAND LIVSFORSIKRING AS" },
    { sti: "nb/institusjonsopphold", innhold: "VIK FENGSEL" },
    { sti: "nb/institusjonsopphold/2017-10-02T07%3A38%3A56.816", innhold: "VIK FENGSEL" },
    { sti: "nb/medlemskap-i-folketrygden", innhold: "Uten medlemskap" },
    { sti: "nb/endre-kontonummer", innhold: "Endre kontonummer for utbetaling" },
];

for (const { sti, innhold } of historikkOgDetaljer) {
    test(`${sti} har ingen WCAG AA-brudd i hovedinnholdet`, async ({ page }) => {
        const response = await page.goto(sti, { waitUntil: "domcontentloaded" });

        expect(response?.status()).toBe(200);
        await expect(page.getByRole("main").getByText(innhold).first()).toBeVisible();

        expect(await finnBrudd(page)).toEqual([]);
    });
}

test("nb/medlemskap-i-folketrygden har ingen WCAG AA-brudd med åpent panel", async ({ page }) => {
    await page.goto("nb/medlemskap-i-folketrygden", { waitUntil: "domcontentloaded" });
    await page.locator("details", { hasText: "DANMARK" }).locator("summary").click();
    await expect(page.getByRole("main").getByText("DANMARK").first()).toBeVisible();

    expect(await finnBrudd(page)).toEqual([]);
});
