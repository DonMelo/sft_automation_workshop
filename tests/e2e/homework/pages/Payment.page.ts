import { Page, expect, Locator, test } from '@playwright/test';
import { vars } from '../others/constants';
import { PassengerPage } from './PassengerDetails.page';

export class PaymentPage {
    readonly page: Page;
    readonly PassengerPage: PassengerPage;

    readonly cardType: Locator;
    readonly cardHolderName: Locator;
    readonly cardNumber: Locator;
    readonly expiryMonth: Locator;
    readonly expiryYear: Locator;
    readonly payNowButton: Locator;
    readonly confirmation: Locator;



    constructor(page: Page){
        this.page = page;
        this.PassengerPage = new PassengerPage(page);

        this.cardType = page.locator('[name="card_type"]');
        this.cardHolderName = page.locator('[name="holder_name"]');
        this.cardNumber = page.locator('[name="card_number"]');
        this.expiryMonth = page.locator('[name="expiry_month"]');
        this.expiryYear = page.locator('[name="expiry_year"]');
        this.payNowButton = page.locator('[type="submit"]');
        this.confirmation = page.locator('div#confirmation');
    }

    async goto() {
        await this.PassengerPage.goto();
        await this.PassengerPage.filloutDetailsDefault();
        await this.PassengerPage.submitPassengerDetails();
    }

    async selectCardType() {
        await this.cardType.first().check();
    }

    async enterCardHolderName(name: string) {
        await this.cardHolderName.fill(name);
    }

    async enterCardNumber(number: string) {
        await this.cardNumber.fill(number);
    }

    async enterExpiryMonth(month: string) {
        await this.expiryMonth.selectOption(month);
    }

    async enterExpiryYear(year: string) {
        await this.expiryYear.selectOption(year);
    }

    async submitPayment() {
        await this.payNowButton.click();
    }
}