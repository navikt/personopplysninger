import { expect, type Page, test } from "@playwright/test";

const hydrert = async (page: Page) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    for (const oy of await page.locator("astro-island").all()) {
        await oy.scrollIntoViewIfNeeded();
        await expect(oy).not.toHaveAttribute("ssr");
    }
};

test("hilser med navnet fra /personalia uten å hente det i nettleseren", async ({ page }) => {
    const apiKall: string[] = [];
    page.on("request", (request) => {
        if (request.url().includes("/api/personalia") || request.url().includes("/api/auth")) apiKall.push(request.url());
    });

    await page.goto("nb/", { waitUntil: "networkidle" });
    await hydrert(page);

    await expect(page.getByRole("heading", { level: 2, name: "Hei Vinayagum-mask Amizic!" })).toBeVisible();
    expect(apiKall).toEqual([]);
});

test("infoteksten åpnes som dialog og lukkes med Escape og med knappen", async ({ page }) => {
    await page.goto("nb/");
    await hydrert(page);
    const knapp = page.locator("#personalia").getByRole("button", { name: "Les mer om denne seksjonen." });

    await knapp.click();
    const dialog = page.locator("#personalia dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { level: 2, name: "Personalia" })).toBeVisible();
    await expect(knapp).toHaveAttribute("aria-pressed", "true");
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(knapp).toHaveAttribute("aria-pressed", "false");

    await knapp.click();
    await dialog.getByRole("button", { name: "Lukk" }).click();
    await expect(dialog).toBeHidden();
});

test("mer informasjon er lukkede details som kan åpnes", async ({ page }) => {
    await page.goto("nb/");
    const panel = page.locator("details", { hasText: "Personopplysninger om meg er feil – hva gjør jeg?" });

    await expect(panel).not.toHaveAttribute("open");
    await panel.locator("summary").click();
    await expect(panel).toHaveAttribute("open", "");
    await expect(panel.locator("summary")).toContainText("Personopplysninger om meg er feil – hva gjør jeg?");
    await expect(panel.locator("summary span", { hasText: "Personopplysninger om meg er feil – hva gjør jeg?" })).toBeVisible();
    await expect(panel.getByRole("link", { name: "Send beskjed til Nav" })).toHaveAttribute("href", "/person/kontakt-oss/nb/skriv-til-oss");
});

test("ankeret #utbetaling scroller boksen inn i vinduet", async ({ page }) => {
    await page.goto("nb/#utbetaling");

    await expect(page.locator("#utbetaling")).toBeInViewport();
    await expect(page.getByRole("main").getByRole("link", { name: "Endre kontonummer for utbetaling" })).toHaveAttribute(
        "href",
        "/person/personopplysninger/nb/endre-kontonummer?backTo=%2F",
    );
});

test("tekster og lenker på engelsk", async ({ page }) => {
    await page.goto("en/");

    await expect(page.getByRole("heading", { level: 1, name: "Personal data" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Hi Vinayagum-mask Amizic!" })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: /Read about privacy protection/ })).toHaveAttribute("href", "/personvern");
    await expect(page.getByRole("heading", { level: 2, name: "More information about you" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "More information", exact: true })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: "Change in National Population Register" })).toHaveAttribute(
        "href",
        "https://www.skatteetaten.no/en/person/national-registry/",
    );
});

test("tekster på nynorsk", async ({ page }) => {
    await page.goto("nn/");

    await expect(page.getByRole("heading", { level: 1, name: "Personopplysningar" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Fleire opplysningar om deg" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Meir informasjon" })).toBeVisible();
});

test("kontaktinformasjon fra registeret hentes på serveren", async ({ page }) => {
    const apiKall: string[] = [];
    page.on("request", (request) => {
        if (request.url().includes("/api/kontaktinformasjon")) apiKall.push(request.url());
    });

    await page.goto("nb/", { waitUntil: "networkidle" });
    await hydrert(page);

    const boks = page.locator("#kontaktinformasjon");
    await expect(boks.getByRole("heading", { level: 2, name: "Kontaktinformasjon" })).toBeVisible();
    await expect(boks).toContainText("12131415");
    await expect(boks).toContainText("test@test.com");
    await expect(boks.getByRole("link", { name: /Vil du endre informasjonen/ })).toHaveAttribute("href", "https://minprofil.kontaktregisteret.no");
    expect(apiKall).toEqual([]);
});
