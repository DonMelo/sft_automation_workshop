import {expect, Locator, Page} from "@playwright/test"

export class LogInPage {
    
    readonly page: Page;
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.loginInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.signInButton = page.locator("[type='submit']");
    }

    async goToPage(){
        await this.page.goto("https://travel.agileway.net/login");
    }

    async signIn(username: string, password: string){
        await this.loginInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }

    async checkErrorMessage(errorMessage: string){
        await expect(this.page.locator("#flash_alert")).toContainText(errorMessage);
    }

}