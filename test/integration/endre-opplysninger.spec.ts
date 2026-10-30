import { expect, type Page, test } from "@playwright/test";
import personInfo from "../../src/mocks/fixtures/person-info.json" with { type: "json" };

const hydrert = async (page: Page) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    for (const oy of await page.locator("astro-island").all()) {
        await oy.scrollIntoViewIfNeeded();
        await expect(oy).not.toHaveAttribute("ssr");
    }
};

const basePath = "/person/personopplysninger";
const kodetUrl = "https%3A%2F%2Fwww.nav.no%2F";
const langSti = `nb/endre-opplysninger/sendt-fra/skjema/alderspensjonssoknad/${kodetUrl}`;
const kortSti = `nb/sendt-fra/skjema/alderspensjonssoknad/${kodetUrl}`;
const banner = "Du har blitt sendt fra alderspensjon. Her kan du legge til eller endre kontaktinformasjon og kontonummer.";

test("lang sti viser banneret med utheving, tilbakelenke og boksene uten personalia-kall i nettleseren", async ({ page }) => {
    const apiKall: string[] = [];
    page.on("request", (request) => {
        if (request.url().includes("/api/personalia")) apiKall.push(request.url());
    });

    const response = await page.goto(langSti, { waitUntil: "networkidle" });
    await hydrert(page);
    const main = page.getByRole("main");

    expect(response?.status()).toBe(200);
    await expect(main.getByText(banner)).toBeVisible();
    await expect(main.locator("b", { hasText: "kontaktinformasjon og kontonummer" })).toBeVisible();
    await expect(main.getByRole("link", { name: "Gå tilbake til alderspensjon" })).toHaveAttribute("href", "https://www.nav.no/");
    await expect(main.locator("#kontaktinformasjon")).toBeVisible();
    await expect(main.locator("#adresser")).toBeVisible();
    await expect(main.locator("#utbetaling")).toBeVisible();
    await expect(page.locator("astro-island")).toHaveCount(2);
    expect(apiKall).toEqual([]);
});

test("kort sti gir 200 med samme innhold og beholder adressen i nettleseren", async ({ page }) => {
    const response = await page.goto(kortSti);
    const main = page.getByRole("main");

    expect(response?.status()).toBe(200);
    expect(new URL(page.url()).pathname).toBe(`${basePath}/${kortSti}`);
    await expect(main.getByText(banner)).toBeVisible();
    await expect(main.getByRole("link", { name: "Gå tilbake til alderspensjon" })).toHaveAttribute("href", "https://www.nav.no/");
    await expect(main.locator("#utbetaling")).toBeVisible();
});

test("kort sti sender Endre kontonummer med den lange stien som backTo og tilbake-lenken lander på en fungerende side", async ({ page }) => {
    await page.goto(kortSti);
    const main = page.getByRole("main");
    const lenke = main.getByRole("link", { name: "Endre kontonummer for utbetaling" });
    const href = (await lenke.getAttribute("href")) ?? "";

    expect(href).toBe(
        `${basePath}/nb/endre-kontonummer?backTo=${encodeURIComponent(`/endre-opplysninger/sendt-fra/skjema/alderspensjonssoknad/${kodetUrl}/`)}`,
    );

    await lenke.click();
    await expect(main.getByRole("heading", { level: 2, name: "Endre kontonummer for utbetaling" })).toBeVisible();
    const tilbake = main.getByRole("link", { name: "Tilbake" });
    await expect(tilbake).toHaveAttribute("href", `${basePath}/nb/endre-opplysninger/sendt-fra/skjema/alderspensjonssoknad/${kodetUrl}/#utbetaling`);

    const respons = page.waitForResponse((r) => r.request().isNavigationRequest());
    await tilbake.click();
    expect((await respons).status()).toBe(200);
    await expect(main.getByText(banner)).toBeVisible();
});

test("lang sti sender Endre kontonummer med kodet backTo og tilbake-lenken lander på samme side", async ({ page }) => {
    await page.goto(langSti);
    const main = page.getByRole("main");
    const lenke = main.getByRole("link", { name: "Endre kontonummer for utbetaling" });

    await expect(lenke).toHaveAttribute(
        "href",
        `${basePath}/nb/endre-kontonummer?backTo=${encodeURIComponent(`/endre-opplysninger/sendt-fra/skjema/alderspensjonssoknad/${kodetUrl}`)}`,
    );

    await lenke.click();
    const tilbake = main.getByRole("link", { name: "Tilbake" });
    await expect(tilbake).toHaveAttribute("href", `${basePath}/nb/endre-opplysninger/sendt-fra/skjema/alderspensjonssoknad/${kodetUrl}#utbetaling`);
    await tilbake.click();

    await expect(page).toHaveURL((url) => url.pathname === `${basePath}/${langSti}`);
    await expect(main.getByText(banner)).toBeVisible();
});

