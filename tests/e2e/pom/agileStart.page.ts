import {expect, Locator, Page} from "@playwright/test"

export class StartPage {
    
    readonly page: Page;
    readonly ContinueButton: Locator;
    readonly FromSelect: Locator;
    readonly ToSelect: Locator;
    readonly DepartingDaySelect: Locator;
    readonly ReturningDaySelect: Locator;
    readonly DepartingMonthYearSelect: Locator;
    readonly ReturningMonthYearSelect: Locator;
    readonly OneWayRadioButton: Locator;
    readonly firstFlightOption: Locator;
    readonly secondFlightOption: Locator;
    readonly thirdFlightOption: Locator;


    constructor(page: Page){
        this.page = page;
        this.ContinueButton = page.locator('[value="Continue"]');
        this.FromSelect = page.locator('[name="fromPort"]');
        this.ToSelect = page.locator('[name="toPort"]');
        this.DepartingDaySelect = page.locator('#departDay');
        this.DepartingMonthYearSelect= page.locator('#departMonth');
        this.ReturningDaySelect = page.locator('#returnDay');
        this.ReturningMonthYearSelect= page.locator('#returnMonth');
        this.OneWayRadioButton = page.locator('[value="oneway"]');
        this.firstFlightOption = page.locator('tr:has(td:has-text("8:00"))').locator("[type='checkbox']");
        this.secondFlightOption = page.locator('tr:has(td:has-text("8:30"))').locator("[type='checkbox']");
        this.thirdFlightOption = page.locator('tr:has(td:has-text("9:00"))').locator("[type='checkbox']");
    }

    async checkSuccessMessage(successMessage: String){
        await expect(this.page.locator("#flash_notice")).toContainText(`${successMessage}`);
    }

    async checkOneWayRadioButton(){
        await this.OneWayRadioButton.check();
    }

    async checkErrorMessage(errorMessage: String){
        await expect(this.page.locator("#flash_alert")).toContainText(`${errorMessage}`);
    }

    async clickContinueButton(){
        await this.ContinueButton.click();
    }

    async selectFromLocation(location: String){
        await this.FromSelect.selectOption({ label: `${location}`});
    }
    async selectToLocation(location: String){
        await this.ToSelect.selectOption({ label: `${location}`});
    }

    async selectDepartureDate(day: String, monthYear: String){
        await this.DepartingDaySelect.selectOption({label: `${day}`})
        await this.DepartingMonthYearSelect.selectOption({label: `${monthYear}`})
    }

    async selectReturnDate(day: String, monthYear: String){
        await this.ReturningDaySelect.selectOption({label: `${day}`})
        await this.ReturningMonthYearSelect.selectOption({label: `${monthYear}`})
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