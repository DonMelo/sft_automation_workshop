import {Page, Locator} from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly errorAlert: Locator;
    readonly pageHeader: Locator;
    readonly button: Locator;
    readonly successAlert: Locator;

    constructor (page: Page) {
        this.page = page;
        this.errorAlert = page.locator('#flash_alert');
        this.pageHeader = page.locator('h2');
        this.button = page.locator('input[type="submit"]');
        this.successAlert = page.locator('#flash_notice');
    }
}