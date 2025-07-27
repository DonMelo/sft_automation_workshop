import { Page, Locator } from '@playwright/test';

export class SearchPage {
    readonly page: Page;
    readonly tripType: Locator;
    readonly fromSelect: Locator;
    readonly toSelect: Locator;
    readonly departingDay: Locator;
    readonly departingMonthYear: Locator;
    readonly returningDay: Locator;
    readonly returningMonthYear: Locator;
    readonly submitButton: Locator;
    readonly flightOptions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tripType = page.locator('input[name="tripType"]');
        this.fromSelect = page.locator('select[name="fromPort"]');
        this.toSelect = page.locator('select[name="toPort"]');
        this.departingDay = page.locator('#departDay');
        this.departingMonthYear = page.locator('#departMonth');
        this.returningDay = page.locator('#returnDay');
        this.returningMonthYear = page.locator('#returnMonth');
        this.submitButton = page.locator('input[type="submit"]');
        this.flightOptions = page.locator('input[type="checkbox"]');
    }

    async selectTripType(type: 'oneway' | 'return') {
        const radio = this.page.locator(`input[name="tripType"][value="${type}"]`);
        await radio.check();
    }

    async setFromTo(from: string, to: string) {
        await this.fromSelect.selectOption(from);
        await this.toSelect.selectOption(to);
    }

    async setDepartureDate(day: string, monthYear: string) {
        await this.departingDay.selectOption(day);
        await this.departingMonthYear.selectOption(monthYear);
    }

    async setReturnDate(day: string, monthYear: string) {
        await this.returningDay.selectOption(day);
        await this.returningMonthYear.selectOption(monthYear);
    }

    async submitSearch() {
        await this.submitButton.click();
    }

    async selectFirstFlightOption() {
        await this.flightOptions.first().check();
    }
}