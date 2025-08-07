import { Locator, Page } from "@playwright/test";

export class PassengerDetailsPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly nextButton: Locator;
  readonly flightInfoText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('input[name="passengerFirstName"]');
    this.lastNameInput = page.locator('input[name="passengerLastName"]');
    this.nextButton = page.getByRole("button", { name: "Next" });
    this.flightInfoText = page.locator("div", {
      hasText: "2025-09-08 New York to Sydney",
    });
  }

  async fillPassengerInfo(firstName, lastName) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.nextButton.click();
  }

  async getFlightSummaryText() {
    return await this.flightInfoText.first().textContent();
  }
}
