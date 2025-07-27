import { Locator, Page } from "@playwright/test"

export class SignIn {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly signIn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator("#username");
        this.password = page.locator("#password");
        this.signIn = page.locator('input[type="submit"][value="Sign in"][name="commit"]');

    }
    async goTo(){
        await this.page.goto('https://travel.agileway.net/login');
    }
    async signInToAgileWay(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signIn.click();
    }
}