import { AgilewayDetails } from "../pom/agileway/agilewayDetails.page";
import { AgilewayLogin } from "../pom/agileway/agilewayLogin.page";
import { AgilewayStart } from "../pom/agileway/agilewayStart.page";
import { test } from "playwright/test";

let agilewayStart: AgilewayStart;
let agilewayDetails: AgilewayDetails;
test.beforeEach(async ({page}) => {
  agilewayStart = new AgilewayStart(page);
  agilewayDetails = new AgilewayDetails(page);
  let login = new AgilewayLogin(page);

  await login.gotoPage();
  await login.fullLogin('agileway','testW1se');
});

test.describe("Oneway booking", () => {
  test('One way flight booking', async ({ page }) => {
    await agilewayStart.fillFormOnewayFlight('New York','Sydney','07','October 2026');
    
    await agilewayDetails.verifyPassengerDetailsHeaderIsVisible();
  });
});

test.describe("Returning booking", () => {
  test('Returning flight booking', async ({ page }) => {
    await agilewayStart.fillFormReturningFlight('New York','Sydney','07','October 2026','20','December 2026',1);

    await agilewayDetails.verifyPassengerDetailsHeaderIsVisible();
  });
    
  test('Default flight booking', async ({ page }) => {
    await agilewayStart.continue();
    
    await agilewayDetails.verifyPassengerDetailsHeaderIsVisible();
  });
});