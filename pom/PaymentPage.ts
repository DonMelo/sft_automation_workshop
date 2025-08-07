import { Page, expect } from "@playwright/test";

export class PaymentPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectCardType(type) {
    const radio = this.page.locator(`input[name="card_type"][value="${type}"]`);
    await expect(radio).toBeVisible(); // Wait until it's visible
    await radio.check();
  }

  async fillCardDetails(cardNumber, month, year) {
    await this.page.locator('input[name="card_number"]').fill(cardNumber);
    await this.page.locator('select[name="expiry_month"]').selectOption(month);
    await this.page.locator('select[name="expiry_year"]').selectOption(year);
  }

  async submitPayment() {
    await this.page.getByRole("button", { name: "Pay now" }).click();
  }

  async verifyConfirmationVisible() {
    await expect(this.page.getByText("Confirmation")).toBeVisible();
  }

  async verifyPassengerName(name) {
    await expect(
      this.page.getByText(`Passenger Details: ${name}`)
    ).toBeVisible();
  }

  async verifyFlight(departure, returnTrip) {
    await expect(this.page.getByText(departure)).toBeVisible();
    await expect(this.page.getByText(returnTrip)).toBeVisible();
  }
}
