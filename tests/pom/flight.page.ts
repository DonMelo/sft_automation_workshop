import { Locator, Page } from "@playwright/test";

export class FlightPage {
  readonly page: Page;
  readonly title: Locator;
  readonly continueButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("h2");
    this.continueButton = page.locator("input[value='Continue']");
  }

  async continueToPassengerPage() {
    await this.continueButton.click();
  }
}
