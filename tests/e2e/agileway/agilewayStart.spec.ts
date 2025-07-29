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
    await agilewayStart.fullOnewayFlight('New York','Sydney','07','October 2026');
    
    // Assert
    await agilewayDetails.verifyHeaderIsVisible();
  });
});

test.describe("Returning booking", () => {
  test('Returning flight booking', async ({ page }) => {
    await agilewayStart.fullReturningFlight('New York','Sydney','07','October 2026','20','December 2026',1);

    // Assert
    await agilewayDetails.verifyHeaderIsVisible();
  });
    
  test('Default flight booking', async ({ page }) => {
    await agilewayStart.continue();
    
    // Assert
    await agilewayDetails.verifyHeaderIsVisible();
  });
});