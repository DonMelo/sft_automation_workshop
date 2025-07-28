import {Page, Locator} from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly loginError: Locator;

    constructor (page: Page) {
        this.page = page;
        this.loginError = page.locator('#flash_alert');
    }
}