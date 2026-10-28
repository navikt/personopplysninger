import { expect, test } from "@playwright/test";

test("har ingen øyer", async ({ page }) => {
    await page.goto("nb/medlemskap-i-folketrygden");

    await expect(page.getByRole("heading", { level: 2, name: "Medlemskap og unntak fra medlemskap i folketrygden" })).toBeVisible();
    await expect(page.locator("astro-island")).toHaveCount(0);
});

test("panelene er lukket og kan åpnes og lukkes", async ({ page }) => {
    await page.goto("nb/medlemskap-i-folketrygden");
    const panel = page.locator("details", { hasText: "DANMARK" });

    await expect(panel).not.toHaveAttribute("open");
    await panel.locator("summary").click();
    await expect(panel).toHaveAttribute("open", "");
    await expect(panel.getByText("DANMARK").first()).toBeVisible();
    await panel.locator("summary").click();
    await expect(panel).not.toHaveAttribute("open");
});

test("hjelpetekst i en periode", async ({ page }) => {
    await page.goto("nb/medlemskap-i-folketrygden");
    const panel = page.locator("details").first();
    await panel.locator("summary").click();

    await panel.getByRole("button", { name: "Mer om Hjemmel" }).first().click();
    await expect(
        page.getByText("Hjemmel viser grunnlaget for ditt medlemskap i folketrygden (lov eller avtale).", { exact: false }).first(),
    ).toBeVisible();
});

test("lenker til medlemskap i folketrygden på riktig språk", async ({ page }) => {
    await page.goto("nn/medlemskap-i-folketrygden");
    await expect(page.getByRole("main").getByRole("link", { name: "Les om medlemskap i folketrygda" })).toHaveAttribute(
        "href",
        "/no/person/flere-tema/arbeid-og-opphold-i-norge/nynorsk/medlemskap-i-folketrygda",
    );

    await page.goto("en/medlemskap-i-folketrygden");
    await expect(page.getByRole("main").getByRole("link", { name: "Read about membership in the National Insurance Scheme" })).toHaveAttribute(
        "href",
        "/en/home/rules-and-regulations/membership-of-the-national-insurance-scheme",
    );
});

test("sender sidens brødsmule til dekoratøren", async ({ page }) => {
    await page.goto("en/medlemskap-i-folketrygden");

    await expect(
        page.getByRole("navigation", { name: /you are here|du er her/i }).getByText("Membership of the National Insurance Scheme"),
    ).toBeAttached();
});
