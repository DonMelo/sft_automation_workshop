import { Page, expect, Locator, test } from '@playwright/test';
import { LoginPage } from './Login.page';
import { vars } from '../others/constants';

export class SelectFlightPage {
    readonly page: Page;
    readonly Loginpage: LoginPage;

    // Buttons and Inputs locators
    readonly tripTypeButtonReturn: Locator;
    readonly tripTypeButtonOneWay: Locator;

    readonly selectFrom: Locator;
    readonly selectTo: Locator;

    readonly selectDepartDay: Locator;
    readonly selectDepartMonth: Locator;

    readonly selectReturnDay: Locator;
    readonly selectReturnMonth: Locator;

    readonly continueButton: Locator;
    readonly selectFlightButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.Loginpage = new LoginPage(page);
        
        this.tripTypeButtonReturn = page.locator('[value="return"]');
        this.tripTypeButtonOneWay = page.locator('[value="oneway"]');
        this.selectFrom = page.locator('[name="fromPort"]');
        this.selectTo = page.locator('[name="toPort"]');
        this.selectDepartDay = page.locator('#departDay');
        this.selectDepartMonth = page.locator('#departMonth');
        this.selectReturnDay = page.locator('#returnDay');
        this.selectReturnMonth = page.locator('#returnMonth');
        this.continueButton = page.locator('[type="submit"]');
        this.selectFlightButton = page.locator('[type="checkbox"]');
    }

    async goto() {
        await this.Loginpage.goto();
        await this.Loginpage.enterUsername(vars.correct_username);
        await this.Loginpage.enterPassword(vars.correct_password);
        await this.Loginpage.submitSignIn();
    }

    async selectTripType(type: 'return' | 'oneway') {
        if (type === 'return') {
            await this.tripTypeButtonReturn.check();
        } else {
            await this.tripTypeButtonOneWay.check();
        }
    }

    async selectFromAirport(airport: string) {
        await this.selectFrom.selectOption(airport);
    }

    async selectToAirport(airport: string) {
        await this.selectTo.selectOption(airport);
    }

    async selectDepartDate(day: string, month: string) {
        await this.selectDepartDay.selectOption(day);
        await this.selectDepartMonth.selectOption(month);
    }

    async selectReturnDate(day: string, month: string) {
        await this.selectReturnDay.selectOption(day);
        await this.selectReturnMonth.selectOption(month);
    }

    async continueToNextStep() {
        await this.continueButton.click();
    }

    async selectFlight() {
        await this.selectFlightButton.first().check();
    }
}