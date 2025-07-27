import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly logoutButton: Locator;
    readonly errorMessage: Locator;
    readonly welcomeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Sign in' });
        this.logoutButton = page.locator('a[href="/logout"]');
        this.errorMessage = page.locator('#flash_alert');
        this.welcomeMessage = page.locator('text=Welcome');
    }

    async goto() {
        await this.page.goto('https://travel.agileway.net/');
        await expect(this.usernameInput).toBeVisible();
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async logout(){
        await this.logoutButton.click();
        await expect(this.page).toHaveURL(/.*login/);
    }
}