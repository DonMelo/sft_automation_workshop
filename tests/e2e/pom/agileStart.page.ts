import {expect, Locator, Page} from "@playwright/test"

export class StartPage {
    
    readonly page: Page;
    readonly continueButton: Locator;
    readonly fromSelect: Locator;
    readonly toSelect: Locator;
    readonly departingDaySelect: Locator;
    readonly returningDaySelect: Locator;
    readonly departingMonthYearSelect: Locator;
    readonly returningMonthYearSelect: Locator;
    readonly oneWayRadioButton: Locator;
    readonly firstFlightOption: Locator;
    readonly secondFlightOption: Locator;
    readonly thirdFlightOption: Locator;


    constructor(page: Page){
        this.page = page;
        this.continueButton = page.locator('[value="Continue"]');
        this.fromSelect = page.locator('[name="fromPort"]');
        this.toSelect = page.locator('[name="toPort"]');
        this.departingDaySelect = page.locator('#departDay');
        this.departingMonthYearSelect= page.locator('#departMonth');
        this.returningDaySelect = page.locator('#returnDay');
        this.returningMonthYearSelect= page.locator('#returnMonth');
        this.oneWayRadioButton = page.locator('[value="oneway"]');
        this.firstFlightOption = page.locator('tr:has(td:has-text("8:00"))').locator("[type='checkbox']");
        this.secondFlightOption = page.locator('tr:has(td:has-text("8:30"))').locator("[type='checkbox']");
        this.thirdFlightOption = page.locator('tr:has(td:has-text("9:00"))').locator("[type='checkbox']");
    }

    async checkSuccessMessage(successMessage: string){
        await expect(this.page.locator("#flash_notice")).toContainText(successMessage);
    }

    async checkOneWayRadioButton(){
        await this.oneWayRadioButton.check();
    }

    async checkErrorMessage(errorMessage: string){
        await expect(this.page.locator("#flash_alert")).toContainText(errorMessage);
    }

    async clickContinueButton(){
        await this.continueButton.click();
    }

    async selectFromLocation(location: string){
        await this.fromSelect.selectOption({ label: location});
    }
    async selectToLocation(location: string){
        await this.toSelect.selectOption({ label: location});
    }

    async selectDepartureDate(day: string, monthYear: string){
        await this.departingDaySelect.selectOption({label: day})
        await this.departingMonthYearSelect.selectOption({label: monthYear})
    }

    async selectReturnDate(day: string, monthYear: string){
        await this.returningDaySelect.selectOption({label: day})
        await this.returningMonthYearSelect.selectOption({label: monthYear})
    }
    async checkFirstFlight(){
        await this.firstFlightOption.check();
    }
    async checkSecondFlight(){
        await this.secondFlightOption.check();
    }
    async checkThirdFlight(){
        await this.thirdFlightOption.check();
    }


}