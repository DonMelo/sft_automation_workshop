import { AgilewayLogin } from "../pom/agileway/agilewayLogin.page";
import { AgilewayStart } from "../pom/agileway/agilewayStart.page";
import { test, expect } from "playwright/test";

let agilewayStart;

test.beforeEach(async ({page}) => {
agilewayStart = new AgilewayStart(page);
let login = new AgilewayLogin(page);
await login.gotoPage();
await login.fullLogin('agileway','testW1se');
});
// Invalid booking not implemented so no invalid test regression (wouldn't be regression testing)

test.describe("Oneway booking", () => {
  test('One way flight booking', async ({ page }) => {
    await agilewayStart.fullOnewayFlight('New York','Sydney','07','October 2026');
    
    await expect(page.locator('h2')).toContainText('Passenger Details');
  });
});
test.describe("Returning booking", () => {
  test('Returning flight booking', async ({ page }) => {
    await agilewayStart.fullReturningFlight('New York','Sydney','07','October 2026','20','December 2026',1);
    
    await expect(page.locator('h2')).toContainText('Passenger Details');
  });
    
  //may need to be changed in future
  test('Default flight booking', async ({ page }) => {
    await agilewayStart.fullReturningFlight('','','','','','',0);

    await expect(page.locator('h2')).toContainText('Passenger Details');
  });
});