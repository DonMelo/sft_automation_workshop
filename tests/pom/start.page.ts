import { Locator, Page } from "@playwright/test";

export class StartPage {
    readonly page: Page;
    readonly tripType: Locator;
    readonly returnTripRadio: Locator;
    readonly oneWayTripRadio: Locator;
    readonly fromPort: Locator;
    readonly toPort: Locator;
    readonly departDay: Locator;
    readonly departMonth: Locator;
    readonly returnDay: Locator;
    readonly returnMonth: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tripType = page.locator(`input[type="radio"][value="${this.tripType}"]`);
        this.returnTripRadio = page.locator('input[type="radio"][value="return"]');
        this.oneWayTripRadio = page.locator('input[type="radio"][value="oneway"]');
        this.fromPort = page.locator('select[name="fromPort"]');
        this.toPort = page.locator('select[name="toPort"]');
        this.departDay = page.locator('#departDay');
        this.departMonth = page.locator('#departMonth');
        this.returnDay = page.locator('#returnDay');
        this.returnMonth = page.locator('#returnMonth');
        this.logoutButton = page.getByRole('link', { name: 'Sign off (agileway)' });
    }

    async goTo() {
        await this.page.goto('https://travel.agileway.net/flights/start');
    }

    async selectTripType(type: 'return' | 'oneway') {
        await this.page.check(`input[type="radio"][value="${type}"]`);
    }

    async fillTripDetails(type: 'return' | 'oneway', from: string, to: string, departDay: string, departMonth: string, returnDay?: string, returnMonth?: string) {
        await this.page.check(`input[type="radio"][value="${type}"]`);
        await this.fromPort.selectOption(from);
        await this.toPort.selectOption(to);
        await this.departDay.selectOption(departDay);
        await this.departMonth.selectOption(departMonth);
        if (type === 'return') {
        await this.returnDay?.selectOption(returnDay!);
        await this.returnMonth?.selectOption(returnMonth!);
        }
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

}