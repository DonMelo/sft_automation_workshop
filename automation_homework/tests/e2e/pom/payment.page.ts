import { Locator, Page } from "@playwright/test";
// https://travel.agileway.net/flights/payment
export class PaymentPage {
    readonly page: Page;
    readonly cardType: Locator;
    readonly cardHolderNameInput: Locator;
    readonly cardNumberInput: Locator;
    readonly expiryMonth: Locator;
    readonly expiryYear: Locator;
    readonly fare: Locator;
    readonly payButton: Locator;

    constructor(page: Page) {
    this.page = page;
    this.cardType = page.getByRole('cell', { name: 'Visa   Master' });
    this.cardHolderNameInput = page.locator('input[name="holder_name"]');
    this.cardNumberInput = page.locator('input[name="card_number"]');
    this.expiryMonth = page.locator('select[name="expiry_month"]');
    this.expiryYear = page.locator('select[name="expiry_year"]');
    this.fare = page.getByText(/^Fare/);
    this.payButton = page.getByRole('button', { name: 'Pay now' });
    }

    async fillPaymentDetails(card: 'visa' | 'master', cardHoldersName: string | null, cardNumber: string, cardExpiryMonth: string, cardExpiryYear: string) {
        await this.page.check(`input[type="radio"][value="${card}"]`);
        await this.cardHolderNameInput.inputValue();
        await this.cardNumberInput.fill(cardNumber);
        await this.expiryMonth.selectOption(cardExpiryMonth);
        await this.expiryYear.selectOption(cardExpiryYear);
        await this.payButton.click();
    }
}