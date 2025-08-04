import { type Locator, type Page, expect } from "@playwright/test";
export class PassengerDetails{

    readonly page : Page;
    readonly Flights : Locator;
    readonly Header : Locator;
    readonly firstName : Locator;
    readonly lastName : Locator;
    readonly submitButton : Locator;
    readonly flashAlert : Locator;

    constructor(page : Page){
        this.page = page;
        this.Flights = page.locator('div p').first();
        this.Header = page.locator('h2');
        this.firstName = page.locator('input[name="passengerFirstName"]');
        this.lastName = page.locator('input[name="passengerLastName"]');
        this.submitButton = page.locator('input[type="submit"]');
        this.flashAlert = page.locator('#flash_alert');
    }

    async fillFirstAndLastNames(firstName : string, lastName : string) {
        await this.firstName.click();
        await this.firstName.fill(firstName);
        await this.firstName.click();
        await this.lastName.fill(lastName);
    }

    async clickSubmitButton(){
        await this.submitButton.click();
    }
    
}