import { test, Locator, Page, expect } from '@playwright/test';
 
export class PassengerDetailsPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly nextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('input[name="passengerFirstName"]');
        this.lastNameInput = page.locator('input[name="passengerLastName"]');
        this.nextButton = page.getByRole('button', { name: 'Next' });
    }

    async fillPassengerDetails(firstName: string, lastName: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.nextButton.click();
    }

    async redirectToPaymentPage() {
        await expect(this.page).toHaveURL('https://travel.agileway.net/flights/passenger');
}
}