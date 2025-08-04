import { Page, Locator } from '@playwright/test';

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

    async goTo() {
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

    async selectDepartDay(day: string) {
    const formattedDay = day.padStart(2, '1');
    await this.departDay.selectOption(formattedDay);
    }


    async selectDepartMonth(month: string) {
        await this.departMonth.selectOption(month);
    }

    async selectReturnDay(day: string) {
        await this.returnDay.selectOption(day);
    }

    async selectReturnMonth(month: string) {
        await this.returnMonth.selectOption(month);
    }

    async selectFlight(index: number = 0) {
    await this.page.waitForSelector('input[type="checkbox"]', { timeout: 10000 });
    const flightOptions = this.page.locator('input[type="checkbox"]').first();
    const count = await flightOptions.count();

    if (count === 0) {
        throw new Error('No flight options available to select.');
    }

    // if (index >= count) {
    //     throw new Error(`Flight option index ${index} is out of range. Only ${count} options available.`);
    // }

    await flightOptions.check();
    }

    
    async pressContinueButton() {
        await this.continueButton.click();
    }
}