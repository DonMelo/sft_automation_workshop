import { Page, expect, Locator, test } from '@playwright/test';

export class BasePage {
    // The page object for the base page, which can be extended by other pages
    readonly page: Page;

    // Common locators for error and notice messages
    readonly error: Locator;
    readonly notice: Locator;

    constructor(page: Page){
        this.page = page;

        this.error = page.locator('#flash_alert');
        this.notice = page.locator('#flash_notice');
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
}