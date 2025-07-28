import { Locator, Page } from "@playwright/test";

export class PaymentPage {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly cardTypeRadio: Locator;
  readonly cardHolderTextBox: Locator;
  readonly cardNumberTextBox: Locator;
  readonly expiryMonthSelect: Locator;
  readonly expiryYearSelect: Locator;
  readonly payButton: Locator;
  readonly confirmationHeading: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByRole("heading", {
      name: "Pay by Credit Card",
    });
    this.cardTypeRadio = page.getByRole("radio");
    this.cardHolderTextBox = page.locator("input[name='holder_name']");
    this.cardNumberTextBox = page.locator('input[name="card_number"]');
    this.expiryMonthSelect = page.locator('select[name="expiry_month"]');
    this.expiryYearSelect = page.locator('select[name="expiry_year"]');
    this.payButton = page.getByRole("button", { name: "Pay now" });
    this.confirmationHeading = page.getByRole("heading", {
      name: "Confirmation",
    });
    this.errorMessage = page.getByText("Invalid data");
  }

  async goTo() {
    await this.page.goto("https://travel.agileway.net/flights/passenger");
  }

  async assertOnPage() {
    await this.page.waitForURL("https://travel.agileway.net/flights/passenger");
    await this.pageHeading.isVisible();
  }

  async checkCardType(n: number) {
    await this.cardTypeRadio.nth(n).check();
  }

  async fillCardHolder(name: string) {
    await this.cardHolderTextBox.click();
    await this.cardHolderTextBox.fill(name);
  }

  async fillCardNumber(number: string) {
    await this.cardNumberTextBox.click();
    await this.cardNumberTextBox.fill(number);
  }

  async selectExpiryMonth(month: string) {
    await this.expiryMonthSelect.selectOption(month);
  }

  async selectExpiryYear(year: string) {
    await this.expiryYearSelect.selectOption(year);
  }

  async clickPayButton() {
    await this.payButton.click();
  }

  async confirmationIsVisible() {
    await this.confirmationHeading.waitFor({
      state: "visible",
      timeout: 10000,
    });
    return await this.confirmationHeading.isVisible();
  }

  async errorMessageIsVisible() {
    await this.errorMessage.waitFor({
      state: "visible",
      timeout: 10000,
    });
    return await this.errorMessage.isVisible();
  }
}

module.exports = { PaymentPage };
