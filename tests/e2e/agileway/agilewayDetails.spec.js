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
  test('full information simple', async ({ page }) => {
    await agilewayDetails.fullInput('first','last');
    
    await expect(page).toHaveURL('https://travel.agileway.net/flights/passenger');
  });
  test('full information detailed', async ({ page }) => {
    await agilewayDetails.inputFirstName('first');
    await agilewayDetails.inputLastName('last');
    await agilewayDetails.continue();
    
    await expect(page).toHaveURL('https://travel.agileway.net/flights/passenger');
  });

  test('missing firstname information', async ({ page }) => {
    await agilewayDetails.inputFirstName('');
    await agilewayDetails.inputLastName('last');
    await agilewayDetails.continue();
    
    await expect(page).toHaveURL('https://travel.agileway.net/flights/passenger');
  });
});
test.describe('Incorrect details', () => {
  
  test('missing lastname information ', async ({ page }) => {
    await agilewayDetails.inputFirstName('first');
    await agilewayDetails.inputLastName('');
    await agilewayDetails.continue();
    
    await expect(page.locator('#flash_alert')).toBeVisible();

  });

});