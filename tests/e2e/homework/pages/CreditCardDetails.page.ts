import { Locator, Page } from "@playwright/test";


export class CreditCardDetailsPage {
    readonly page: Page;
    readonly cardType: Locator;
    readonly cardHolderName: Locator;
    readonly cardNumber: Locator;
    readonly expiryMonth: Locator;
    readonly expiryYear: Locator;
    readonly payNowButton: Locator; 
    readonly bookingNumber: Locator;
    readonly confirmation: Locator;
    readonly loading: Locator;
    readonly confirmationParagraphs: Locator;

    constructor(page: Page){
        this.page = page;
        this.cardType = page.locator('[name = "card_type"]');
        this.cardHolderName = page.locator('[name = "holder_name"]');
        this.cardNumber = page.locator('[name = "card_number"]');
        this.expiryMonth = page.locator('[name = "expiry_month"]');
        this.expiryYear = page.locator('[name = "expiry_year"]');
        this.payNowButton = page.getByRole('button', { name: 'Pay now' });
        this.bookingNumber = page.locator('#booking_number');
        this.confirmation = page.locator('#confirmation h2');
        this.confirmationParagraphs = page.locator('#confirmation p');
        this.loading = page.locator('#loading');
    }

    async checkCardTypeVisa(){
        await this.cardType.first().check();
    }

    async checkCardTypeMaster(){
        await this.cardType.last().check();
    }

    async fillCardHolderName(holderName: string){
        await this.cardHolderName.fill(holderName);
    }

    async fillCardNumber(cardNumber: string){
        await this.cardNumber.fill(cardNumber);
    }

    async chooseExpiryMonth(expiryMonth: string){
        await this.expiryMonth.selectOption({ label: expiryMonth });
    }

    async chooseExpiryYear(expiryYear: string){
        await this.expiryYear.selectOption({ label: expiryYear });
    }

    async clickPayNowButton(){
        await this.payNowButton.click();
    }

    async fillAndSubmitCardDetails(cardNumber: string, expiryMonth: string, expiryYear: string) {
        await this.fillCardNumber(cardNumber);
        await this.chooseExpiryMonth(expiryMonth);
        await this.chooseExpiryYear(expiryYear);
        await this.clickPayNowButton();
    }
}