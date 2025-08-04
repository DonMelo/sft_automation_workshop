import { Locator, Page } from "@playwright/test";
import { PaymentDetails } from "e2e-tests/utils/interfaces";

export class PaymentPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cardHolderTextBox: Locator;
  readonly cardNumberTextBox: Locator;
  readonly expiryMonthSelect: Locator;
  readonly expiryYearSelect: Locator;
  readonly payButton: Locator;
  readonly confirmationHeading: Locator;
  readonly failureHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", {
      name: "Pay by Credit Card",
    });
    this.cardHolderTextBox = page.locator("input[name='holder_name']");
    this.cardNumberTextBox = page.locator('input[name="card_number"]');
    this.expiryMonthSelect = page.locator('select[name="expiry_month"]');
    this.expiryYearSelect = page.locator('select[name="expiry_year"]');
    this.payButton = page.getByRole("button", { name: "Pay now" });
    this.confirmationHeading = page.locator("div[id=confirmation] > h2");
    this.failureHeading = page.locator("div[id=confirmation] > h2.error");
  }

  async goTo() {
    await this.page.goto("https://travel.agileway.net/flights/passenger");
  }

  async clickPayButton() {
    await this.payButton.click();
  }

  async fillPaymentDetails({
    type,
    name,
    number,
    expiryMonth,
    expiryYear,
  }: PaymentDetails) {
    await this.page.locator(`input[value=${type}]`).check();
    await this.cardHolderTextBox.fill(name);
    await this.cardNumberTextBox.fill(number);
    await this.expiryMonthSelect.selectOption(expiryMonth);
    await this.expiryYearSelect.selectOption(expiryYear);
  }

  async confirmationIsVisible() {
    await this.confirmationHeading.waitFor();
    return await this.confirmationHeading.isVisible();
  }
}
