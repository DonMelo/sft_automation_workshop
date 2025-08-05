import { Page, expect, Locator, test } from '@playwright/test';

export class BasePage {
    // The page object for the base page, which can be extended by other pages
    readonly page: Page;

    // Common locators for error and notice messages
    readonly error: Locator;
    readonly notice: Locator;
    readonly header: Locator;

    constructor(page: Page){
        this.page = page;

        this.error = page.locator('#flash_alert');
        this.notice = page.locator('#flash_notice');
        this.header = page.locator('h2');
    }

    async goto(){
        await this.page.goto('/');
    }

    async expectNoticeVisible() {
        await expect(this.notice).toBeVisible();
    }

    async expectNoticeContainText(text: string) {
        await expect(this.notice).toContainText(text);
    }

    async expectErrorVisible() {
        await expect(this.error).toBeVisible();
    }

    async expectHeaderValue(text: string){
        await expect(this.header).toContainText(text);
    }
}