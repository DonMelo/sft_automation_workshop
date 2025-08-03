import { expect, type Locator, type Page } from "@playwright/test";
    interface FlightFormData {
    selector: string;
    fromPort?: string;
    toPort?: string;
    monthYearDepart?: string;
    monthYearReturn?: string;
    dayDepart?: string;
    dayReturn?: string;
    checkboxes?: {
        firstCheck?: boolean;
        secondCheck?: boolean;
        thirdCheck?: boolean;
    };
    }
export class flight{
    readonly tripType : Locator;
    readonly submitButton : Locator;
    readonly fromPort : Locator;
    readonly toPort : Locator;
    readonly departingDay : Locator;
    readonly departingMonth : Locator;
    readonly returningDay : Locator;
    readonly returningMonth : Locator;
    readonly firstCheck : Locator;
    readonly secondCheck : Locator;
    readonly thirdCheck : Locator;
    constructor(page : Page){
        this.tripType = page.locator('td input[name=tripType]');
        this.submitButton = page.locator('input[type=submit]');
        this.fromPort = page.locator('select[name$="fromPort"]');
        this.toPort = page.locator('select[name$="toPort"]');
        this.departingDay = page.locator('#departDay');
        this.departingMonth = page.locator('#departMonth');
        this.returningDay = page.locator('#returnDay');
        this.returningMonth = page.locator('#returnMonth');
        this.firstCheck = page.locator('input[type=checkbox]').nth(0);
        this.secondCheck = page.locator('input[type=checkbox]').nth(1);
        this.thirdCheck = page.locator('input[type=checkbox]').nth(2);
    }
    async submit(){
        await this.submitButton.click();
    }
    async getTripTypeValue(locator : Locator){
        return await locator.getAttribute('value');
    }
    async fillFromDropDown(dropDownSelection : string){
        const dropDown = this.fromPort;
        await dropDown.waitFor();
        await dropDown.selectOption(dropDownSelection)
    }
    async fillToDropDown(dropDownSelection : string){
        const dropDown = this.toPort;
        await dropDown.waitFor();
        await dropDown.selectOption(dropDownSelection)
    }
    async selectDepartMonthYear(value : string){
        const dropDown = this.departingMonth;
        await dropDown.waitFor();
        await dropDown.selectOption(value);
    }
    async selectReturnMonthYear(value : string){
        const dropDown = this.returningMonth;
        await dropDown.waitFor();
        await dropDown.selectOption(value);
    }
    async selectDepartDay(value : string){
        const dropDown = this.departingDay;
        await dropDown.waitFor();
        await dropDown.selectOption(value);
    }
    async selectReturnDay(value : string){
        const dropDown = this.returningDay;
        await dropDown.waitFor();
        await dropDown.selectOption(value);
    }
    async fillOutTheForm(data: FlightFormData){
        let tripTypeLocator: Locator;
            if (data.selector === 'first') {
                tripTypeLocator = this.tripType.first();
            }
            else {
                tripTypeLocator = this.tripType.last();
            }
            await tripTypeLocator.check();
            const tripTypeValue = await this.getTripTypeValue(tripTypeLocator);
            if (data.fromPort) {
                await this.fillFromDropDown(data.fromPort);
            }
            if (data.toPort) {
                await this.fillToDropDown(data.toPort);
            }
            if (data.monthYearDepart) {
                await this.selectDepartMonthYear(data.monthYearDepart);
            }
            if (data.dayDepart) {
                await this.selectDepartDay(data.dayDepart);
            }
            if (data.monthYearReturn) {
                await this.selectReturnMonthYear(data.monthYearReturn);
            }
            if (data.dayReturn) {
                await this.selectReturnDay(data.dayReturn);
            }
            const checkboxes = data.checkboxes || {};
            if (checkboxes.firstCheck !== undefined) {
                checkboxes.firstCheck
                    ? await this.firstCheck.check()
                    : await this.firstCheck.uncheck();
            }
            if (checkboxes.secondCheck !== undefined) {
                checkboxes.secondCheck
                    ? await this.secondCheck.check()
                    : await this.secondCheck.uncheck();
            }
            if (checkboxes.thirdCheck !== undefined) {
                checkboxes.thirdCheck
                    ? await this.thirdCheck.check()
                    : await this.thirdCheck.uncheck();
            }
            await this.submit();
            return tripTypeValue;
    }

}