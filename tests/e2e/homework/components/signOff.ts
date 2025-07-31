import {Page, Locator} from '@playwright/test';
import { BasePage } from './basePage';

export class SignOff extends BasePage {
    readonly logOut: Locator;

    constructor (page: Page) {
        super(page);
        this.logOut = page.locator("a[href='/logout']");
    }

    async signOut() {
        await this.logOut.click();
    }
}