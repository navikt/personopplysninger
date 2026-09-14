import { expect, test } from "@playwright/test";

const locales = [
    { locale: "nb", heading: "Personopplysninger", firstName: "Fornavn" },
    { locale: "nn", heading: "Personopplysningar", firstName: "Førenamn" },
    { locale: "en", heading: "Personal data", firstName: "First name" },
];

for (const { locale, heading, firstName } of locales) {
    test(`renders and reloads the ${locale} Astro route`, async ({ page }) => {
        const response = await page.goto(`/${locale}/`);

        expect(response?.status()).toBe(200);
        await expect(page).toHaveTitle("Personopplysninger");
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
        await expect(page.getByText(firstName, { exact: true })).toBeVisible();

        await page.reload();
        await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    });
}

test("serves Astro health endpoints without authentication", async ({ request }) => {
    const [alive, ready] = await Promise.all([request.get("/api/internal/isAlive"), request.get("/api/internal/isReady")]);

    expect(alive.status()).toBe(200);
    expect(ready.status()).toBe(200);
});

test("redirects the arbeidsforhold shortcut to the home section", async ({ page }) => {
    await page.goto("/nb/arbeidsforhold");

    await expect(page).toHaveURL(/\/person\/personopplysninger\/nb\/#arbeidsforhold$/);
});

test("renders the existing error state when a client fetch fails", async ({ page }) => {
    await page.route("**/api/personalia", (route) =>
        route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({ message: "Mock error" }),
        }),
    );

    await page.goto("/nb/");

    await expect(page.getByRole("alert")).toContainText("Oisann, noe gikk galt ved henting av data!");
});
