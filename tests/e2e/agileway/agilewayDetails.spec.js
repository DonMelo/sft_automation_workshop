import { AgilewayLogin } from "../pom/agileway/agilewayLogin.page";
import { AgilewayStart } from "../pom/agileway/agilewayStart.page";
import { test, expect } from "playwright/test";
import {AgilewayDetails} from "../pom/agileway/agilewayDetails.page"

let agilewayDetails;
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
    
    await expect(page).toHaveURL('https://travel.agileway.net/flights/passenger');
  });

  test('No firstname', async ({ page }) => {
    await agilewayDetails.fullInput('','last');
    
    await expect(page).toHaveURL('https://travel.agileway.net/flights/passenger');
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