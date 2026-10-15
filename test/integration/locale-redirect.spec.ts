import { expect, test } from "@playwright/test";

const basePath = "/person/personopplysninger";

test("sender stier uten språk videre til norsk bokmål", async ({ request }) => {
    const response = await request.get("dsop", { maxRedirects: 0 });

    expect(response.status()).toBe(302);
    expect(response.headers().location).toBe(`${basePath}/nb/dsop`);
});

test("beholder query-parametere ved videresending", async ({ request }) => {
    const response = await request.get("endre-kontonummer?kilde=test&steg=2", { maxRedirects: 0 });

    expect(response.status()).toBe(302);
    expect(response.headers().location).toBe(`${basePath}/nb/endre-kontonummer?kilde=test&steg=2`);
});

test("videresender sendt-fra-lenker uten å endre den kodede tilbake-lenken", async ({ page, request }) => {
    const sti = "endre-opplysninger/sendt-fra/skjema/alderspensjon/https%3A%2F%2Fwww.nav.no%2F";

    const response = await request.get(sti, { maxRedirects: 0 });
    expect(response.headers().location).toBe(`${basePath}/nb/${sti}`);

    const sideRespons = await page.goto(sti);
    expect(sideRespons?.status()).toBe(200);
    await expect(page).toHaveURL(new RegExp(`${basePath}/nb/${sti.replace(/[.%]/g, "\\$&")}$`));
    await expect(page.getByText("Du har blitt sendt fra alderspensjon.", { exact: false })).toBeVisible();
});

test("videresender gamle sendt-fra-lenker uten språk", async ({ request }) => {
    const sti = "sendt-fra/skjema/alderspensjonssoknad/https%3A%2F%2Fwww.nav.no%2F";

    const response = await request.get(sti, { maxRedirects: 0 });

    expect(response.headers().location).toBe(`${basePath}/nb/${sti}`);
});

test("videresender aldri til et annet domene", async ({ request }) => {
    for (const sti of ["/evil.example/", "%2F%2Fevil.example/", "%5Cevil.example/"]) {
        const response = await request.get(`./${sti}`, { maxRedirects: 0 });
        const location = response.headers().location ?? "";

        expect(location.startsWith(`${basePath}/nb/`), `${sti} -> ${location}`).toBe(true);
        expect(new URL(location, "http://localhost:3006").origin).toBe("http://localhost:3006");
    }
});

test("ukjente stier uten språk ender i 404 uten omdirigeringsløkke", async ({ request }) => {
    const first = await request.get("finnesikke", { maxRedirects: 0 });
    expect(first.headers().location).toBe(`${basePath}/nb/finnesikke`);

    const response = await request.get("finnesikke");
    expect(response.status()).toBe(404);
    expect(response.url()).toMatch(/\/nb\/finnesikke$/);
});

test("ukjente stier med språk gir fortsatt 404", async ({ request }) => {
    for (const sti of ["nb/finnesikke", "en/dsop/a/b", "nn/finnes/ikke/heller"]) {
        const response = await request.get(sti, { maxRedirects: 0 });

        expect(response.status(), sti).toBe(404);
        expect(response.headers().location, sti).toBeUndefined();
    }
});
