import {Page, Locator} from '@playwright/test';

export class PaymentPage {
    readonly page: Page;
    readonly cardVisa: Locator;
    readonly cardMaster: Locator;
    readonly cardHolderName: Locator;
    readonly cardNumber: Locator;
    readonly expiryMonth: Locator;
    readonly expiryYear: Locator;
    readonly payNowButton: Locator;
    readonly bookingNumber: Locator;
    readonly confirmation: Locator;
    readonly tripDetails: Locator;
    readonly passengerDetails: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cardVisa = page.locator('[value="visa"]');
        this.cardMaster = page.locator('[value="master"]');
        this.cardHolderName = page.locator('[name="holder_name"]');
        this.cardNumber = page.locator('[name="card_number"]');
        this.expiryMonth = page.locator('[name="expiry_month"]');
        this.expiryYear = page.locator('[name="expiry_year"]');
        this.payNowButton = page.locator('[type="submit"]');
        this.confirmation = page.locator('div#confirmation');
        this.bookingNumber = page.locator('#booking_number');
        this.tripDetails = page.locator('i');
        this.passengerDetails = page.locator('label');
    }

    async fillPaymentForm(name: string, cardNr: string, month: string, year: string) {
        await this.cardVisa.check();
        await this.cardHolderName.fill(name);
        await this.cardNumber.fill(cardNr);
        await this.expiryMonth.selectOption(month);
        await this.expiryYear.selectOption(year);
        await this.payNowButton.click();
    }   

    async paymentFormWithoutCardType(name: string, cardNr: string, month: string, year: string) {
        await this.cardHolderName.fill(name);
        await this.cardNumber.fill(cardNr);
        await this.expiryMonth.selectOption(month);
        await this.expiryYear.selectOption(year);
        await this.payNowButton.click();
    }  
}