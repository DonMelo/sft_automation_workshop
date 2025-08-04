import {Locator, Page} from "@playwright/test";

export class FlightPage {
    readonly page: Page;
    readonly TripTypeReturn: Locator;
    readonly LocationFrom: Locator;
    readonly LocationTo: Locator;
    readonly DepartureDay: Locator;
    readonly DepartureMonthYear: Locator;
    readonly ReturnDay: Locator;
    readonly ReturnMonthYear: Locator;
    readonly FlightOption: Locator;
    readonly ContinueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.TripTypeReturn = page.locator('input[name="tripType"][value="return"]');
        this.LocationFrom = page.locator('select[name="fromPort"]');
        this.LocationTo = page.locator('select[name="toPort"]');
        this.DepartureDay = page.locator('select[name="departDay"]');
        this.DepartureMonthYear = page.locator('select[name="departMonth"]');
        this.ReturnDay = page.locator('select[name="returnDay"]');
        this.ReturnMonthYear = page.locator('select[name="returnMonth"]');
        this.FlightOption = page.locator('table input[type="checkbox"]').nth(1);
        this.ContinueButton = page.locator('input[type="submit"][value="Continue"]');
    }

    async gotoFlightPage() {
        this.page.goto('https://travel.agileway.net/');
    }

    async selectTripType() {
        await this.TripTypeReturn.check();
    }

    async selectCityFrom() {
        await this.LocationFrom.selectOption('San Francisco');
    }

    async selectCityTo() {
        await this.LocationTo.selectOption('New York');
    }

    async selectDepartureDay() {
        await this.DepartureDay.selectOption('27');
    }

    async selectDepartureMonthYear() {
        await this.DepartureMonthYear.selectOption('June 2026');
    }

    async selectReturnDay() {
        await this.ReturnDay.selectOption('27');
    }
    async selectReturnMonthYear() {
        await this.ReturnMonthYear.selectOption('July 2026');
    }

    async selectFlightOption() {
        await this.FlightOption.check();
    }

    async clickContinueButton() {
        await this.ContinueButton.click();
    }
}