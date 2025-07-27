import { Locator, Page } from "playwright";

export class AgilewayPayment{
  readonly page: Page;
  readonly fieldCardNumber: Locator;
  readonly fieldCardHolder: Locator;
  readonly fieldCardExpiryMonth: Locator;
  readonly fieldCardExpiryYear: Locator;
  readonly payment: Locator;
  readonly cardTypes: Locator;
  constructor(page: Page) {
    this.page = page;
    this.fieldCardHolder = page.locator('input[name="holder_name"]');
    this.fieldCardNumber = page.locator('input[name="card_number"]');
    this.fieldCardExpiryMonth = page.locator('select[name="expiry_month"]');
    this.fieldCardExpiryYear = page.locator('select[name="expiry_year"]');
    this.payment = page.getByRole('button', { name: 'Pay now' });
    this.cardTypes = page.getByRole('radio');
  }

  async pay(){
    this.payment.click();
  }
  async cardTypeVisa(){
    this.cardTypes.first().check();
  }
  async cardTypeMaster(){
    this.cardTypes.nth(1).check();
  }
  async inputNumber(cardNumber: string){
    this.fieldCardNumber.fill(cardNumber);
  }
  async inputExpiryMonth(month:string){
    this.fieldCardExpiryMonth.selectOption(month);
  }
  async inputExpiryYear(year:string){
    this.fieldCardExpiryYear.selectOption(year);
  }
  async fullPayment(cardNumber: string, cardExpiryMonth: string, cardExpiryYear: string){
    this.fieldCardNumber.fill(cardNumber);
    this.fieldCardExpiryMonth.selectOption(cardExpiryMonth);
    this.fieldCardExpiryYear.selectOption(cardExpiryYear);
    this.payment.click();
  }

} 