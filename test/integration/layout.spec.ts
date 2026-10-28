import { expect, test } from "@playwright/test";

test("sender språkvalg for samme side til dekoratøren", async ({ request }) => {
    const html = await (await request.get("en/dsop")).text();

    expect(html).toContain("/person/personopplysninger/nb/dsop");
    expect(html).toContain("/person/personopplysninger/nn/dsop");
});

test("sender grunnbrødsmulene på riktig språk til dekoratøren", async ({ request }) => {
    const html = await (await request.get("en/dsop")).text();

    expect(html).toContain("My page");
});

test("starter Faro med konfigurasjonen fra serveren", async ({ page }) => {
    await page.goto("nb/dsop");

    await expect(page.locator("[data-telemetry-url]")).toHaveCount(1);
});
