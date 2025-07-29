import { Page, Locator, expect} from '@playwright/test'

export class BasePage {
    readonly page: Page;
    readonly errorMessage: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.errorMessage = page.locator('#flash_alert');
        this.successMessage = page.locator('#flash_notice');
    }

}