import { expect, Locator, Page } from "@playwright/test";

export class PaymentPage {
    readonly page: Page;
    readonly cardType: Locator;
    readonly cardHoldersName: Locator;
    readonly cardNumber: Locator;
    readonly cardExpiryMonth: Locator;
    readonly cardExpiryYear: Locator;
    readonly fare: Locator;
    readonly payNowButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cardType = page.getByRole('cell', { name: 'Visa   Master' });
        this.cardHoldersName = page.locator('input[name="holder_name"]');
        this.cardNumber = page.locator('input[name="card_number"]');
        this.cardExpiryMonth = page.locator('select[name="expiry_month"]');
        this.cardExpiryYear = page.locator('select[name="expiry_year"]');
        this.fare = page.getByText(/^Fare/);
        this.payNowButton = page.getByRole('button', { name: 'Pay now' });
    }

    async fillPaymentInfo(card: 'visa' | 'master', cardHoldersName: string | null, cardNumber: string, cardExpiryMonth: string, cardExpiryYear: string) {
        await this.page.check(`input[type="radio"][value="${card}"]`);
        await this.cardHoldersName.inputValue();
        await this.cardNumber.fill(cardNumber);
        await this.cardExpiryMonth.selectOption(cardExpiryMonth);
        await this.cardExpiryYear.selectOption(cardExpiryYear);
        await this.payNowButton.click();
    }
}