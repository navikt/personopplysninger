import { expect, test } from "@playwright/test";

const locales = [
    { locale: "nb", heading: "Personopplysninger", firstName: "Fornavn" },
    { locale: "nn", heading: "Personopplysningar", firstName: "Førenamn" },
    { locale: "en", heading: "Personal data", firstName: "First name" },
];

for (const { locale, heading, firstName } of locales) {
    test(`viser og laster ${locale}-siden på nytt`, async ({ page }) => {
        const response = await page.goto(`${locale}/`);

        expect(response?.status()).toBe(200);
        await expect(page).toHaveTitle("Personopplysninger - www.nav.no");
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.getByRole("main")).toHaveAttribute("id", "maincontent");
        await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
        await expect(page.getByText(firstName, { exact: true })).toBeVisible();

        await page.reload();
        await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    });
}

test("helse-endepunktene svarer uten innlogging", async ({ request }) => {
    const [alive, ready] = await Promise.all([request.get("api/internal/isAlive"), request.get("api/internal/isReady")]);

    expect(alive.status()).toBe(200);
    expect(ready.status()).toBe(200);
});

test("sender arbeidsforhold-snarveien til seksjonen på forsiden", async ({ page }) => {
    await page.goto("nb/arbeidsforhold");

    await expect(page).toHaveURL(/\/person\/personopplysninger\/nb\/#arbeidsforhold$/);
});
