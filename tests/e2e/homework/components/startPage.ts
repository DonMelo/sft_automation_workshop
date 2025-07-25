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
    }

    async returnTrip(from: string, to: string, departDay: number, departMonth: number, returnDay: number, returnMonth: number) {
        
    }
}