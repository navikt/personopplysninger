import { expect, test } from "@playwright/test";
import { mockApiRequests } from "./fixtures/mockApi";
import { PersonopplysningerPage } from "./pages/personopplysninger.page";

test.describe("Astro compatibility shell", () => {
    test("redirects the root path and loads the existing React app", async ({ page }) => {
        const personopplysninger = new PersonopplysningerPage(page);
        await personopplysninger.gotoRoot();

        await expect(page).toHaveURL(/\/person\/personopplysninger\/nb\/$/);
        await expect(personopplysninger.heading).toHaveText("Personopplysninger");
        await expect(page.locator("html")).toHaveAttribute("lang", "nb");
    });

    for (const { locale, heading } of [
        { locale: "nb", heading: "Personopplysninger" },
        { locale: "nn", heading: "Personopplysningar" },
        { locale: "en", heading: "Personal data" },
    ] as const) {
        test(`serves the existing React app under the ${locale} prefix`, async ({ page }) => {
            const personopplysninger = new PersonopplysningerPage(page, locale);
            await personopplysninger.goto();

            await expect(personopplysninger.heading).toHaveText(heading);
            await expect(page.locator("html")).toHaveAttribute("lang", locale);
        });
    }

    test("hosts deep React Router routes through the locale catch-all", async ({ page }) => {
        await mockApiRequests(page);
        await page.goto("/person/personopplysninger/nb/medlemskap-i-folketrygden");

        await expect(page).toHaveURL(/\/person\/personopplysninger\/nb\/medlemskap-i-folketrygden$/);
        await expect(page.getByRole("heading", { name: /Medlemskap og unntak fra medlemskap i folketrygden/ })).toBeVisible();
    });

    test("preserves client-side navigation between existing React routes", async ({ page }) => {
        const personopplysninger = new PersonopplysningerPage(page);
        await personopplysninger.goto();

        await page.getByRole("link", { name: /^Medlemskap og unntak fra medlemskap i folketrygden/ }).click();

        await expect(page).toHaveURL(/\/person\/personopplysninger\/nb\/medlemskap-i-folketrygden$/);
        await expect(page.getByRole("heading", { name: /Medlemskap og unntak fra medlemskap i folketrygden/ })).toBeVisible();
    });

    test("preserves existing React Router redirects", async ({ page }) => {
        await mockApiRequests(page);
        await page.goto("/person/personopplysninger/nb/arbeidsforhold");

        await expect(page).toHaveURL(/\/person\/personopplysninger\/nb\/#arbeidsforhold$/);
        await expect(page.getByRole("heading", { level: 1, name: "Personopplysninger" })).toBeVisible();
    });
});
