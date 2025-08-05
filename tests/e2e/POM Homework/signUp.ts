import { type Locator, type Page } from "@playwright/test";

export class SignUp {
    readonly page: Page;
    readonly linkTermsAndConditions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.linkTermsAndConditions = page.locator('a[href="/terms_and_conditions"]');
    }

    async clickTermsAndConditions() {
        await this.linkTermsAndConditions.click();
    }
}
