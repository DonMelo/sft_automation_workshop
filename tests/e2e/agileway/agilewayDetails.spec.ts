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
  await login.fullLogin('agileway','testW1se');
  await start.fullOnewayFlight('New York','Sydney','07','October 2026');
});

test.describe('Correct details', () => {
  test('full correct information', async ({ page }) => {
    await agilewayDetails.fullInput('first','last');
    
    // Assert
    await agilewayPayment.verifyPayByCardHeaderAppears();
  });

  test('No firstname', async ({ page }) => {
    await agilewayDetails.fullInput('','last');
    
    // Assert
    await agilewayPayment.verifyPayByCardHeaderAppears();
  });
});
test.describe('Incorrect details', () => {
  test('No firstname or lastname', async ({ page }) => {
    await agilewayDetails.fullInput('','');
    
    // Assert
    await agilewayDetails.verifyPassengerDetailsHeaderIsVisible();
    await agilewayDetails.verifytLastNameAlertIsVisible();
  });
  test('No lastname', async ({ page }) => {
    await agilewayDetails.fullInput('first','');
    
    // Assert
    await agilewayDetails.verifyPassengerDetailsHeaderIsVisible();
    await agilewayDetails.verifytLastNameAlertIsVisible();
  });
});