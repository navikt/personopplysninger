import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

const hydrert = async (page: Page) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    for (const oy of await page.locator("astro-island").all()) {
        await oy.scrollIntoViewIfNeeded();
        await expect(oy).not.toHaveAttribute("ssr");
    }
};

const wcagTags = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];

test("viser kontonummeret fra serveren i én øy med tilbakelenke til utbetaling", async ({ page }) => {
    await page.goto("nb/endre-kontonummer?backTo=%2F");
    const main = page.getByRole("main");

    await expect(page.locator("astro-island")).toHaveCount(1);
    await expect(main.getByRole("heading", { level: 2, name: "Endre kontonummer for utbetaling" })).toBeVisible();
    await expect(main.getByText("1234 56 78911")).toBeAttached();
    await expect(main.getByRole("link", { name: "Tilbake" })).toHaveAttribute("href", "/person/personopplysninger/nb/#utbetaling");
});

test("skjemaet åpnes, bytter til utenlandsk med landliste og lukkes med Avbryt", async ({ page }) => {
    await page.goto("nb/endre-kontonummer");
    await hydrert(page);
    const main = page.getByRole("main");

    await main.getByRole("button", { name: "Endre" }).click();
    await expect(main.getByRole("textbox", { name: "Kontonummer" })).toBeVisible();

    await main.getByRole("radio", { name: "Utenlandsk kontonummer" }).check();
    const land = main.getByRole("combobox", { name: "Bankens land" });
    await expect(land).toBeVisible();
    await land.click();
    await expect(main.getByRole("option").first()).toBeAttached();
    await page.keyboard.press("Escape");

    await main.getByRole("button", { name: "Avbryt" }).click();
    await expect(main.getByText("1234 56 78911")).toBeVisible();
    await expect(main.getByRole("button", { name: "Endre" })).toBeVisible();
});

test("åpent skjema har ingen WCAG AA-brudd i hovedinnholdet", async ({ page }) => {
    await page.goto("nb/endre-kontonummer");
    await hydrert(page);
    await page.getByRole("main").getByRole("button", { name: "Endre" }).click();
    await expect(page.getByRole("main").getByRole("button", { name: "Lagre" })).toBeVisible();

    const brudd = (await new AxeBuilder({ page }).include("main").withTags(wcagTags).analyze()).violations;
    expect(brudd).toEqual([]);
});

test("lagring av norsk kontonummer viser suksessmeldingen én gang og fjerner cookien", async ({ page, context }) => {
    await page.goto("nb/endre-kontonummer");
    await hydrert(page);
    const main = page.getByRole("main");

    await main.getByRole("button", { name: "Endre" }).click();
    await main.getByRole("textbox", { name: "Kontonummer" }).fill("12345678911");
    await main.getByRole("button", { name: "Lagre" }).click();

    await page.waitForURL(/\/nb\/endre-kontonummer\?result=success/);
    await expect(main.getByText("Du har endret kontonummeret ditt.")).toBeVisible();
    await expect(main.getByText("Nav vil sende deg et varsel om endringen på SMS og/eller e-post.")).toBeVisible();

    await page.reload();
    await expect(main.getByRole("heading", { level: 2, name: "Endre kontonummer for utbetaling" })).toBeVisible();
    await expect(main.getByText("Du har endret kontonummeret ditt.")).toHaveCount(0);
    expect((await context.cookies()).find((c) => c.name === "kontonr-result")).toBeUndefined();
});

test("feilcookie viser feilmeldingen én gang", async ({ page, context }) => {
    await context.addCookies([{ name: "kontonr-result", value: "error", domain: "localhost", path: "/" }]);
    const main = page.getByRole("main");

    await page.goto("nb/endre-kontonummer");
    await expect(main.getByText("Det oppsto en feil ved endring av kontonummer.")).toBeVisible();

    await page.reload();
    await expect(main.getByRole("heading", { level: 2, name: "Endre kontonummer for utbetaling" })).toBeVisible();
    await expect(main.getByText("Det oppsto en feil ved endring av kontonummer.")).toHaveCount(0);
    expect((await context.cookies()).find((c) => c.name === "kontonr-result")).toBeUndefined();
});

const språk = [
    { sti: "nn/endre-kontonummer", tittel: "Endre kontonummer for utbetaling", endre: "Endre", lagre: "Lagre", avbryt: "Avbryt" },
    { sti: "en/endre-kontonummer", tittel: "Change account number for payment", endre: "Change", lagre: "Save", avbryt: "Cancel" },
];

for (const { sti, tittel, endre, lagre, avbryt } of språk) {
    test(`${sti} har oversatt tittel og skjemaknapper`, async ({ page }) => {
        await page.goto(sti);
        await hydrert(page);
        const main = page.getByRole("main");

        await expect(main.getByRole("heading", { level: 2, name: tittel })).toBeVisible();
        await main.getByRole("button", { name: endre }).click();
        await expect(main.getByRole("button", { name: lagre })).toBeVisible();
        await expect(main.getByRole("button", { name: avbryt })).toBeVisible();
    });
}

test("personalia hentes aldri i nettleseren, verken ved lasting eller etter lagring", async ({ page }) => {
    const apiKall: string[] = [];
    page.on("request", (request) => {
        if (request.url().includes("/api/personalia")) apiKall.push(request.url());
    });

    await page.goto("nb/endre-kontonummer", { waitUntil: "networkidle" });
    await hydrert(page);
    const main = page.getByRole("main");
    await main.getByRole("button", { name: "Endre" }).click();
    await main.getByRole("textbox", { name: "Kontonummer" }).fill("12345678911");
    await main.getByRole("button", { name: "Lagre" }).click();
    await page.waitForURL(/result=success/);
    await expect(main.getByText("Du har endret kontonummeret ditt.")).toBeVisible();

    expect(apiKall).toEqual([]);
});
