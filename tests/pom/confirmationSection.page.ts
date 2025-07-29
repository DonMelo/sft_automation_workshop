import { Locator, Page } from "@playwright/test";
export class ConfirmationPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly bookingNumber: Locator;
    readonly flightsTripType: Locator;
    readonly flightsTripTypeDate: Locator;
    readonly passengerDetails: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Confirmation' });
        this.bookingNumber = page.getByText(/^Booking number:/);
        this.flightsTripType = page.getByText(/Flights \((return|oneway) Trip\)/);
        this.flightsTripTypeDate = page.getByText(/Flights \(.* Trip\) \d{4}-\d{2}/);
        this.passengerDetails = page.getByText(/Passenger Details:/);
    }

}