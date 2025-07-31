import {Page, Locator} from '@playwright/test';
import { BasePage } from './basePage';

export class Login extends BasePage {
    readonly userName: Locator; 
    readonly password: Locator;

    constructor (page: Page) {
        super(page);
        this.userName = page.locator('#username');
        this.password = page.locator('#password');
    }

    async goToPage() {
        await this.page.goto('/');
    }

    async loginUser(username: string, password: string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.button.click();
    }
}

