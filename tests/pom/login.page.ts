import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page : Page;
    readonly usernameBox : Locator;
    readonly passwordBox : Locator;
    readonly signInButton : Locator;
    readonly successMessage : Locator;
    readonly errorMessage : Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameBox = page.locator('#username');
        this.passwordBox = page.locator('#password');
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.successMessage = page.locator('#flash_notice');
        this.errorMessage = page.locator('#flash_alert');
    }

    async logIn(username : string, password : string) {
        await this.usernameBox.click();
        await this.usernameBox.fill(username);
        await this.passwordBox.click();
        await this.passwordBox.fill(password);
        await this.signInButton.click();
    }

    async goTo() {
        await this.page.goto('https://travel.agileway.net/login');
    }
}