import { type Locator, type Page, expect } from "@playwright/test";

    interface PaymentFormData {
    cardType? : string;
    holderName? : string;
    cardNum? : string;
    expMonth? : string;
    expYear? : string;
    }

export class Payment{

    readonly page : Page;
    readonly header : Locator;
    readonly cardType : Locator;
    readonly CardNum: Locator;
    readonly CardHolder: Locator;
    readonly CardExpMonth: Locator;
    readonly CardExpYear: Locator;
    readonly confirmation : Locator;
    readonly bookingNumber : Locator;
    readonly payNowButton : Locator;

    constructor(page : Page){
        this.page = page;
        this.header = page.locator('h2');
        this.cardType = page.locator('input[type="radio"]');
        this.CardNum = page.locator('input[name="card_number"]');
        this.CardHolder = page.locator('input[name="holder_name"]');
        this.CardExpMonth = page.locator('select[name="expiry_month"]');
        this.CardExpYear = page.locator('select[name="expiry_year"]');
        this.confirmation = page.locator('#confirmation h2');
        this.bookingNumber = page.locator('#booking_number');
        this.payNowButton = page.locator('input[type="submit"]');
    }

    async payNowButtonClick(){
        await this.payNowButton.click();
    }

    async fillOutTheForm(data : PaymentFormData) {
        if(data.cardType){
            if(data.cardType === 'visa'){
                await this.cardType.first().check();
            }
            else{
                await this.cardType.last().check();
            }
        }
        if(data.holderName){
            await this.CardHolder.fill(data.holderName);
        }
        if(data.cardNum){
            await this.CardNum.fill(data.cardNum);
        }
        if(data.expMonth){
            await this.CardExpMonth.selectOption(data.expMonth);
        }
        if(data.expYear){
            await this.CardExpYear.selectOption(data.expYear);
        }
        await this.payNowButtonClick();
    }

}