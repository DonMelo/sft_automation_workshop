import { AgilewayLogin } from "../pom/agileway/agilewayLogin.page";
import { test, expect } from "playwright/test";
import { AgilewayStart } from "../pom/agileway/agilewayStart.page";
import { AgilewayDetails } from "../pom/agileway/agilewayDetails.page";
import {AgilewayPayment} from "../pom/agileway/agilewayPayment.page"

let agilewayPayment;
test.beforeEach(async ({page}) => {
let login = new AgilewayLogin(page);
let start = new AgilewayStart(page);
let details = new AgilewayDetails(page);
agilewayPayment = new AgilewayPayment(page);
await login.gotoPage();
await login.fullLogin('agileway','testW1se');
await start.fullOnewayFlight('New York','Sydney','07','October 2026');
await details.fullInput('first','last');
});
// await page.getByText('Booking number:').click();
// await page.getByText('Flights (return Trip)').click();
// await page.getByText('Flights (return Trip) 2025-10').click();
// await page.getByRole('paragraph').filter({ hasText: 'Passenger Details: john joohn' }).click();
// await page.getByText('Fare (return New York to').click();
test('Correct payment detailed', async ({ page }) => {
  
  await agilewayPayment.cardTypeVisa();
  await agilewayPayment.inputNumber("1234123412341234");
  await agilewayPayment.inputExpiryMonth('05');
  await agilewayPayment.inputExpiryYear('2028');
  await agilewayPayment.pay();

  await expect(page.getByRole('heading', { name: 'Confirmation' })).toBeVisible();

});
test('Correct payment simple', async ({ page }) => {
  await agilewayPayment.fullPayment('1234123412341234','06','2026');

  await expect(page.getByRole('heading', { name: 'Confirmation' })).toBeVisible();
});