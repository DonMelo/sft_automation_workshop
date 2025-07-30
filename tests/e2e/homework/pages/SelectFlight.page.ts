import { Locator, Page } from "@playwright/test";
import { PassengerDetailsPage } from "./PassengerDetails.page";


export class SelectFlightPage {
    readonly page: Page;
    readonly tripType: Locator;
    readonly fromPort: Locator;
    readonly toPort: Locator;
    readonly departDay: Locator;
    readonly departMonth: Locator;
    readonly returnDay: Locator;
    readonly returnMonth: Locator;
    readonly continueButton: Locator;
    readonly flightTimeCheckbox: Locator;
    readonly returnDateInput: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.tripType = page.locator('input[name="tripType"]');
        this.fromPort = page.locator('[name="fromPort"]');
        this.toPort = page.locator('[name="toPort"]');
        this.departDay = page.locator('#departDay');
        this.departMonth = page.locator('#departMonth');
        this.returnDay = page.locator('#returnDay');
        this.returnMonth = page.locator('#returnMonth');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.flightTimeCheckbox = page.locator('[type="checkbox"]');
        this.returnDateInput = page.locator('#returnTrip');
    }

    async checkTripTypeReturn(){
        await this.tripType.first().check();
    }

    async checkTripTypeOneWay(){
        await this.tripType.last().check();
    }

    async checkTripType(tripType : string){
        if(tripType === 'oneway'){
            await this.tripType.last().check();
        }
        else if(tripType === 'return'){
            await this.tripType.first().check();
        }
    }

    async chooseFromPort(port: string){
        await this.fromPort.selectOption({ label: port });
    }

    async chooseToPort(port: string){
        await this.toPort.selectOption({ label: port });
    }

    async chooseDepartDay(departDay: string){
        await this.departDay.selectOption({ label: departDay });
    }

    async chooseDepartMonth(departMonth: string){
        await this.departMonth.selectOption({ label: departMonth });
    }

    async chooserReturnDay(returnDay: string){
        await this.returnDay.selectOption({ label: returnDay });
    }

    async chooseReturnMonth(returnMonth: string){
        await this.returnMonth.selectOption({ label: returnMonth });
    }

    async continueWithSelectedFlight(){
        await this.continueButton.click();
        return new PassengerDetailsPage(this.page); 
    }

    async selectFlightTime(timeNumber: number){
        await this.flightTimeCheckbox.nth(timeNumber).check();
    }
}