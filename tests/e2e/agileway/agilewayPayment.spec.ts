import { AgilewayLogin } from "../pom/agileway/agilewayLogin.page";
import { test, expect } from "playwright/test";
import { AgilewayStart } from "../pom/agileway/agilewayStart.page";
import { AgilewayDetails } from "../pom/agileway/agilewayDetails.page";
import {AgilewayPayment} from "../pom/agileway/agilewayPayment.page"

let agilewayPayment: AgilewayPayment;


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

// invalid payment not implemented, so no invalid test regression
test('All fields payment', async ({ page }) => {
  await agilewayPayment.fullPayment('1234123412341234','06','2026');

  await expect(page.getByRole('heading', { name: 'Confirmation' })).toBeVisible();
});