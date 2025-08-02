import { expect, Locator, Page } from "@playwright/test";

export class FlightPage{
    readonly page: Page;
    readonly flashNotice: Locator;
    readonly oneWayTripRadio: Locator;
    readonly returnTripRadio: Locator;
    readonly departureDay: Locator;
    readonly departureMonth: Locator;
    readonly returnDay: Locator;
    readonly returnMonth: Locator;
    readonly flightCheckboxes: Locator;
    readonly fromPortSelect: Locator;
    readonly toPortSelect: Locator;
    readonly continueButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.flashNotice = page.locator('#flash_notice');
        this.oneWayTripRadio = page.locator('input[type="radio"][name="tripType"][value="oneway"]');
        this.returnTripRadio = page.locator('input[type="radio"][name="tripType"][value="return"]');
        this.departureDay = page.locator('#departDay');
        this.departureMonth = page.locator('#departMonth');
        this.returnDay = page.locator('#returnDay');
        this.returnMonth = page.locator('#returnMonth');
        this.flightCheckboxes = page.locator('#flights input[type="checkbox"]');
        this.fromPortSelect = page.locator('select[name="fromPort"]');
        this.toPortSelect = page.locator('select[name="toPort"]');
        this.continueButton = page.getByRole("button", { name: "Continue" });
    }

    async expectSuccessMessage(message: string){
        await expect(this.flashNotice).toHaveText(message);
        await expect(this.flashNotice).toBeVisible();
    }

    async selectOneWayTrip(){
        await this.oneWayTripRadio.click();
    }

    async selectFromPort(city: string){
        await this.fromPortSelect.selectOption(city);
    }

    async selectToPort(city: string){
        await this.toPortSelect.selectOption(city);
    }

    async selectDepartureDate(deDay: string, deMonth: string){
        await this.departureDay.selectOption(deDay);
        await this.departureMonth.selectOption(deMonth);
    }

    async selectReturnDate(reDay: string, reMonth: string){
        await this.returnDay.selectOption(reDay);
        await this.returnMonth.selectOption(reMonth);
    }

    async selectFlightByIndex(index: number){
        await this.flightCheckboxes.nth(index).check();
    }

    async clickContinue(){
        await this.continueButton.click();
    }
}