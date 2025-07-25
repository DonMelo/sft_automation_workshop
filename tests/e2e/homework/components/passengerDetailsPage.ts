import {Page, Locator} from '@playwright/test';

export class PassengerDetailsPage {
    readonly page: Page;
    readonly passengeFirstName: Locator;
    readonly passengerLastName: Locator;
    readonly nextButton: Locator;
    readonly errorAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.passengeFirstName = page.locator('[name="passengerFirstName"]');
        this.passengerLastName = page.locator('[name="passengerLastName"]');
        this.nextButton = page.locator('[value="Next"]');
        this.errorAlert = page.locator('#flash_alert');
    }

    async enterPassengerDetails(firstname: string, lastname:string) {
        await this.passengeFirstName.fill(firstname);
        await this.passengerLastName.fill(lastname);
        await this.nextButton.click();
    }
}