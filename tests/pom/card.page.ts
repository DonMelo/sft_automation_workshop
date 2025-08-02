import { Locator, Page } from '@playwright/test'

export class CardPage{
    readonly page: Page;
    readonly signOffLink: Locator;
    readonly cardType: Locator;
    readonly cardHolderName: Locator;
    readonly cardNumber: Locator;
    readonly expiryMonth: Locator;
    readonly expiryYear: Locator;
    readonly payButton: Locator;
    readonly bookingNumber: Locator;

    constructor(page: Page){
        this.page = page;
        this.signOffLink = page.getByRole('link', { name: /sign off/i });
        this.cardType = page.getByRole('radio');
        this.cardHolderName = page.locator('input[name="holder_name"]');
        this.cardNumber = page.locator('input[name="card_number"]');
        this.expiryMonth = page.locator('select[name="expiry_month"]');
        this.expiryYear = page.locator('select[name="expiry_year"]');
        this.payButton = page.getByRole("button", { name: "Pay now" });
        this.bookingNumber = page.locator('#booking_number');
    }

    async selectCardByIndex(index: number){
        await this.cardType.nth(index).check();
    }
    
    async enterCardNumber(num: string){
        await this.cardNumber.fill(num);
    }

    async selectExpiry(month: string, year: string){
        await this.expiryMonth.selectOption(month);
        await this.expiryYear.selectOption(year);
    }

    async pressPayButton(){
        await this.payButton.click();
    }

    async logout() {
        await this.signOffLink.click();
    }
}