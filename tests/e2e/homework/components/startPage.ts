import {Page, Locator} from '@playwright/test';

export class StartPage {
    readonly page: Page;
    readonly radioButtonReturn: Locator;
    readonly radioButtonOneWay: Locator;
    readonly selectFrom: Locator;
    readonly selectTo: Locator;
    readonly selectDepartDay: Locator;
    readonly selectDepartMonth: Locator;
    readonly selectReturnDay: Locator;
    readonly selectReturnMonth: Locator;
    readonly continueButton: Locator;
    readonly timeRadioButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.radioButtonReturn = page.locator('[value="return"]');
        this.radioButtonOneWay = page.locator('[value="oneway"]');
        this.selectFrom = page.locator('[name="fromPort"]');
        this.selectTo = page.locator('[name="toPort"]');
        this.selectDepartDay = page.locator('#departDay');
        this.selectDepartMonth = page.locator('#departMonth');
        this.selectReturnDay = page.locator('#returnDay');
        this.selectReturnMonth = page.locator('#returnMonth');
        this.continueButton = page.locator('[type="submit"]');
        this.timeRadioButton = page.locator('[type="checkbox"]');
    }

    async returnTrip(from: string, to: string, departDay: string, departMonth: string, returnDay: string, returnMonth: string) {
        await this.selectFrom.selectOption(from);
        await this.selectTo.selectOption(to);
        await this.selectDepartDay.selectOption(departDay);
        await this.selectDepartMonth.selectOption(departMonth);
        await this.selectReturnDay.selectOption(returnDay);
        await this.selectReturnMonth.selectOption(returnMonth);
        await this.timeRadioButton.first().check();
        await this.continueButton.click();
    }

    async oneWayTrip(from: string, to: string, departDay: string, departMonth: string) {
        await this.radioButtonOneWay.check();
        await this.selectFrom.selectOption(from);
        await this.selectTo.selectOption(to);
        await this.selectDepartDay.selectOption(departDay);
        await this.selectDepartMonth.selectOption(departMonth);
        await this.timeRadioButton.first().check();
        await this.continueButton.click();
    }

    async timeNotSelected(from: string, to: string, departDay: string, departMonth: string) {
        await this.radioButtonOneWay.check();
        await this.selectFrom.selectOption(from);
        await this.selectTo.selectOption(to);
        await this.selectDepartDay.selectOption(departDay);
        await this.selectDepartMonth.selectOption(departMonth);
        await this.continueButton.click();
    }
}