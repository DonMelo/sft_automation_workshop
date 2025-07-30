import { Locator, Page } from "@playwright/test";
import { SelectFlightPage } from "./SelectFlight.page";


export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Sign in' })
    }

    async gotoTravelPage(){
        this.page.goto('https://travel.agileway.net/login');
    }

    async logInToTravelPage(){
        await this.usernameInput.fill('agileway');
        await this.passwordInput.fill('testW1se');
        await this.loginButton.click();
        return new SelectFlightPage(this.page); 
    }
}