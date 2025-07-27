import {Page, Locator} from "@playwright/test";
import { Login } from "./loginPage";

export class FlightPage {
    readonly login: Login;
    readonly page: Page;
    readonly returnButton: Locator;
    readonly oneWayButton: Locator;
    readonly from: Locator;
    readonly to: Locator;
    readonly departingDay: Locator;
    readonly departingMonthYears: Locator;
    readonly returningDay: Locator;
    readonly returningMonthYear: Locator;
    readonly timeFlightNo: Locator;
    readonly continue: Locator;

constructor (page: Page) {
  this.page = page;
  this.login = new Login(this.page);
  this.returnButton = page.locator('[value="return"]');
  this.oneWayButton = page.locator('[value="oneway"]');
  this.from = page.locator('[name="fromPort"]');
  this.to = page.locator('[name="toPort"]');
  this.departingDay = page.locator('#departDay');
  this.departingMonthYears = page.locator('#departMonth');
  this.returningDay = page.locator('#returnDay');
  this.returningMonthYear = page.locator('#returnMonth');
  this.timeFlightNo = page.locator('[type="checkbox"]');
  this.continue = page.locator('[type="submit"]');
}
async flightSelection(from:string, to:string, departingDay:string, departingMonthYears:string){
    await this.oneWayButton.check();
    await this.from.selectOption(from);
    await this.to.selectOption(to);
    await this.departingDay.selectOption(departingDay);
    await this.departingMonthYears.selectOption(departingMonthYears);
    await this.timeFlightNo.first().check();
    await this.continue.click();
}}