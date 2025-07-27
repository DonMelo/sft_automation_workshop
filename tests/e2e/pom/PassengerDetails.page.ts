import { Page, Locator } from '@playwright/test';

export class PassengerDetailsPage {
    readonly page: Page;
    readonly firstName: Locator; 
    readonly lastName: Locator;
    readonly nextButton: Locator;
    readonly flightInfoSection: Locator;
    readonly pageTitle: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('input[name="passengerFirstName"]');
        this.lastName = page.locator('input[name="passengerLastName"]');
        this.nextButton = page.locator('input[type="submit"]');
        this.flightInfoSection = page.locator('div:not(#container)').filter({ hasText: 'Flights' });
        this.pageTitle = page.getByRole('heading', { name: 'Passenger Details' });
        this.errorMessage = page.locator('#flash_alert');
    }

    async fillPassengerDetails(firstName: string, lastName: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
    }

    async submitPassengerDetails() {
        await this.nextButton.click();
    }

    async fillAndSubmitPassengerDetails(firstName: string, lastName: string) {
        await this.fillPassengerDetails(firstName, lastName);
        await this.submitPassengerDetails();
    }

    getFlightInfoSection(tripType: 'oneway' | 'return' = 'return') {
        const text = tripType === 'return' ? 'Flights (return trip)' : 'Flights';
        return this.page.locator('div:not(#container)').filter({ hasText: text });
    }
}