import type { Page, Request as PlaywrightRequest } from "@playwright/test";
import { createMockApp } from "../../../src/mocks/app";

const mockApp = createMockApp();

const createRequestInit = (request: PlaywrightRequest): RequestInit => {
    const method = request.method();

    return {
        method,
        headers: request.headers(),
        body: method === "GET" || method === "HEAD" ? undefined : request.postDataBuffer(),
    };
};

export const mockApiRequests = async (page: Page) => {
    await page.route("**/api/**", async (route) => {
        const request = route.request();
        const url = new URL(request.url());
        url.searchParams.set("delay", "0");

        const response = await mockApp.request(`${url.pathname}${url.search}`, createRequestInit(request));

        await route.fulfill({
            status: response.status,
            headers: Object.fromEntries(response.headers),
            body: Buffer.from(await response.arrayBuffer()),
        });
    });
};
