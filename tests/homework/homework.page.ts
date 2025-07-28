import {expect, Locator, Page} from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly UserName: Locator;
    readonly Password: Locator;
    readonly SignIn: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.UserName = page.locator('username');
        this.Password = page.getByTestId('password');
        this.SignIn = page.getByRole ('button', { name: 'commit' });
    }

    async gotoFlightPage() {
        this.page.goto('https://travel.agileway.net/')
    }

    async Login() {
        await this.UserName.fill("agileway");
        await this.Password.fill("test$W1se");
        await this.SignIn.press('Enter');
    }
}

export class FlightPage {
    readonly page: Page;
    readonly TripType: Locator;
    readonly LocationFrom: Locator;
    readonly LocationTo: Locator;
    readonly DepartureDay: Locator;
    readonly DepartureMonthYear: Locator;
    readonly ReturnDay: Locator;
    readonly ReturnMonthYear: Locator;
    readonly ContinueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.TripType = page.getByRole('radio', { name: 'tripType' });
        this.LocationFrom = page.getByRole('combobox', { name: 'fromPort' });
        this.LocationTo = page.getByRole('combobox', { name: 'toPort' });
        this.DepartureDay = page.getByRole('combobox', { name: 'departDay' });
        this.DepartureMonthYear = page.getByRole('combobox', { name: 'departMonth' });
        this.ReturnDay = page.getByRole('combobox', { name: 'returnDay' });
        this.ReturnMonthYear = page.getByRole('combobox', { name: 'returnMonth' });
        this.ContinueButton = page.getByRole ('button', { name: 'Continue' });
    }

    async gotoFlightPage() {
        this.page.goto('https://travel.agileway.net/')
    }

    async selectTripType() {
        await this.TripType.selectOption('Return');
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

    async clickContinueButton() {
        await this.ContinueButton.click();
    }
}