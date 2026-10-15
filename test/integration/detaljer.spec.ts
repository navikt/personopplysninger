import { expect, test } from "@playwright/test";

test("navigerer fra DSOP-historikken til detaljene for et innslag", async ({ page }) => {
    await page.goto("nb/dsop");

    const lenke = page.getByRole("main").getByRole("link", { name: "STOREBRAND LIVSFORSIKRING AS" }).first();
    await lenke.click();

    await expect(page).toHaveURL(/\/nb\/dsop\/2019-06-18T10%3A45%3A51\.634$/);
    await expect(page.getByRole("heading", { level: 2, name: "STOREBRAND LIVSFORSIKRING AS" })).toBeVisible();
    await expect(page.getByText("Ingen personopplysninger har blitt utlevert.")).toHaveCount(0);
});

test("viser DSOP-detaljer ved direkte lenke", async ({ page }) => {
    await page.goto("nb/dsop/2019-06-18T10%3A45%3A52.101");

    await expect(page.getByRole("heading", { level: 2, name: "GJENSIDIGE FORSIKRING AS" })).toBeVisible();
});

test("navigerer fra institusjonsopphold-historikken til detaljene for et opphold", async ({ page }) => {
    await page.goto("nb/institusjonsopphold");

    await page.getByRole("main").getByRole("link", { name: "VIK FENGSEL" }).first().click();

    await expect(page).toHaveURL(/\/nb\/institusjonsopphold\/[^/]+%3A[^/]+$/);
    await expect(page.getByRole("heading", { level: 2, name: "VIK FENGSEL" })).toBeVisible();
    await expect(page.getByText("Det er ingen institusjonsopphold å vise.")).toHaveCount(0);
});

test("viser institusjonsopphold-detaljer ved direkte lenke", async ({ page }) => {
    await page.goto("nb/institusjonsopphold/2017-10-02T07%3A38%3A56.816");

    await expect(page.getByRole("heading", { level: 2, name: "VIK FENGSEL" })).toBeVisible();
    await expect(page.getByText("Organisasjonsnummer 974 736 942")).toBeVisible();
});
