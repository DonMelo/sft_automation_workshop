import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page:Page;
    readonly username:Locator; 
    readonly password:Locator;
    readonly signInButton: Locator;
    readonly flashNotice: Locator;
    readonly flashAlert: Locator;

    constructor(page:Page){
        this.page = page;
        this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.flashNotice = page.locator('#flash_notice');
        this.flashAlert = page.locator('#flash_alert');
    }

    async goTo(){
        await this.page.goto('https://travel.agileway.net/login');
    }
    async login(username: string, password: string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
    }

    async assertSignedIn(message: string) {
        await expect(this.flashNotice).toHaveText(message);
    }

    async assertLoginFailed(message: string) {
        await expect(this.flashAlert).toHaveText(message);
    }
}