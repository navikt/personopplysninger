import { expect, test } from "@playwright/test";

test("medlemskap har dataene i HTML-en fra serveren, før JavaScript kjører", async ({ request }) => {
    const response = await request.get("nb/medlemskap-i-folketrygden");

    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("DANMARK");
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
