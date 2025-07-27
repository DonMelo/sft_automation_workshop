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
test.describe('Oneway flights', () => {
  
  test('One way flight booking detailed', async ({ page }) => {
    await agilewayStart.onewayFlight();
    await agilewayStart.flightPorts('New York','Sydney');
    await agilewayStart.departTime('08','October 2025');
    await agilewayStart.flightTimeCheck(0);
    await agilewayStart.continue();

    await expect(page.locator('h2')).toContainText('Passenger Details');
    
  });
  
  test('One way flight booking simple', async ({ page }) => {
    await agilewayStart.fullOnewayFlight('New York','Sydney','07','October 2026');
   
    await expect(page.locator('h2')).toContainText('Passenger Details');
  });
});

test.describe('Returning flights', () => {
  test('Returning flight booking detailed', async ({ page }) => {
    await agilewayStart.returningFlight();
    await agilewayStart.flightPorts('New York','Sydney');
    await agilewayStart.departTime('08','October 2025');
    await agilewayStart.returnTime('28','December 2025');
    await agilewayStart.continue();

    await expect(page.locator('h2')).toContainText('Passenger Details');
  });
  test('Returning flight booking simple', async ({ page }) => {
    await agilewayStart.fullReturningFlight('New York','Sydney','07','October 2026','20','December 2026',1);
  
    await expect(page.locator('h2')).toContainText('Passenger Details');
  });
});