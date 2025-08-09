import { Locator, Page } from "playwright";
import { Basepage } from "./basePage.page";

export class AgilewayPayment extends Basepage{
  readonly fieldCardNumber: Locator;
  readonly fieldCardHolder: Locator;
  readonly fieldCardExpiryMonth: Locator;
  readonly fieldCardExpiryYear: Locator;
  readonly cardTypeMaster: Locator;
  readonly cardTypeVisa: Locator;
  readonly buttonNamePayNow = 'Pay now';

  constructor(page: Page) {
    super(page);
    this.fieldCardHolder = page.locator('input[name="holder_name"]');
    this.fieldCardNumber = page.locator('input[name="card_number"]');
    this.fieldCardExpiryMonth = page.locator('select[name="expiry_month"]');
    this.fieldCardExpiryYear = page.locator('select[name="expiry_year"]');
    this.cardTypeMaster =  page.locator('input[type="radio"][value="master"]');
    this.cardTypeVisa =  page.locator('input[type="radio"][value="visa"]');
  }
  async checkUseMastercard(){
    await this.cardTypeMaster.check();
  }
  
  async checkUseVisa(){
    await this.cardTypeVisa.check();
  }

  async fillPaymentDetails(cardNumber: string, cardExpiryMonth: string, cardExpiryYear: string){
    await this.fieldCardNumber.fill(cardNumber);
    await this.fieldCardExpiryMonth.selectOption(cardExpiryMonth);
    await this.fieldCardExpiryYear.selectOption(cardExpiryYear);
    await this.clickButtonByName(this.buttonNamePayNow);
  }

  async verifyConfirmationHeaderAppears(){
    await this.verifyHeaderContains('Confirmation');
  }
  async verifyPayByCardHeaderAppears(){
    await this.verifyHeaderContains('Pay by Credit Card');
  }
} 