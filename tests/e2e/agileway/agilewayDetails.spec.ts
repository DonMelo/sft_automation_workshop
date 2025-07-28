import { AgilewayLogin } from "../pom/agileway/agilewayLogin.page";
import { AgilewayStart } from "../pom/agileway/agilewayStart.page";
import {AgilewayDetails} from "../pom/agileway/agilewayDetails.page"
import { AgilewayPayment } from "../pom/agileway/agilewayPayment.page";
import { test, expect } from "playwright/test";

let agilewayDetails: AgilewayDetails;
test.beforeEach(async ({page}) => {
let login = new AgilewayLogin(page);
let start = new AgilewayStart(page);
agilewayDetails = new AgilewayDetails(page);
await login.gotoPage();
await login.fullLogin('agileway','testW1se');

await start.fullOnewayFlight('New York','Sydney','07','October 2026');
});

test.describe('Correct details', () => {
  test('full correct information', async ({ page }) => {
    await agilewayDetails.fullInput('first','last');
    
    await expect(page).toHaveURL(AgilewayPayment.paymentURL);
  });

  test('No firstname', async ({ page }) => {
    await agilewayDetails.fullInput('','last');
    
    await expect(page).toHaveURL(AgilewayPayment.paymentURL);
  });
});
test.describe('Incorrect details', () => {
  test('No firstname or lastname', async ({ page }) => {
    await agilewayDetails.fullInput('','');
    
    await expect(page.locator('#flash_alert')).toBeVisible();
  });
  test('No lastname', async ({ page }) => {
    await agilewayDetails.fullInput('first','');
    
    await expect(page.locator('#flash_alert')).toBeVisible();
  });

});