import {Page, Locator} from "@playwright/test";

export class FlightPage {
    readonly page: Page;
    readonly returnButton: Locator;
    readonly oneWayButton: Locator;
    readonly from: Locator;
    readonly to: Locator;
    readonly departingDay: Locator;
    readonly departingMonthYears: Locator;
    readonly returningDay: Locator;
    readonly returningMonthYear: Locator;

constructor (page: Page) {
  this.page = page;
  this.returnButton = page.locator('[value="return"]');
  this.oneWayButton = page.locator('[value="oneway"]');
  this.from = page.locator('[name="fromPort"]');
  this.to
}

}