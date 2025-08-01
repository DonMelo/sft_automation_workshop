import { Locator, Page , expect} from "@playwright/test";

export class SearchPage {
    readonly page : Page;
    readonly returnCheckBox : Locator;
    readonly oneWayCheckBox : Locator;
    readonly returnTripDateSection : Locator;
    readonly flightsTable : Locator;
    readonly cityFromSelect : Locator;
    readonly cityToSelect : Locator;

    constructor(page: Page) {
        this.page = page;
        this.returnCheckBox = page.getByRole('radio').first();
        this.oneWayCheckBox = page.getByRole('radio').nth(1);
        this.returnTripDateSection = page.locator('#returnTrip');
        this.flightsTable = page.locator('#flights');
        this.cityFromSelect = page.locator('select[name="fromPort"]');
        this.cityToSelect = page.locator('select[name="toPort"]');
    }

    async goTo() {
        await this.page.goto('https://travel.agileway.net/flights/start');
    }

    async checkFlights(id : string, monthyear : string) {
        await this.page.locator(id).selectOption(monthyear);
        await expect(this.flightsTable).toBeVisible();
    }

    async chooseCities(cityFrom : string, cityTo: string) {
        await this.cityFromSelect.selectOption('New York');
        await this.cityToSelect.selectOption('Sydney');
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }
}