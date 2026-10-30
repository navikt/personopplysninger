import { expect, type Page, test } from "@playwright/test";

const hydrert = async (page: Page) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    for (const oy of await page.locator("astro-island").all()) {
        await oy.scrollIntoViewIfNeeded();
        await expect(oy).not.toHaveAttribute("ssr");
    }
};

test("nb viser tittel, tilbakelenke og detaljene fra arbeidsforholdet etter hydrering", async ({ page }) => {
    await page.goto("nb/arbeidsforhold/1");
    await hydrert(page);
    const main = page.getByRole("main");

    await expect(page.locator("astro-island")).toHaveCount(1);
    await expect(main.getByRole("heading", { level: 2, name: "Arbeidsforhold" })).toBeVisible();
    await expect(main.getByRole("link", { name: "Tilbake" })).toHaveAttribute("href", "/person/personopplysninger/nb/#arbeidsforhold");
    await expect(main.getByText("Generisk Firmanavn AS Oslo").first()).toBeVisible();
});

test("en har oversatt tittel", async ({ page }) => {
    await page.goto("en/arbeidsforhold/1");
    const main = page.getByRole("main");

    await expect(main.getByRole("heading", { level: 2, name: "Employment relationship" })).toBeVisible();
    await expect(main.getByRole("link", { name: "Back" })).toHaveAttribute("href", "/person/personopplysninger/en/#arbeidsforhold");
});
