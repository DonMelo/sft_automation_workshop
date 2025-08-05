import { type Locator, type Page } from "@playwright/test";

export class PassengerDetails {
    readonly page: Page;
    readonly flightsInfo: Locator;
    readonly header: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly submitButton: Locator;
    readonly flashAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.flightsInfo = page.locator('div p').first();
        this.header = page.locator('h2');
        this.firstNameInput = page.locator('input[name="passengerFirstName"]');
        this.lastNameInput = page.locator('input[name="passengerLastName"]');
        this.submitButton = page.locator('input[type="submit"]');
        this.flashAlert = page.locator('#flash_alert');
    }

    async fillFirstAndLastNames(firstName: string, lastName: string): Promise<void> {
        await this.firstNameInput.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.click();
        await this.lastNameInput.fill(lastName);
    }

    async clickSubmitButton(): Promise<void> {
        await this.submitButton.click();
    }
}