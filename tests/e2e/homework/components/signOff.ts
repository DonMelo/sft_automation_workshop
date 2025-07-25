import {Page, Locator} from '@playwright/test';

export class SignOff {
    readonly page: Page;
    readonly logOut: Locator;
    readonly logOutSuccess: Locator;

    constructor (page: Page) {
        this.page = page;
        this.logOut = page.locator("a[href='/logout']");
        this.logOutSuccess = page.locator('#flash_notice');
    }

    async signOut() {
        await this.logOut.click();
    }
}