import { Page, expect, Locator } from '@playwright/test';

export class PassengerDetailsPage {
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly nextButton: Locator;
    readonly flightInfoConfirmation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.locator('input[name="passengerFirstName"]');
        this.lastNameField = page.locator('input[name="passengerLastName"]');
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.flightInfoConfirmation = page.locator('//*[@id="container"]/div[2]');
    }

    async enterFirstName(name: string) {
        await this.firstNameField.fill(name);
    }

    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async pressNextButton() {
        await this.nextButton.click();
    }

    async validateDepartDate(date: string) {
        const flightInfo = (await this.flightInfoConfirmation.textContent())?.split('\n')[2];
        expect(flightInfo).toContain(date);
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