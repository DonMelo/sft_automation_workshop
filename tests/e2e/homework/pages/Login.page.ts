import { Page, expect, Locator, test } from '@playwright/test';
import { BasePage } from './BasePage.page';
import { vars } from '../others/constants';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page){
        super(page);

        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
    }

    async goto() {
        await this.page.goto('/')
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

    async loginWithBaseCredentials() {
        await this.enterUsername(vars.correct_username);
        await this.enterPassword(vars.correct_password);
        await this.submitSignIn();
    }

    async signOut() {
        await this.page.locator("a[href='/logout']").click();
    }
}