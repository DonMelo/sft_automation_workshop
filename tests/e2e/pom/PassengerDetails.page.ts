import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";
import { tripType } from "../data/testData";

export class PassengerDetailsPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly flightInfoSection: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('input[name="passengerFirstName"]');
    this.lastName = page.locator('input[name="passengerLastName"]');

    this.flightInfoSection = page
      .locator("div:not(#container)")
      .filter({ hasText: "Flights" });
  }

  async fillPassengerDetails(firstName: string, lastName: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
  }

  async submitPassengerDetails() {
    await this.nextButton.click();
  }

  async fillAndSubmitPassengerDetails(firstName: string, lastName: string) {
    await this.fillPassengerDetails(firstName, lastName);
    await this.submitPassengerDetails();
  }

  getFlightInfoSection(tripTypeValue: string = tripType.return) {
    const text =
      tripTypeValue === tripType.return ? "Flights (return trip)" : "Flights";
    return this.page.locator("div:not(#container)").filter({ hasText: text });
  }
}
