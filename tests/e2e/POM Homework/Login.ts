import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly page: Page;
    readonly loginButton: Locator;
    readonly successNotification: Locator;
    readonly alertNotification: Locator;
    readonly signUpLink: Locator;
    readonly signUpHeader: Locator;

    constructor(page: Page) {
        this.usernameField = page.locator('input#username');
        this.passwordField = page.locator('input#password');
        this.page = page;
        this.loginButton = page.locator('input[type*="submit"]');
        this.successNotification = page.locator('div#flash_notice');
        this.alertNotification = page.locator('#flash_alert');
        this.signUpLink = page.locator('[href*="/users/new"]');
        this.signUpHeader = page.locator('.translation_missing');
    }

    async goToPage(path: string = ''){
        await this.page.goto(`https://travel.agileway.net/${path}`);
    }

    async login(username: string, password: string){
        await this.usernameField.click();
        await this.usernameField.fill(username);
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async clickSignUp(){
        await this.signUpLink.click();
    }
}
