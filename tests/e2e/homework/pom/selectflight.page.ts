import {Page, Locator} from '@playwright/test';

export class SelectFlightPage {
    readonly page: Page;
    readonly returnRadio: Locator;
    readonly onewayRadio: Locator;
    readonly fromCity: Locator;
    readonly toCity: Locator;
    readonly departMonth: Locator;
    readonly departDay: Locator;
    readonly returnMonth: Locator;
    readonly returnDay: Locator;
    readonly flightsTable: Locator;
    readonly continueButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.returnRadio = page.locator('input[type="radio"][name="tripType"][value="return"]');
        this.onewayRadio = page.locator('input[type="radio"][name="tripType"][value="oneway"]');
        this.fromCity = page.locator('select[name=fromPort]');
        this.toCity = page.locator('select[name=toPort]');
        this.departMonth = page.locator('select[name=departMonth]');
        this.departDay = page.locator('select[name=departDay]');
        this.returnMonth = page.locator('select[name=returnMonth]');
        this.returnDay = page.locator('select[name=returnDay]');
        this.flightsTable = page.getByTestId('flights');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }
    async goToPage() {
        await this.page.goto('https://travel.agileway.net/flights/start');
    }

    async selectTripType(type: string) {
        if (type == 'Return') {
            await this.returnRadio.check();
        }
        else if (type == 'One way') {
            await this.onewayRadio.check();
        }
    }
    async selectFromCity(city: string) {
        await this.fromCity.selectOption(city);
    }
    async selectToCity(city: string) {
        await this.toCity.selectOption(city);
    }
    async selectDepartDate(day: string, month: string) {
        await this.departDay.selectOption(day);
        await this.departMonth.selectOption(month);
    }
    async selectReturnDate(day: string, month: string) {
        await this.returnDay.selectOption(day);
        await this.returnMonth.selectOption(month);
    }
    async selectFlight(index: number){
        const checkbox = this.flightsTable.getByRole('checkbox').nth(index);
        await checkbox.check;
    }
    async pressContinueButton() {
        await this.continueButton.click();
    }
}