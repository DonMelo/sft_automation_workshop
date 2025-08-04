import { AgilewayLogin } from "../pom/agileway/agilewayLogin.page";
import { AgilewayStart } from "../pom/agileway/agilewayStart.page";
import { AgilewayDetails } from "../pom/agileway/agilewayDetails.page";
import { AgilewayPayment } from "../pom/agileway/agilewayPayment.page"
import { test} from "playwright/test";

let agilewayPayment: AgilewayPayment;
test.beforeEach(async ({page}) => {
  let login = new AgilewayLogin(page);
  let start = new AgilewayStart(page);
  let details = new AgilewayDetails(page);
  agilewayPayment = new AgilewayPayment(page);
  await login.gotoPage();
  await login.fullLogin('agileway','testW1se');
  await start.fillFormOnewayFlight('New York','Sydney','07','October 2026');
  await details.fullInput('first','last');
});

test('All fields payment master card', async ({ page }) => {
  await agilewayPayment.useMastercard();
  await agilewayPayment.fullPayment('1234123412341234','06','2026');
  
  await agilewayPayment.verifyConfirmationHeaderAppears();
});

test('All fields payment visa', async ({ page }) => {
  await agilewayPayment.useVisa();
  await agilewayPayment.fullPayment('1234123412341234','06','2026');
  
  await agilewayPayment.verifyConfirmationHeaderAppears();
});