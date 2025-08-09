import { Locator, Page } from "playwright";
import { Basepage } from "./basePage.page";

export class AgilewayStart extends Basepage{
  readonly radioButtonOneWay: Locator;
  readonly radioButtonReturning: Locator;
  readonly selectFromPort: Locator;
  readonly selectToPort: Locator;
  readonly selectDepartDay: Locator;
  readonly selectDepartMonth: Locator;
  readonly selectReturnDay: Locator;
  readonly selectReturnMonth: Locator;
  readonly radioButtonTime: Locator;
  readonly buttonNameContinue = 'Continue';

  constructor(page: Page){
    super(page);
    this.radioButtonReturning = page.locator('input[type="radio"][value="return"]');
    this.radioButtonOneWay = page.locator('input[type="radio"][value="oneway"]');
    this.selectFromPort = page.locator('select[name="fromPort"]');
    this.selectToPort = page.locator('select[name="toPort"]');
    this.selectDepartDay = page.locator('#departDay');
    this.selectDepartMonth = page.locator('#departMonth');
    this.selectReturnDay = page.locator('#returnDay');
    this.selectReturnMonth= page.locator('#returnMonth');
    this.radioButtonTime = page.getByRole('checkbox');
  }
  
  async fillFormOnewayFlight(fromPort: string, toPort: string, dayDepart: string, monthYearDepart: string){
    await this.radioButtonOneWay.check();
    await this.selectFromPort.selectOption(fromPort);
    await this.selectToPort.selectOption(toPort);
    await this.selectDepartDay.selectOption(dayDepart);
    await this.selectDepartMonth.selectOption(monthYearDepart);
    await this.clickContinueButton();
  }

  async fillFormReturningFlight(fromPort: string, toPort: string, dayDepart: string, monthYearDepart: string, dayReturn: string, monthYearReturn: string, nthCheckbox: number){
    await this.radioButtonReturning.check();
    await this.selectFromPort.selectOption(fromPort);
    await this.selectToPort.selectOption(toPort);
    await this.selectDepartDay.selectOption(dayDepart);
    await this.selectDepartMonth.selectOption(monthYearDepart);
    await this.selectReturnDay.selectOption(dayReturn);
    await this.selectReturnMonth.selectOption(monthYearReturn);
    await this.radioButtonTime.nth(nthCheckbox).check();
    await this.clickContinueButton();
  }
  async clickContinueButton(){
    await this.clickButtonByName(this.buttonNameContinue);
  }
  async verifySelectFlightHeaderAppears(){
    await this.verifyHeaderContains('Select Flight');
  }
}