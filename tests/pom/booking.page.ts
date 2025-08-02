import { Page, Locator } from '@playwright/test';

export class BookingPage{
    readonly page: Page;
    readonly departureDay: Locator;
    readonly departureMonth: Locator; 
    readonly returnDay: Locator;
    readonly returnMonth: Locator; 
    readonly continue: Locator;
    readonly passengerFirstName: Locator;
    readonly passengerLastName: Locator;
    readonly next: Locator; 
    
    constructor(page:Page){
        this.page = page;
        this.departureDay = page.locator("#departDay");
        this.departureMonth = page.locator("#departMonth");
        this.returnDay =  page.locator("#returnDay");
        this.returnMonth = page.locator("#returnMonth");
        this.continue = page.getByRole("button", { name: "Continue" });
        this.passengerFirstName = page.locator('input[name="passengerFirstName"]');
        this.passengerLastName = page.locator('input[name="passengerLastName"]');
        this.next = page.getByRole("button", { name: "Next" });
    }

    async flightselection(departureDay: string, departureMonth: string, returnDay: string, returnMonth: string, airline: string){
        await this.departureDay.selectOption(departureDay);
        await this.departureMonth.selectOption(departureMonth);
        await this.returnDay.selectOption(returnDay);
        await this.returnMonth.selectOption(returnMonth);
        await this.page.getByRole("row", { name: airline }).getByRole("checkbox").check();
        await this.continue.click();
    }

    async passengerDetails(firstName: string, lastName:string){
        await this.passengerFirstName.fill(firstName);
        await this.passengerLastName.fill(lastName);
        await this.next.click();
    }
}