// https://travel.agileway.net/login
import { expect, Locator, Page } from "@playwright/test";
export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Sign in' });
        this.successMessage = page.getByText('Signed in!');
        this.errorMessage = page.getByText('Invalid email or password');
    }

    async goto() {
        await this.page.goto('https://travel.agileway.net/login');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectSuccessMessage() {
        await expect(this.successMessage).toBeVisible();
    }

    async expectErrorMessage() {
        await expect(this.errorMessage).toBeVisible();
    }

    async assertRedirectToStartPage() {
        await expect(this.page).toHaveURL('https://travel.agileway.net/flights/start');
    }
}