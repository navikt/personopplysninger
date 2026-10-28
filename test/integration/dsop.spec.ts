import { expect, test } from "@playwright/test";

test("historikken har ingen øyer", async ({ page }) => {
    await page.goto("nb/dsop");

    await expect(page.getByRole("main").getByRole("link", { name: "STOREBRAND LIVSFORSIKRING AS" }).first()).toBeVisible();
    await expect(page.locator("astro-island")).toHaveCount(0);
});

test("første år er åpent, og et lukket år kan åpnes", async ({ page }) => {
    await page.goto("nb/dsop");

    const aar = page.getByRole("main").locator("details");
    await expect(aar.first()).toHaveAttribute("open", "");
    const lukket = aar.last();
    await expect(lukket).not.toHaveAttribute("open", "");
    await lukket.locator("summary").click();
    await expect(lukket).toHaveAttribute("open", "");
});

test("lenker til personvernerklæringen på riktig språk", async ({ page }) => {
    await page.goto("en/dsop");
    await expect(page.getByRole("main").getByRole("link", { name: "privacy statement for Nav" })).toHaveAttribute(
        "href",
        "https://www.nav.no/personvernerklaering/en#who",
    );

    await page.goto("nn/dsop");
    await expect(page.getByRole("main").getByRole("link", { name: "personvernerklæringa til Nav" })).toHaveAttribute(
        "href",
        "https://www.nav.no/personvernerklaering#hvem",
    );
});

test("sender sidens brødsmule til dekoratøren", async ({ page }) => {
    await page.goto("en/dsop");

    await expect(page.getByRole("navigation", { name: /you are here|du er her/i }).getByText("Disclosure of personal data")).toBeAttached();
});

test("har tittel og tilbakelenke på valgt språk", async ({ page }) => {
    await page.goto("en/dsop");

    await expect(page.getByRole("heading", { level: 2, name: "Disclosure of personal data" })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: "Back" })).toHaveAttribute(
        "href",
        "/person/personopplysninger/en/#flere-opplysninger",
    );
});

test("detaljsiden har bare nedlastingsknappen som øy", async ({ page }) => {
    await page.goto("nb/dsop/2019-06-18T10%3A45%3A52.101");

    await expect(page.locator("astro-island")).toHaveCount(1);
    await expect(page.locator("astro-island").getByRole("button", { name: "Last ned leverte data" })).toBeVisible();
    await expect(page.locator("astro-island").getByRole("heading")).toHaveCount(0);
});

test("laster ned de leverte dataene", async ({ page }) => {
    await page.goto("nb/dsop/2019-06-18T10%3A45%3A52.101");

    const nedlasting = page.waitForEvent("download");
    await page.getByRole("button", { name: "Last ned leverte data" }).click();

    expect((await nedlasting).suggestedFilename()).toBe("utleverte-data.json");
});

test("detaljsiden viser organisasjonsnummer og felter på engelsk", async ({ page }) => {
    await page.goto("en/dsop/2019-06-18T10%3A45%3A52.101");

    await expect(page.getByRole("heading", { level: 2, name: "GJENSIDIGE FORSIKRING AS" })).toBeVisible();
    await expect(page.getByText(/^Organisation number /)).toBeVisible();
    await expect(page.getByText("Retrieval time")).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: "Back" })).toHaveAttribute("href", "/person/personopplysninger/en/dsop");
});
