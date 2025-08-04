import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly termsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.termsLink = page.getByRole('link', { name: 'Terms and Conditions' });

    }

}