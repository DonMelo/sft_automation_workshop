import { Page, expect, Locator, test } from '@playwright/test';

export class LoginPage {
    readonly page : Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
    }

    async goto() {
        await this.page.goto('https://travel.agileway.net/');
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async submitSignIn() {
        await this.signInButton.click();
    }

    async signOut() {
        await this.page.locator("a[href='/logout']").click();
    }
}