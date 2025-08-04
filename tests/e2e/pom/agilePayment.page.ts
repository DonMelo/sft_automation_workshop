import {expect, Locator, Page} from "@playwright/test"

export class PaymentPage{

    readonly page: Page;
    readonly visaRadioButton: Locator;
    readonly masterRadioButton: Locator;
    readonly cardholdersNameInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cardExpireMonth: Locator;
    readonly cardExpireYear: Locator;
    readonly payNowButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.visaRadioButton = page.locator('[value="visa"]')
        this.masterRadioButton = page.locator('[value="master"]')
        this.cardholdersNameInput = page.locator('[name="holder_name"]')
        this.cardNumberInput = page.locator('[name="card_number"]')
        this.cardExpireMonth = page.locator('[name="expiry_month"]')
        this.cardExpireYear = page.locator('[name="expiry_year"]')
        this.payNowButton = page.locator('[type="submit"]');
    }

    async clickPayNowButton(){
        await this.payNowButton.click();
    }
    async selectCardType(cardType: String){
        if(cardType.toLowerCase() === "master"){
            await this.masterRadioButton.check();
        }
        else if(cardType.toLowerCase() === "visa"){
            await this.visaRadioButton.check();
        }
        else{
            throw new TypeError("Wrong card type");
        }
    }

    async inputCardholdersName(name: String){
        await this.cardholdersNameInput.fill(`${name}`)
    }

    async inputCardNumber(cardNumber: String){
        await this.cardNumberInput.fill(`${cardNumber}`)
    }

    async inputCardExpiryDate(month: String, year: String){
        await this.cardExpireMonth.selectOption(`${month}`)
        await this.cardExpireYear.selectOption(`${year}`)
    }

    async checkErrorMessage(errorMessage: String){
        await expect(this.page.locator("#flash_alert")).toContainText(`${errorMessage}`);
    }

    async checkConfirmation(){
        await expect(this.page.locator('h2:has-text("Confirmation")')).toContainText('Confirmation');
    }
}