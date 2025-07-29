import { Locator, Page , expect} from "@playwright/test";

export class SearchPage {
    readonly page : Page;
    readonly returnTripDiv : Locator;
    readonly flightsTable : Locator;

    constructor(page: Page) {
        this.page = page;
        this.returnTripDiv = page.locator('#returnTrip');
        this.flightsTable = page.locator('#flights');
    }

    async goTo() {
        await this.page.goto('https://travel.agileway.net/flights/start');
    }

    async checkFlights(id : string, monthyear : string) {
        await this.page.locator(id).selectOption(monthyear);
        await expect(this.flightsTable).not.toHaveCSS('display', 'none');
    }
}