import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";

export class SearchPage extends BasePage {
  readonly tripType: Locator;
  readonly fromSelect: Locator;
  readonly toSelect: Locator;
  readonly departingDay: Locator;
  readonly departingMonthYear: Locator;
  readonly returningDay: Locator;
  readonly returningMonthYear: Locator;
  readonly flightOptions: Locator;

  constructor(page: Page) {
    super(page);
    this.tripType = page.locator('input[name="tripType"]');
    this.fromSelect = page.locator('select[name="fromPort"]');
    this.toSelect = page.locator('select[name="toPort"]');
    this.departingDay = page.locator("#departDay");
    this.departingMonthYear = page.locator("#departMonth");
    this.returningDay = page.locator("#returnDay");
    this.returningMonthYear = page.locator("#returnMonth");
    this.flightOptions = page.locator('input[type="checkbox"]');
  }

  async selectTripType(type: string) {
    const radio = this.page.locator(`input[name="tripType"][value="${type}"]`);
    await radio.check();
  }

  async setFromTo(from: string, to: string) {
    await this.fromSelect.selectOption(from);
    await this.toSelect.selectOption(to);
  }

  async setTo(to: string) {
    await this.toSelect.selectOption(to);
  }

  async setDate(day: string, monthYear: string) {
    await this.departingDay.selectOption(day);
    await this.departingMonthYear.selectOption(monthYear);
  }

  async submitSearch() {
    await this.nextButton.click();
  }

  async selectFlightOption(number: number) {
    await this.flightOptions.nth(number).check();
  }
}
