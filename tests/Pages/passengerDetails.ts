import { Page, expect, Locator } from '@playwright/test';

export class PassengerDetailsPage {
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly nextButton: Locator;
    readonly flightInfoConfirmation: Locator;
    readonly alertBox: Locator;
    


    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.locator('input[name="passengerFirstName"]');
        this.lastNameField = page.locator('input[name="passengerLastName"]');
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.flightInfoConfirmation = page.locator('div.flight-confirmation');
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

    async validateDepartDate(date: string) {
    const text = await this.flightInfoConfirmation.textContent();
    const lines = text?.split('\n') || [];
    const departInfo = lines[2] || '';
   expect(departInfo).toContain(date);
}

    async validateReturnDate(date: string) {
        const flightInfo = (await this.flightInfoConfirmation.textContent())?.split('\n')[3];
        expect(flightInfo).toContain(date);
    }

    async validateDepartCities(from: string, to: string) {
        const flightInfo = (await this.flightInfoConfirmation.textContent())?.split('\n')[2];
        expect(flightInfo).toContain(from + " to " + to);
    }

    async validateReturnCities(from: string, to: string) {
        const flightInfo = (await this.flightInfoConfirmation.textContent())?.split('\n')[3];
        expect(flightInfo).toContain(from + " to " + to);
    }
}