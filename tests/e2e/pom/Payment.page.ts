import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";

export class PaymentPage extends BasePage {
  readonly fare: Locator;
  readonly cardHolderName: Locator;
  readonly cardNumber: Locator;
  readonly expiryMonth: Locator;
  readonly expiryYear: Locator;
  readonly payButton: Locator;
  readonly bookingNumber: Locator;
  readonly flightConfirmation: Locator;
  readonly passengerDetails: Locator;
  readonly paymentForm: Locator;
  readonly confirmationSection: Locator;
  readonly cardTypeRadio: (cardType: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.fare = page.getByText("Fare", { exact: false });
    this.cardHolderName = page.locator('input[name="holder_name"]');
    this.cardNumber = page.locator('input[name="card_number"]');
    this.expiryMonth = page.locator('select[name="expiry_month"]');
    this.expiryYear = page.locator('select[name="expiry_year"]');
    this.payButton = page.locator('input[value="Pay now"]');
    this.bookingNumber = page.locator("text=Booking number:");
    this.flightConfirmation = page.locator("text=Flights (return Trip)");
    this.passengerDetails = page.locator("text=Passenger Details:");
    this.paymentForm = page.locator("text=Pay by Credit Card");
    this.confirmationSection = page.locator("text=Confirmation");
    this.cardTypeRadio = (cardType: string) =>
      this.page.locator(`input[name="card_type"][value="${cardType}"]`);
  }

  async selectCardType(cardType: string) {
    await this.cardTypeRadio(cardType).check();
  }

  async fillCardHolderName(name: string) {
    await this.cardHolderName.fill(name);
  }

  async fillCardNumber(number: string) {
    await this.cardNumber.fill(number);
  }

  async selectExpiryMonth(month: string) {
    await this.expiryMonth.selectOption(month);
  }

  async selectExpiryYear(year: string) {
    await this.expiryYear.selectOption(year);
  }

  async submitPayment() {
    await this.payButton.click();
  }
}
