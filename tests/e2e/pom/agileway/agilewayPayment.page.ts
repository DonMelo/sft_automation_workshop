import { Locator, Page } from "playwright";
import { Basepage } from "./basePage.page";
import { expect } from "playwright/test";

export class AgilewayPayment extends Basepage{
  readonly fieldCardNumber: Locator;
  readonly fieldCardHolder: Locator;
  readonly fieldCardExpiryMonth: Locator;
  readonly fieldCardExpiryYear: Locator;
  readonly payment: Locator;
  readonly cardTypeMaster: Locator;
  readonly cardTypeVisa: Locator;
  static readonly paymentURL = '/flights/passenger';

  constructor(page: Page) {
    super(page);
    this.fieldCardHolder = page.locator('input[name="holder_name"]');
    this.fieldCardNumber = page.locator('input[name="card_number"]');
    this.fieldCardExpiryMonth = page.locator('select[name="expiry_month"]');
    this.fieldCardExpiryYear = page.locator('select[name="expiry_year"]');
    this.payment = page.getByRole('button', { name: 'Pay now' });
    this.cardTypeMaster =  page.locator('input[type="radio"][value="master"]');
    this.cardTypeVisa =  page.locator('input[type="radio"][value="visa"]');
  }
  async useMastercard(){
    await this.cardTypeMaster.check();
  }
  
  async useVisa(){
    await this.cardTypeVisa.check();
  }

  async fullPayment(cardNumber: string, cardExpiryMonth: string, cardExpiryYear: string){
    await this.fieldCardNumber.fill(cardNumber);
    await this.fieldCardExpiryMonth.selectOption(cardExpiryMonth);
    await this.fieldCardExpiryYear.selectOption(cardExpiryYear);
    await this.payment.click();
  }

  async expectCorrectForm(){
    await expect(this.page.getByRole('heading', { name: 'Confirmation' })).toBeVisible();
  }
} 