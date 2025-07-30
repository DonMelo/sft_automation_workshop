import { Page, expect, Locator } from '@playwright/test';

export class PaymentPage {
    readonly page: Page;
    readonly cardTypeVisaRadio: Locator;
    readonly cardTypeMasterRadio: Locator;
    readonly nameField: Locator;
    readonly cardNumberField: Locator;
    readonly expiryMonthDropBox: Locator;
    readonly expiryYearDropBox: Locator;
    readonly payNowButton: Locator;
    readonly flightInfoConfirmation: Locator;
    readonly fareInfoConfirmation: Locator;
    readonly nameConfirmation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cardTypeMasterRadio = page.locator('input[type="radio"][name="card_type"][value="master"]');
        this.cardTypeVisaRadio = page.locator('input[type="radio"][name="card_type"][value="visa"]');
        this.nameField = page.locator('input[name="holder_name"]');
        this.cardNumberField = page.locator('input[name="card_number"]');
        this.expiryMonthDropBox = page.locator('select[name="expiry_month"]');
        this.expiryYearDropBox = page.locator('select[name="expiry_year"]');
        this.payNowButton = page.locator('input[value="Pay now"]');
        this.flightInfoConfirmation = page.locator('#confirmation div');
        this.fareInfoConfirmation = page.locator('#container div i');
        this.nameConfirmation = page.locator('#confirmation p label');
    }

    async selectCardType(type: string) {
        if (type == 'Visa')
            await this.cardTypeVisaRadio.check();
        else if (type == 'Master')
            await this.cardTypeMasterRadio.check();
    }

    async enterName(name: string) {
        await this.nameField.fill(name)
    }

    async enterCardNumber(number: string) {
        await this.cardNumberField.fill(number);
    }

    async selectExpiryDate(month: string, year: string) {
        await this.expiryMonthDropBox.selectOption(month);
        await this.expiryYearDropBox.selectOption(year);
    }

    async pressNextButton() {
        await this.payNowButton.click();
    }

    async validateDepartDate(date: string) {
        const flightInfo = (await this.flightInfoConfirmation.textContent())?.split('\n')[2];
        expect(flightInfo).toContain(date);
    }

    async validateReturnDate(date: string) {
        const flightInfo = (await this.flightInfoConfirmation.textContent())?.split('\n')[3];
        expect(flightInfo).toContain(date);
    }

    async validateDepartCities(from: string, to: string) {
        const flightInfo = (await this.flightInfoConfirmation.textContent())?.split('\n')[2];
        expect(flightInfo).toContain(from + " to " + to);
    }

    async validateReturnCities(from: string, to: string) {
        const flightInfo = (await this.flightInfoConfirmation.textContent())?.split('\n')[3];
        expect(flightInfo).toContain(from + " to " + to);
    }

    async validateFlightName(name: string) {
        expect((await this.nameConfirmation.textContent())).toEqual("Passenger Details: " + name);
    }

    async validateCardName(name: string) {
        expect((await this.nameField.inputValue())).toEqual(name);
    }

    async validateFare(returnType: string, from: string, to: string) {
        expect((await this.fareInfoConfirmation.textContent())).toEqual(returnType + " " + from + " to " + to);
    }
}