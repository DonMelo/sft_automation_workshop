import { Page, expect, Locator } from '@playwright/test';

export class PassengerDetailsPage {
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly nextButton: Locator;
    readonly alertBox: Locator;
    


    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.locator('input[name="passengerFirstName"]');
        this.lastNameField = page.locator('input[name="passengerLastName"]');
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.alertBox = page.locator('#flash_alert');
    }

    async enterFirstName(name: string) {
        await this.firstNameField.fill(name);
    }

    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

   
    async expectMissingLastNameAlert() {
    await expect(this.alertBox).toHaveText('Must provide last name');
    }


    async pressNextButton() {
        await this.nextButton.click();
    }

}