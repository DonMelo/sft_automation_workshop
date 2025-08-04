import {expect, Locator, Page} from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly UserName: Locator;
    readonly Password: Locator;
    readonly SignIn: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.UserName = page.locator('#username');
        this.Password = page.locator('#password');
        this.SignIn = page.locator('input[type="submit"][value="Sign in"]')
    }

    async gotoFlightPage() {
        this.page.goto('https://travel.agileway.net/');
    }

    async Login() {
        await this.UserName.fill("agileway");
        await this.Password.fill("testW1se");
        await this.SignIn.click();
    }
}