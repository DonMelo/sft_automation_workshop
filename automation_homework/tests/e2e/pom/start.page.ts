import { expect, Locator, Page } from "@playwright/test";  
// https://travel.agileway.net/flights/start
export class StartPage {
    readonly page: Page;
    readonly continueButton: Locator;
    readonly tripType: Locator;
    readonly tripTypeOneWay: Locator;
    readonly tripTypeRoundTrip: Locator;
    readonly fromInput: Locator;
    readonly toInput: Locator;
    readonly departDay: Locator;
    readonly departMonth: Locator;
    readonly returnDay: Locator;
    readonly returnMonth: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.tripType = page.getByRole('radio');
        this.tripTypeOneWay = page.locator('input[type="radio"][value="oneway"]');
        this.tripTypeRoundTrip = page.locator('input[type="radio"][value="return"]');
        this.fromInput = page.locator('select[name="fromPort"]');
        this.toInput = page.locator('select[name="toPort"]');
        this.departDay = page.locator('#departDay');
        this.departMonth = page.locator('#departMonth');
        this.returnDay = page.locator('#returnDay');      
        this.returnMonth = page.locator('#returnMonth');
    }

    async goto() {
        await this.page.goto('https://travel.agileway.net/flights/start');
    }

    async searchFlights(type: 'return' | 'oneway', from: string, to: string, departDay: string, departMonth: string, returnDay?: string, returnMonth?: string) {
        await this.page.check(`input[type="radio"][value="${type}"]`);
        await this.fromInput.selectOption(from);
        await this.toInput.selectOption(to);
        await this.departDay.selectOption(departDay);
        await this.departMonth.selectOption(departMonth);
        if (returnDay && returnMonth) {
            await this.returnDay.selectOption(returnDay);
            await this.returnMonth.selectOption(returnMonth);
        }
        await this.continueButton.click();
    }
}
