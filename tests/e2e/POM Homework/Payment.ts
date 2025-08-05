import { type Locator, type Page } from "@playwright/test";

interface PaymentFormData {
    cardType?: string;
    holderName?: string;
    cardNum?: string;
    expMonth?: string;
    expYear?: string;
}

export class Payment {
    readonly page: Page;
    readonly header: Locator;
    readonly cardTypeOptions: Locator;
    readonly cardNumberInput: Locator;
    readonly cardHolderInput: Locator;
    readonly expiryMonthSelect: Locator;
    readonly expiryYearSelect: Locator;
    readonly confirmationMessage: Locator;
    readonly bookingNumber: Locator;
    readonly payNowButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator('h2');
        this.cardTypeOptions = page.locator('input[type="radio"]');
        this.cardNumberInput = page.locator('input[name="card_number"]');
        this.cardHolderInput = page.locator('input[name="holder_name"]');
        this.expiryMonthSelect = page.locator('select[name="expiry_month"]');
        this.expiryYearSelect = page.locator('select[name="expiry_year"]');
        this.confirmationMessage = page.locator('#confirmation h2');
        this.bookingNumber = page.locator('#booking_number');
        this.payNowButton = page.locator('input[type="submit"]');
    }

    async clickPayNowButton(): Promise<void> {
        await this.payNowButton.click();
    }

    async fillPaymentForm(data: PaymentFormData): Promise<void> {
        if (data.cardType) {
        if (data.cardType.toLowerCase() === 'visa') {
            await this.cardTypeOptions.first().check();
        } else {
            await this.cardTypeOptions.last().check();
        }
        }

        if (data.holderName) {
        await this.cardHolderInput.fill(data.holderName);
        }

        if (data.cardNum) {
        await this.cardNumberInput.fill(data.cardNum);
        }

        if (data.expMonth) {
        await this.expiryMonthSelect.selectOption(data.expMonth);
        }

        if (data.expYear) {
        await this.expiryYearSelect.selectOption(data.expYear);
        }

        await this.clickPayNowButton();
    }
}
