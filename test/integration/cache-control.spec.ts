import { expect, test } from "@playwright/test";

test("sider med personopplysninger caches ikke", async ({ request }) => {
    const response = await request.get("nb/");

    expect(response.status()).toBe(200);
    expect(response.headers()["cache-control"]).toBe("private, no-store");
});

test("videresending til språk caches ikke", async ({ request }) => {
    const response = await request.get("dsop", { maxRedirects: 0 });

    expect(response.status()).toBe(302);
    expect(response.headers()["cache-control"]).toBe("private, no-store");
});
