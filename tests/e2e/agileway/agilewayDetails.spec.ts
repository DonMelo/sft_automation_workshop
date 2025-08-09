import { AgilewayLogin } from "../pom/agileway/agilewayLogin.page";
import { AgilewayStart } from "../pom/agileway/agilewayStart.page";
import { AgilewayDetails } from "../pom/agileway/agilewayDetails.page"
import { test } from "playwright/test";
import { AgilewayPayment } from "../pom/agileway/agilewayPayment.page";

let agilewayDetails: AgilewayDetails;
let agilewayPayment: AgilewayPayment;

test.beforeEach(async ({page}) => {
  let login = new AgilewayLogin(page);
  let start = new AgilewayStart(page);
  agilewayDetails = new AgilewayDetails(page);
  agilewayPayment = new AgilewayPayment(page);
  await login.gotoPage();
  await login.fillLoginDetails('agileway','testW1se');
  await start.fillFormOnewayFlight('New York','Sydney','07','October 2026');
});

test.describe('Correct details', () => {
  test('full correct information', async ({ page }) => {
    await agilewayDetails.fillInputDetails('first','last');
    
    await agilewayPayment.verifyPayByCardHeaderAppears();
  });

  test('No firstname', async ({ page }) => {
    await agilewayDetails.fillInputDetails('','last');
    
    await agilewayPayment.verifyPayByCardHeaderAppears();
  });
});
test.describe('Incorrect details', () => {
  test('No firstname or lastname', async ({ page }) => {
    await agilewayDetails.fillInputDetails('','');
    
    await agilewayDetails.verifyPassengerDetailsHeaderIsVisible();
    await agilewayDetails.verifytLastNameAlertIsVisible();
  });
  test('No lastname', async ({ page }) => {
    await agilewayDetails.fillInputDetails('first','');
    
    await agilewayDetails.verifyPassengerDetailsHeaderIsVisible();
    await agilewayDetails.verifytLastNameAlertIsVisible();
  });
});