import { expect, test } from "@playwright/test";

test("medlemskap har dataene i HTML-en fra serveren, før JavaScript kjører", async ({ request }) => {
    const response = await request.get("nb/medlemskap-i-folketrygden");

    expect(response.status()).toBe(200);
    expect(await response.text()).toMatch(/<dd[^>]*>DANMARK<\/dd>/);
});

test("medlemskap henter ikke dataene på nytt i nettleseren", async ({ page }) => {
    const apiKall: string[] = [];
    page.on("request", (request) => {
        if (request.url().includes("/api/medl")) apiKall.push(request.url());
    });

    await page.goto("nb/medlemskap-i-folketrygden", { waitUntil: "networkidle" });

    await expect(page.getByText("DANMARK").first()).toBeAttached();
    expect(apiKall).toEqual([]);
});

const ikkeHentetIgjen = async (page: import("@playwright/test").Page, sti: string, api: string, synlig: string) => {
    const apiKall: string[] = [];
    page.on("request", (request) => {
        if (request.url().includes(api)) apiKall.push(request.url());
    });

    await page.goto(sti, { waitUntil: "networkidle" });

    await expect(page.getByRole("main").getByText(synlig).first()).toBeVisible();
    expect(apiKall).toEqual([]);
};

test.describe("DSOP", () => {
    const utleverteData = "eyJ1dHRyZWtrc3BlcmlvZGUi";

    test("historikken har dataene i HTML-en fra serveren, uten utleverte data", async ({ request }) => {
        const response = await request.get("nb/dsop");

        expect(response.status()).toBe(200);
        const html = await response.text();
        expect(html).toMatch(/<a[^>]*href="[^"]*\/nb\/dsop\/2019-06-18T10%3A45%3A51\.634"[^>]*>STOREBRAND LIVSFORSIKRING AS<\/a>/);
        expect(html).not.toContain(utleverteData);
    });

    test("historikken henter ikke dataene på nytt i nettleseren", async ({ page }) => {
        await ikkeHentetIgjen(page, "nb/dsop", "/api/sporingslogg", "STOREBRAND LIVSFORSIKRING AS");
    });

    test("detaljsiden har innslaget i HTML-en fra serveren", async ({ request }) => {
        const response = await request.get("nb/dsop/2019-06-18T10%3A45%3A52.101");

        expect(response.status()).toBe(200);
        expect(await response.text()).toMatch(/<h2[^>]*>GJENSIDIGE FORSIKRING AS<\/h2>/);
    });

    test("detaljsiden henter ikke dataene på nytt i nettleseren", async ({ page }) => {
        await ikkeHentetIgjen(page, "nb/dsop/2019-06-18T10%3A45%3A52.101", "/api/sporingslogg", "GJENSIDIGE FORSIKRING AS");
    });

    test("ukjent innslag gir 404 med dagens tekst og tilbakelenke", async ({ page }) => {
        const response = await page.goto("nb/dsop/2000-01-01T00%3A00%3A00");

        expect(response?.status()).toBe(404);
        expect(response?.headers()["cache-control"]).toBe("private, no-store");
        const main = page.getByRole("main");
        await expect(main.getByText("Ingen personopplysninger har blitt utlevert.", { exact: false })).toBeVisible();
        await expect(main.getByRole("link", { name: "Tilbake" })).toHaveAttribute("href", /\/nb\/dsop$/);
    });
});

test.describe("Institusjonsopphold", () => {
    test("historikken har dataene i HTML-en fra serveren", async ({ request }) => {
        const response = await request.get("nb/institusjonsopphold");

        expect(response.status()).toBe(200);
        expect(await response.text()).toMatch(
            /href="[^"]*\/nb\/institusjonsopphold\/2017-10-02T07%3A38%3A56\.816"[^>]*><p[^>]*>VIK FENGSEL<\/p><\/a>/,
        );
    });

    test("historikken henter ikke dataene på nytt i nettleseren", async ({ page }) => {
        await ikkeHentetIgjen(page, "nb/institusjonsopphold", "/api/institusjonsopphold", "VIK FENGSEL");
    });

    test("detaljsiden har oppholdet i HTML-en fra serveren", async ({ request }) => {
        const response = await request.get("nb/institusjonsopphold/2017-10-02T07%3A38%3A56.816");

        expect(response.status()).toBe(200);
        expect(await response.text()).toMatch(/<h2[^>]*>VIK FENGSEL<\/h2>/);
    });

    test("detaljsiden henter ikke dataene på nytt i nettleseren", async ({ page }) => {
        await ikkeHentetIgjen(page, "nb/institusjonsopphold/2017-10-02T07%3A38%3A56.816", "/api/institusjonsopphold", "VIK FENGSEL");
    });

    test("ukjent opphold gir 404 med dagens tekst og tilbakelenke", async ({ page }) => {
        const response = await page.goto("nb/institusjonsopphold/2000-01-01T00%3A00%3A00");

        expect(response?.status()).toBe(404);
        expect(response?.headers()["cache-control"]).toBe("private, no-store");
        const main = page.getByRole("main");
        await expect(main.getByText("Det er ingen institusjonsopphold å vise.")).toBeVisible();
        await expect(main.getByRole("link", { name: "Tilbake" })).toHaveAttribute("href", /\/nb\/institusjonsopphold$/);
    });
});
