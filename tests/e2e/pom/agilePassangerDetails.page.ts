import {expect, Locator, Page} from "@playwright/test"

export class PassangerDetailsPage{
    
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly nextButton: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.firstNameInput = page.locator('[name="passengerFirstName"]');
        this.lastNameInput = page.locator('[name="passengerLastName"]')
        this.nextButton = page.locator('[type="submit"]');
    }

    async clickNextButton(){
        await this.nextButton.click();
    }

    async inputFirstName(name: String){
        await this.firstNameInput.fill(`${name}`);
    }

    async inputLastName(name: String){
        await this.lastNameInput.fill(`${name}`);
    }
    async checkErrorMessage(errorMessage: String){
        await expect(this.page.locator("#flash_alert")).toContainText(`${errorMessage}`);
    }

    async checkSuccessMessage(successMessage: String){
        await expect(this.page.locator("#flash_notice")).toContainText(`${successMessage}`);
    }
}