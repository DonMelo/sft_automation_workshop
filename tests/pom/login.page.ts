import { expect, Locator, Page } from '@playwright/test'

export class LoginPage{
    readonly page: Page;
    readonly userTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly signInButton: Locator;
    readonly flashAlert: Locator;
    readonly falshNotice: Locator;

    constructor(page: Page){
        this.page = page;
        this.userTextBox = page.locator('#username');
        this.passwordTextBox = page.locator('#password');
        this.signInButton = page.locator('input[type="submit"][value="Sign in"]');
        this.flashAlert = page.locator('#flash_alert');
        this.falshNotice = page.locator('#flash_notice');
    }

    async goTo(){
        await this.page.goto('https://travel.agileway.net/login')
    }

    async enterCredentialsAndSignIn(username: string, password: string){
        await this.userTextBox.click();
        await this.userTextBox.fill(username);
        
        await this.passwordTextBox.click();
        await this.passwordTextBox.fill(password);

        await this.signInButton.click();
    }

    async expectLoginErrorMessage(message: string){
        await expect(this.flashAlert).toHaveText(message);
        await expect(this.flashAlert).toBeVisible();
    }

    async expectLogOutMessage(message: string){
        await expect(this.falshNotice).toHaveText(message);
        await expect(this.falshNotice).toBeVisible();
    }
}