import {Page, Locator} from '@playwright/test';

export class Login {
    readonly page: Page;
    readonly userName: Locator; 
    readonly password: Locator;
    readonly signIn: Locator;

    constructor (page: Page) {
        this.page = page;
        this.userName = page.locator('#username');
        this.password = page.locator('#password');
        this.signIn = page.locator('input[type="submit"]')
    }

    async goToPage() {
        await this.page.goto('https://travel.agileway.net/')
        await this.page.waitForLoadState('networkidle');
    }

    async loginUser(username: string, password: string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signIn.click();
    }
}

