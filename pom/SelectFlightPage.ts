import { Locator, Page } from "@playwright/test";

export class SelectFlightPage {
  readonly page: Page;
  readonly fromSelect: Locator;
  readonly toSelect: Locator;
  readonly departMonth: Locator;
  readonly returnDay: Locator;
  readonly returnMonth: Locator;
  readonly continueButton: Locator;
  departDay: any;

  constructor(page: Page) {
    this.page = page;
    this.fromSelect = page.locator('select[name="fromPort"]');
    this.toSelect = page.locator('select[name="toPort"]');
    this.departDay = page.locator("#departDay");
    this.departMonth = page.locator("#departMonth");
    this.returnDay = page.locator("#returnDay");
    this.returnMonth = page.locator("#returnMonth");
    this.continueButton = page.getByRole("button", { name: "Continue" });
  }

  async goTo() {
    await this.page.goto("https://travel.agileway.net/flights/start");
  }

  async fillFlightDetails() {
    await this.fromSelect.selectOption("New York");
    await this.toSelect.selectOption("Sydney");
    await this.departDay.selectOption("08");
    await this.departMonth.selectOption("092025");
    await this.returnDay.selectOption("08");
    await this.returnMonth.selectOption("112025");
  }

  async selectFlights(flightNames) {
    for (const name of flightNames) {
      const row = this.page.getByRole("row", { name });
      await row.getByRole("checkbox").check();
    }
  }

  async continue() {
    await this.continueButton.click();
  }
}