test("ukjent tjeneste og ikke-nav-adresse havner på forsiden", async ({ page }) => {
    for (const sti of [
        `nb/endre-opplysninger/sendt-fra/skjema/finnesikke/${kodetUrl}`,
        `nb/sendt-fra/skjema/finnesikke/${kodetUrl}`,
        "nb/endre-opplysninger/sendt-fra/skjema/alderspensjonssoknad/https%3A%2F%2Fevil.example%2F",
        "nb/sendt-fra/skjema/alderspensjonssoknad/https%3A%2F%2Fevil.example%2F",
    ]) {
        await page.goto(sti);

        expect(new URL(page.url()).pathname, sti).toBe(`${basePath}/nb/`);
        await expect(page.getByRole("heading", { level: 1, name: "Personopplysninger" }), sti).toBeVisible();
    }
});

test("telefonlisten har ingen overskrift, og sletting henter personalia på nytt og fjerner nummeret", async ({ page }) => {
    const utenTelefon = {
        ...personInfo,
        personalia: {
            ...personInfo.personalia,
            tlfnr: { telefonHoved: null, telefonAlternativ: null, landskodeHoved: null, landskodeAlternativ: null },
        },
    };
    await page.route("**/api/personalia", (route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(utenTelefon) }),
    );
    await page.goto(langSti);
    await hydrert(page);
    const boks = page.locator("#kontaktinformasjon");

    await expect(boks.getByText("408 53 158")).toBeVisible();
    await expect(boks.getByRole("heading", { level: 3 })).toHaveCount(0);

    await page.getByRole("main").getByRole("button", { name: "Slett telefonnummer" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Slett" }).click();

    await expect(boks.getByText("408 53 158")).toHaveCount(0, { timeout: 10_000 });
    await expect(boks.getByRole("button", { name: "Legg til telefonnummer i Nav sitt register" })).toBeVisible({
        timeout: 10_000,
    });
    await expect(boks.getByRole("heading", { level: 3 })).toHaveCount(0);
});

const avvist = [
    {
        sti: langSti,
        leggTil: "Legg til telefonnummer i Nav sitt register",
        felt: "Telefonnummer",
        lagre: "Lagre",
        tekst: "Vi jobber med å registrere telefonnummeret du har lagt til. Det vil snart bli synlig!",
    },
    {
        sti: langSti.replace("nb/", "nn/"),
        leggTil: "Legg til telefonnummer i Nav sitt register",
        felt: "Telefonnummer",
        lagre: "Lagre",
        tekst: "Vi jobbar med å registrere telefonnummeret du har lagt til. Det vil snart bli synleg!",
    },
    {
        sti: langSti.replace("nb/", "en/"),
        leggTil: "Add a phone number in the Nav registry",
        felt: "Telephone number",
        lagre: "Save",
        tekst: "We are working on registering the phone number you have added. It will soon be visible!",
    },
];

for (const { sti, leggTil, felt, lagre, tekst } of avvist) {
    test(`${sti.slice(0, 2)}: nytt telefonnummer som blir avvist viser pågående-meldingen`, async ({ page }) => {
        await page.goto(sti);
        await hydrert(page);
        const boks = page.locator("#kontaktinformasjon");

        await boks.getByRole("button", { name: leggTil }).click();
        await boks.getByRole("textbox", { name: felt }).fill("91234567");
        await boks.getByRole("button", { name: lagre }).click();

        await expect(page.getByRole("main").getByRole("status").filter({ hasText: tekst })).toContainText(tekst, {
            timeout: 10_000,
        });
    });
}

test("engelsk side har oversatte knapper og viser valideringsmelding ved tom innsending", async ({ page }) => {
    await page.goto(langSti.replace("nb/", "en/"));
    await hydrert(page);
    const boks = page.locator("#kontaktinformasjon");

    await expect(page.getByRole("main").getByText(banner)).toBeVisible();
    await boks.getByRole("button", { name: "Add a phone number in the Nav registry" }).click();
    await boks.getByRole("button", { name: "Save" }).click();

    await expect(boks.getByText("Phone number is required")).toBeVisible();
});
