import { Page, Locator } from '@playwright/test';

export class PaymentPage{
    readonly page:Page;
    readonly cardNumber:Locator;
    readonly expiryMonth:Locator;
    readonly expiryYear:Locator;
    readonly payNow:Locator;
    readonly cardType:Locator;

    constructor(page:Page){
        this.page = page;
        this.cardType = page.getByRole('radio');
        this.cardNumber = page.locator('input[name="card_number"]');
        this.expiryMonth = page.locator('select[name="expiry_month"]');
        this.expiryYear = page.locator('select[name="expiry_year"]');
        this.payNow = page.getByRole("button", { name: "Pay now" });
    }

    async paymentInfo(cardType: number, cardNumber: string, expiryMonth: string, expiryYear: string){
        await this.cardType.nth(cardType).check();
        await this.cardNumber.fill(cardNumber);
        await this.expiryMonth.selectOption(expiryMonth);
        await this.expiryYear.selectOption(expiryYear);
        await this.payNow.click();
    }

}