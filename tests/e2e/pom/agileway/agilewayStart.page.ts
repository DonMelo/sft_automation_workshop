import { Locator, Page } from "playwright";

export class AgilewayStart{
  readonly page: Page;
  readonly radioButtonOneWay: Locator;
  readonly radioButtonReturning: Locator;
  readonly selectFromPort: Locator;
  readonly selectToPort: Locator;
  readonly selectDepartDay: Locator;
  readonly selectDepartMonth: Locator;
  readonly selectReturnDay: Locator;
  readonly selectReturnMonth: Locator;
  readonly radioButtonTime: Locator;
  readonly buttonContinue: Locator;
  static readonly startUrl = 'https://travel.agileway.net/flights/start';

  constructor(page: Page){
    this.page = page;
    this.radioButtonReturning = page.getByRole('radio').first();
    this.radioButtonOneWay = page.getByRole('radio').nth(1);
    this.selectFromPort = page.locator('select[name="fromPort"]');
    this.selectToPort = page.locator('select[name="toPort"]');
    this.selectDepartDay = page.locator('#departDay');
    this.selectDepartMonth = page.locator('#departMonth');
    this.selectReturnDay = page.locator('#returnDay');
    this.selectReturnMonth= page.locator('#returnMonth');
    this.radioButtonTime = page.getByRole('checkbox');
    this.buttonContinue = page.getByRole('button', { name: 'Continue' });
  }
 
  
  async fullOnewayFlight(fromPort: string, toPort: string, dayDepart: string, monthYearDepart: string){
    await this.radioButtonOneWay.check();
    await this.selectFromPort.selectOption(fromPort);
    await this.selectToPort.selectOption(toPort);
    await this.selectDepartDay.selectOption(dayDepart);
    await this.selectDepartMonth.selectOption(monthYearDepart);
    await this.buttonContinue.click();
  }

  async fullReturningFlight(fromPort: string, toPort: string, dayDepart: string, monthYearDepart: string, dayReturn: string, monthYearReturn: string, nthCheckbox: number){
    await this.radioButtonReturning.check();
    await this.selectFromPort.selectOption(fromPort);
    await this.selectToPort.selectOption(toPort);
    await this.selectDepartDay.selectOption(dayDepart);
    await this.selectDepartMonth.selectOption(monthYearDepart);
    await this.selectReturnDay.selectOption(dayReturn);
    await this.selectReturnMonth.selectOption(monthYearReturn);
    await this.radioButtonTime.nth(nthCheckbox).check();
    await this.buttonContinue.click();
  }

}