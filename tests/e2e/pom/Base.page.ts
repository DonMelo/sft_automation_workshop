import { Page, Locator, expect} from '@playwright/test'

export class BasePage {
    readonly page: Page;
    readonly errorMessage: Locator;
    readonly successMessage: Locator;
    readonly pageHeading: Locator;
    readonly logoutButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.errorMessage = page.locator('#flash_alert');
        this.successMessage = page.locator('#flash_notice');
        this.pageHeading = page.locator('h2');
        this.logoutButton = page.locator('a[href="/logout"]');
    }

    async goto(path = '/') {
    await this.page.goto(path);
}

    async waitForPageHeading(expectedText: string) {
    await this.pageHeading.filter({ hasText: expectedText }).waitFor();
  }

    async logout(){
        await this.logoutButton.waitFor({ state: 'visible' });
        await this.logoutButton.click();
    }

}