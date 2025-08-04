import { type Locator, type Page, expect } from "@playwright/test";

export class homework{

    readonly logInField : Locator;
    readonly passwordField : Locator;
    readonly page : Page;
    readonly loginButton : Locator;
    readonly notificationForSuccSignIn : Locator;
    readonly alert: Locator;
    readonly signUp : Locator;
    readonly signUpHeader : Locator;

    constructor(page: Page){
        this.logInField = page.locator('input#username');
        this.passwordField = page.locator('input#password');
        this.page = page;
        this.loginButton = page.locator('input[type*="submit"]');
        this.notificationForSuccSignIn = page.locator('div#flash_notice');
        this.alert = page.locator('#flash_alert');
        this.signUp = page.locator('[href*="/users/new"]');
        this.signUpHeader = page.locator('.translation_missing');
    }

    async goToPage(path: string = ''): Promise<void> {
    await this.page.goto(`https://travel.agileway.net/${path}`);
    }

    async logIn(username : string, password : string){
        await this.logInField.click();
        await this.logInField.fill(username);
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async verifySuccSignIn() {
        await expect(this.notificationForSuccSignIn).toBeVisible();
        await expect(this.notificationForSuccSignIn).toHaveText('Signed in!');
        console.log('✅ Prisijungta.');
    }

    async verifyInvalidCreds(){
        await expect(this.alert).toBeVisible();
        await expect(this.alert).toContainText("Invalid email or password");
        console.log('❌ Invalid email or password')
    }

    async signUpClick(){
        await this.signUp.click();
        await this.verifySignUpHeader();
    }
    
    async verifySignUpHeader(){
        await expect(this.signUpHeader).toBeVisible();
        await expect(this.signUpHeader).toHaveText('Heading New Staff');
    }
    
}