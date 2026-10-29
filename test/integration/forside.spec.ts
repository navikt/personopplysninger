import { expect, type Page, test } from "@playwright/test";
import personInfo from "../../src/mocks/fixtures/person-info.json" with { type: "json" };

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

const utenTelefon = {
    ...personInfo,
    personalia: { ...personInfo.personalia, tlfnr: { telefonHoved: null, telefonAlternativ: null, landskodeHoved: null, landskodeAlternativ: null } },
};

test("telefonlisten er en øy som viser nummeret fra serveren", async ({ page }) => {
    await page.goto("nb/");
    const oy = page.locator("astro-island", { hasText: "Telefonnummer registrert hos Nav" });

    await expect(oy).toHaveCount(1);
    await expect(oy.getByText("408 53 158")).toBeVisible();
    await expect(page.locator("astro-island")).toHaveCount(3);
});

test("endring som blir avvist viser feilmeldingen", async ({ page }) => {
    await page.goto("nb/");
    await hydrert(page);
    await page.getByRole("button", { name: "Endre telefonnummer" }).click();
    await page.getByRole("textbox", { name: "Telefonnummer" }).fill("91234567");
    await page.getByRole("button", { name: "Lagre" }).click();

    await expect(page.getByRole("status").filter({ hasText: "Vi jobber" })).toContainText(
        "Vi jobber med å registrere telefonnummeret du har lagt til. Det vil snart bli synlig!",
    );
});

test("nytt nummer som venter viser infomeldingen", async ({ page }) => {
    await page.route("**/api/endreTelefonnummer", (route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ statusType: "PENDING" }) }),
    );
    await page.goto("nb/");
    await hydrert(page);
    await page.getByRole("button", { name: "Legg til telefonnummer i Nav sitt register" }).click();
    await page.getByRole("textbox", { name: "Telefonnummer" }).fill("91234567");
    await page.getByRole("button", { name: "Lagre" }).click();

    await expect(page.getByText("Vi har sendt inn endringen din")).toBeVisible();
});

test("sletting henter personalia på nytt og fjerner nummer og overskrift", async ({ page }) => {
    await page.route("**/api/personalia", (route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(utenTelefon) }),
    );
    await page.goto("nb/");
    await hydrert(page);
    await expect(page.getByRole("heading", { level: 3, name: "Telefonnummer registrert hos Nav" })).toBeVisible();

    await page.getByRole("button", { name: "Slett telefonnummer" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Slett" }).click();

    await expect(page.getByRole("heading", { level: 3, name: "Telefonnummer registrert hos Nav" })).toHaveCount(0);
    await expect(page.getByText("408 53 158")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Legg til telefonnummer i Nav sitt register" })).toBeVisible();
});

const utenPdlKontaktadresse = { ...personInfo, adresser: { ...personInfo.adresser, kontaktadresser: [] } };

test("adressepanelet viser og skjuler detaljer", async ({ page }) => {
    await page.goto("nb/");
    const panel = page.locator("#adresser details").first();

    await expect(panel.getByText("Vis detaljer")).toBeVisible();
    await expect(panel.getByText("Skjul detaljer")).toBeHidden();
    await panel.locator("summary").click();
    await expect(panel).toHaveAttribute("open", "");
    await expect(panel.getByText("Skjul detaljer")).toBeVisible();
    await expect(panel.getByText("Vis detaljer")).toBeHidden();
    await expect(panel.getByText("H0301")).toBeVisible();
});

test("sletting av kontaktadresse henter personalia på nytt og fjerner øvrige adresser", async ({ page }) => {
    await page.route("**/api/personalia", (route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(utenPdlKontaktadresse) }),
    );
    await page.goto("nb/");
    await hydrert(page);
    await expect(page.getByRole("heading", { level: 3, name: "Øvrige registrerte adresser" })).toBeVisible();

    await page.getByRole("button", { name: "Slett kontaktadresse" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Slett" }).click();

    await expect(page.getByRole("heading", { level: 3, name: "Øvrige registrerte adresser" })).toHaveCount(0);
    await expect(page.locator("#adresser").getByText("Postboks 10 Sørstrand")).toHaveCount(0);
});

test("Nav-kontoret bytter publikumsmottak i fanene", async ({ page }) => {
    await page.goto("nb/#ditt-nav-kontor");
    await hydrert(page);

    await page.getByRole("tab", { name: "Aremark" }).click();
    await expect(page.getByRole("tab", { name: "Aremark" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toContainText("Aremarkveien");
});
