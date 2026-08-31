import { expect, type Locator, type Page } from "@playwright/test";
import { mockApiRequests } from "../fixtures/mockApi";

export class PersonopplysningerPage {
    readonly heading: Locator;

    constructor(
        private readonly page: Page,
        private readonly locale: "nb" | "nn" | "en" = "nb",
    ) {
        this.heading = page.getByRole("heading", { level: 1 });
    }

    async goto() {
        await mockApiRequests(this.page);
        await this.page.goto(`/person/personopplysninger/${this.locale}/`);
        await expect(this.heading).toBeVisible();
    }

    async gotoRoot() {
        await mockApiRequests(this.page);
        await this.page.goto("/person/personopplysninger");
        await expect(this.heading).toBeVisible();
    }
}
