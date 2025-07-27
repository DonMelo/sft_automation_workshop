import { Page, expect, Locator, test } from '@playwright/test';

export class FlightPage {
    readonly page : Page;

    constructor(page: Page){
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://travel.agileway.net/');
    }
}