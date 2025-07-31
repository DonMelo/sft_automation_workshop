import {Page, Locator} from '@playwright/test';
import { BasePage } from './basePage';

export class PassengerDetailsPage extends BasePage {
    readonly passengeFirstName: Locator;
    readonly passengerLastName: Locator;

    constructor(page: Page) {
        super(page);
        this.passengeFirstName = page.locator('[name="passengerFirstName"]');
        this.passengerLastName = page.locator('[name="passengerLastName"]');
    }

    async enterPassengerDetails(firstname: string, lastname:string) {
        await this.passengeFirstName.fill(firstname);
        await this.passengerLastName.fill(lastname);
        await this.button.click();
    }
}