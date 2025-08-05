import { Page, expect, Locator, test } from '@playwright/test';
import { vars } from '../others/constants';
import { BasePage } from './BasePage.page';
import { LoginPage } from './Login.page';

export class SelectFlightPage extends BasePage {
    readonly loginPage: LoginPage;

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

    readonly firstFromCity: Locator;
    readonly firstToCity: Locator;
    readonly secondFromCity: Locator;
    readonly secondToCity: Locator;

    constructor(page: Page){
        super(page);
        this.loginPage = new LoginPage(page);
        
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

        this.firstFromCity = page.locator('#container > div:nth-child(4) > b:nth-child(2)');
        this.firstToCity = page.locator('#container > div:nth-child(4) > b:nth-child(3)');
        this.secondFromCity = page.locator('#container > div:nth-child(4) > b:nth-child(5)');
        this.secondToCity = page.locator('#container > div:nth-child(4) > b:nth-child(6)');
    }

    async goto() {
        await this.loginPage.loginWithBaseCredentials();
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

    // Default fillout method for the flight selection
    async filloutDefaultDetails(){
        await this.selectFromAirport(vars.flight_from);
        await this.selectToAirport(vars.flight_to);
        await this.selectDepartDate(vars.depart_day, vars.depart_month);
        await this.selectReturnDate(vars.return_day, vars.return_month);
        await this.selectFlight();
        await this.continueToNextStep();
    }

    async expectAllFieldsVisible() {
        await expect(this.selectFrom).toBeVisible();
        await expect(this.selectTo).toBeVisible();
        await expect(this.selectDepartDay).toBeVisible();
        await expect(this.selectDepartMonth).toBeVisible();
        await expect(this.selectReturnDay).toBeVisible();
        await expect(this.selectReturnMonth).toBeVisible();
        await expect(this.continueButton).toBeVisible();
    }

    async expectFromAirportValue(value: string) {
        await expect(this.selectFrom).toHaveValue(value);
    }

    async expectToAirportValue(value: string) {
        await expect(this.selectTo).toHaveValue(value);
    }

    async expectDepartDateValue(day: string, month: string) {
        await expect(this.selectDepartDay).toHaveValue(day);
        await expect(this.selectDepartMonth).toHaveValue(month);
    }

    async expectReturnDateValue(day: string, month: string) {
        await expect(this.selectReturnDay).toHaveValue(day);
        await expect(this.selectReturnMonth).toHaveValue(month);
    }

    async expectContinueButtonEnabled(enabled: boolean) {
        if (enabled) {
            await expect(this.continueButton).toBeEnabled();
        } else {
            await expect(this.continueButton).toBeDisabled();
        }
    }

    async expectFirstFromCityToContain(text: string){
        await expect(this.firstFromCity).toContainText(text);
    }

    async expectFirstToCityToContain(text: string){
        await expect(this.firstToCity).toContainText(text);
    }

    async expectSecondFromCityToContain(text: string){
        await expect(this.secondFromCity).toContainText(text);
    }

    async expectSecondToCityToContain(text: string){
        await expect(this.secondToCity).toContainText(text);
    }
}