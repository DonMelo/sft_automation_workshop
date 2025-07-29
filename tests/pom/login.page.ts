import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;
    readonly successLogout: Locator;


    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.successMessage = page.getByText('Signed in!');
        this.errorMessage = page.getByText('Invalid email or password');
        this.successLogout = page.getByText('Signed out!');
    }
        async goTo() {
        await this.page.goto('https://travel.agileway.net/login');
    }

        async assertRedirectToFlightsStartPage() {
            await expect(this.page).toHaveURL('https://travel.agileway.net/flights/start');
        }

        async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}