import { Locator, Page } from "@playwright/test";

export class PassengerPage {
  readonly page: Page;
  readonly title: Locator;
  readonly nextButton: Locator;
  readonly firstNameTextBox: Locator;
  readonly lastNameTextBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("h2");
    this.firstNameTextBox = page.locator('input[name="passengerFirstName"]');
    this.lastNameTextBox = page.locator('input[name="passengerLastName"]');
    this.nextButton = page.getByRole("button", { name: "Next" });
  }

  async fillPassengerDetails(firstName: string, lastName: string) {
    await this.firstNameTextBox.fill(firstName);
    await this.lastNameTextBox.fill(lastName);
  }

  async continueToPaymentPage() {
    await this.nextButton.click();
  }
}
