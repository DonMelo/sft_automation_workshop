import { Locator, Page} from "@playwright/test";
import { CreditCardDetailsPage } from "./CreditCardDetails.page";

export class PassengerDetailsPage {
    readonly page: Page;
    readonly passengerFirstName: Locator;
    readonly passengerLastName: Locator;
    readonly nextButton: Locator;
    readonly flashAlert: Locator;

    constructor(page: Page){
        this.page = page;
        this.passengerFirstName = page.locator('[name = "passengerFirstName"]');
        this.passengerLastName = page.locator('[name = "passengerLastName"]');
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.flashAlert = page.locator('#flash_alert');
    }

    async fillFirstName(firstName: string){
        await this.passengerFirstName.fill(firstName);
    }

    async fillLastName(lastName: string){
        await this.passengerLastName.fill(lastName);
    }

    async clickNextButton(){
        await this.nextButton.click();
        return new CreditCardDetailsPage(this.page); 
    }

    async getFormattedDate(month: string, day: string): Promise<string> {
        const fullDate = new Date(`${month} ${day}`);
        return fullDate.toLocaleDateString('en-CA');
    }
      
    async getDateTextFromPage(formattedDate: string): Promise<string> {
        const dateLocator = this.page.locator(`text=${formattedDate}`);
        return await dateLocator.innerText();
    }
}