import {Locator, Page} from "@playwright/test";

export class CustomerPage {
    readonly page: Page;
    readonly FirstName: Locator;
    readonly LastName: Locator;
    readonly Next: Locator;
     
    constructor(page: Page) {
        this.page = page;
        this.FirstName = page.locator('input[name="passengerFirstName"]');
        this.LastName = page.locator('input[name="passengerLastName"]');
        this.Next = page.locator('input[type="submit"][value="Next"]');
    }

    async gotoFlightPage() {
        this.page.goto('https://travel.agileway.net/');
    }

    async putPassengerDetails() {
        await this.FirstName.fill("Simona");
        await this.LastName.fill("Aukstakalne");
        await this.Next.click();
    }

}