import { Page, Locator, expect } from "@playwright/test";

export class PassengerDetailsAndPayment {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly nextButton: Locator;
    readonly flashAlert: Locator;
    readonly cardNumber: Locator;
    readonly expiryMonth: Locator;
    readonly expiryYear: Locator;
    readonly payNow: any;
    readonly confirmation: Locator;



    constructor(page: Page) {
      this.page = page;
      this.firstName = page.locator('input[name="passengerFirstName"]');
      this.lastName = page.locator('input[name="passengerLastName"]');
      this.nextButton = page.getByRole('button', { name: 'Next' });
      this.flashAlert = page.locator('#flash_alert'); 
      this.cardNumber = page.locator('input[name="card_number"]');
      this.expiryMonth = page.locator('select[name="expiry_month"]');
      this.expiryYear = page.locator('select[name="expiry_year"]');
      this.payNow = page.getByRole("button", { name: "Pay now" });
      this.confirmation = page.locator('#confirmation');
    }


   async passengerDetails(Name: string, Surname:string){
        await this.firstName.fill(Name);
        await this.lastName.fill(Surname);
        await this.nextButton.click();
   }
 
   async visiblePaymentForm() {
     const paymentForm = this.page.locator('#payment-form');
     await expect(paymentForm).toBeVisible();
   }

   async FlashAlert() {
     await expect(this.flashAlert).toHaveText('Must provide last name');
   }

   async selectVisa(){
     const visaOption = this.page.getByRole('radio').nth(0);
     await visaOption.waitFor({ state: 'visible', timeout: 10000 });
     await visaOption.click();   
   }

   async selectMastercard(){
     const mastercardOption = this.page.getByRole('radio').nth(1);
     await mastercardOption.click(); 
   }

   async paymentData(cardNumber: string, expiryMonth: string, expiryYear: string){
    await this.cardNumber.fill(cardNumber);
    await this.expiryMonth.selectOption(expiryMonth);
    await this.expiryYear.selectOption(expiryYear);
    await this.payNow.click();
   }

   async visibleConfirmation(){
     await expect(this.confirmation).toBeVisible();
   };

   async notvisibleConfirmation(){
     await expect(this.confirmation).not.toBeVisible();
   };

   async paymentFlashAlert() {
    await expect(this.flashAlert).toBeVisible();
     // There is no flash alert, so I can't enter the exact message text that should be shown.
}
  };  