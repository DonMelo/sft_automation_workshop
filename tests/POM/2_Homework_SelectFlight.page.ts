import { Page, Locator, expect } from "@playwright/test";

export class SelectFlightsPage {
    readonly page: Page;
    readonly onewayToggle: Locator;
    readonly returnToggle: Locator;
    readonly fromCity: Locator;
    readonly toCity: Locator;
    readonly departureDay: Locator;
    readonly departureMonth: Locator; 
    readonly returnDay: Locator;
    readonly returnMonth: Locator;
    readonly continueButton: Locator;
    readonly returnTripField: Locator;
    readonly flashAlert: Locator;

    
    constructor(page: Page) {
      this.page = page;
      this.onewayToggle = page.getByRole('radio').nth(1);
      this.returnToggle = page.getByRole('radio').nth(0);
      this.fromCity = page.locator('select[name="fromPort"]');
      this.toCity = page.locator('select[name="toPort"]');
      this.departureDay = page.locator("#departDay");
      this.departureMonth = page.locator("#departMonth");
      this.returnDay =  page.locator("#returnDay");
      this.returnMonth = page.locator("#returnMonth");
      this.continueButton = page.getByRole('button', { name: 'Continue' });
      this.returnTripField = page.locator('#returnTrip');
      this.flashAlert = page.locator('#flash_alert');
    };
  
    async goto() {
        await this.page.goto('https://travel.agileway.net/flights/start');
    };

    async onewayTripToggle() {
        await this.onewayToggle.check();
    };

    async returnTripToggle() {
        await this.returnToggle.check();
    };

    async fromSydney(){
        await this.fromCity.selectOption('Sydney');
    };

    async fromNewYork(){
        await this.fromCity.selectOption('New York');
    };

    async fromSanFrancisco(){
        await this.fromCity.selectOption('San Francisco');
    };

    async toNewYork(){
        await this.toCity.selectOption('New York');
    };

    async toSydney(){
        await this.toCity.selectOption('Sydney');
    };

    async departureDate(departureDay: string, departureMonth: string){
        await this.departureDay.selectOption(departureDay);
        await this.departureMonth.selectOption(departureMonth);
    };

    async returnDate(returnDay: string, returnMonth: string){
        await this.returnDay.selectOption(returnDay);
        await this.returnMonth.selectOption(returnMonth);
    };

    async airline(airline: string){
        await this.page.getByRole("row", { name: airline }).getByRole("checkbox").check();
    }

    async clickContinue(){
        await this.continueButton.click();
    };

    async visibleReturnTripFiels(){
       await expect(this.returnTripField).toBeVisible();
    };

    async notvisibleReturnTripFiels(){
        await expect(this.returnTripField).not.toBeVisible();
    };

    async visiblePassengerDetails(){
        const passengerDetails = this.page.getByRole('heading', { name: 'Passenger Details' });
        await expect(passengerDetails).toBeVisible();
    };

    async notvisiblePassengerDetails(){
        const passengerDetails = this.page.getByRole('heading', { name: 'Passenger Details' });
        await expect(passengerDetails).not.toBeVisible();
    };

    async visibleFlashAlert() {
        await expect(this.flashAlert).toBeVisible(); 
        // There is no flash alert, so I can't enter the exact message text that should be shown.
    }


  };  
