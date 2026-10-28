import { expect, test } from "@playwright/test";

test("historikken har ingen øyer", async ({ page }) => {
    await page.goto("nb/institusjonsopphold");

    await expect(page.getByRole("main").getByRole("link", { name: "VIK FENGSEL" }).first()).toBeVisible();
    await expect(page.locator("astro-island")).toHaveCount(0);
});

test("viser 20 opphold, og resten med fet skrift etter Se flere", async ({ page }) => {
    await page.goto("nb/institusjonsopphold");
    const synlige = page.locator("[data-opphold]:not([hidden])");

    await expect(synlige).toHaveCount(20);
    await page.getByRole("button", { name: "Se flere" }).click();
    await expect(synlige).toHaveCount(25);
    await expect(page.getByRole("button", { name: "Se flere" })).toHaveCount(0);
    await expect(page.locator("[data-nyeste]")).toHaveCount(5);
});

test("viser alle opphold uten JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("nb/institusjonsopphold");

    for (const rad of await page.locator("[data-opphold]").all()) {
        await expect(rad).toBeVisible();
    }
    await expect(page.locator("[data-opphold]")).toHaveCount(25);
    await expect(page.getByRole("button", { name: "Se flere" })).toBeHidden();
    await context.close();
});

test("hjelpeteksten åpnes over knappen og lukkes med Escape", async ({ page }) => {
    await page.goto("nb/institusjonsopphold");
    const knapp = page.getByRole("button", { name: "Mer om Sluttdato" }).first();

    await knapp.evaluate((element) => element.scrollIntoView({ block: "center" }));
    await expect(knapp).toBeVisible();
    await knapp.dispatchEvent("click");
    const boble = page.getByText("Sluttdato for oppholdet er ikke mottatt. Nav har avsluttet oppholdet maskinelt.").first();
    await expect(boble).toBeVisible();
    const knappBoks = await knapp.boundingBox();
    const bobleBoks = await boble.boundingBox();
    expect(bobleBoks && knappBoks && bobleBoks.y + bobleBoks.height <= knappBoks.y).toBe(true);
    await page.keyboard.press("Escape");
    await expect(boble).toBeHidden();
});

test("lenker og tekster på valgt språk", async ({ page }) => {
    await page.goto("en/institusjonsopphold");

    await expect(page.getByRole("heading", { level: 2, name: "Institutional stays" })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: "request access" })).toHaveAttribute("href", "https://www.nav.no/kontaktoss");
    await expect(page.getByRole("main").getByRole("link", { name: "are required to notify Nav" })).toHaveAttribute(
        "href",
        "https://www.nav.no/samarbeidspartner/opphold-institusjon",
    );
    await expect(page.getByRole("main").getByRole("link", { name: "Back" })).toHaveAttribute("href", "/person/personopplysninger/en/#flere-opplysninger");
    await expect(page.getByRole("button", { name: "Show more" })).toBeVisible();
    await expect(page.getByText("SOURCE: INSTITUTIONAL STAY REGISTER")).toBeVisible();
});

test("sender sidens brødsmule til dekoratøren", async ({ page }) => {
    await page.goto("en/institusjonsopphold");

    await expect(page.getByRole("navigation", { name: /you are here|du er her/i }).getByText("Institutional stays")).toBeAttached();
});
