import { Locator, Page } from "@playwright/test";

export class PassengerPage{
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly nextButton: Locator;
    readonly flightHeader: Locator;

    constructor(page: Page){
        this.page = page;
        this.firstName = page.locator('input[name="passengerFirstName"]');
        this.lastName = page.locator('input[name="passengerLastName"]')
        this.nextButton = page.getByRole("button", { name: "Next" });
        this.flightHeader = page.locator('p', { hasText: 'Flights (oneway trip)' });
    }
    
    async enterNameAndSurname(name: string, surname: string){
        await this.firstName.fill(name);
        await this.lastName.fill(surname);
    }

    async clickNext(){
        await this.nextButton.click();
    }
}