import {Locator, Page} from "@playwright/test";

export class PaymentPage {
    readonly page: Page;
    readonly CardType: Locator;
    readonly CardNumber: Locator;
    readonly ExpiryMonth: Locator;
    readonly ExpiryYear: Locator;
    readonly PayNowButton: Locator;

constructor (page: Page) {
    this.page = page;
    this.CardType = page.locator('input[name="card_type"][value="master"]');
    this.CardNumber = page.locator('input[name="card_number"]');
    this.ExpiryMonth = page.locator('select[name="expiry_month"]');
    this.ExpiryYear = page.locator('select[name="expiry_year"]');
    this.PayNowButton = page.locator('input[type="submit"][value="Pay now"]');
}

    async selectCardType() {
        await this.CardType.check();
    }
    async putCardNumber() {
        await this.CardNumber.fill("76543211234567");
    }
    async selectExpiryDate() {
        await this.ExpiryMonth.selectOption('07');
        await this.ExpiryYear.selectOption('2027');
    }
    async clickPayNow() {
        await this.PayNowButton.click();
    }
}