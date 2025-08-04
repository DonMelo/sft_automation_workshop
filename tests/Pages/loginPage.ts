import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.rememberMeCheckbox = page.locator('#remember_me');
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
    }

    async gotoTo() {
        await this.page.goto('https://travel.agileway.net/login');
    }

    async enterUsername(username: string) {
        await this.usernameField.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async setRememberMe(rememberMe: boolean) {
        if (rememberMe) {
            await this.rememberMeCheckbox.check();
        }
    }

    async signIn() {
        await this.signInButton.click();
    }
}