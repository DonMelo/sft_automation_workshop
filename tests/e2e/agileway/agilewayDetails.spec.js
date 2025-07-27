import { AgilewayLogin } from "../pom/agileway/agilewayLogin.page";
import { test, expect } from "playwright/test";

test.beforeEach(async ({page}) => {
let login = new AgilewayLogin(page);
await login.gotoPage();
await login.fullLogin('agileway','testW1se');
});
test('deet', async ({ page }) => {
  await page.locator('input[name="passengerFirstName"]').click();
  await page.locator('input[name="passengerFirstName"]').fill('john');
  await page.locator('input[name="passengerLastName"]').click();
  await page.locator('input[name="passengerLastName"]').fill('joohn');
  await page.getByRole('button', { name: 'Next' }).click();


  await page.getByText('Booking number:').click();
  await page.getByText('Flights (return Trip)').click();
  await page.getByText('Flights (return Trip) 2025-10').click();
  await page.getByRole('paragraph').filter({ hasText: 'Passenger Details: john joohn' }).click();
  await page.getByText('Fare (return New York to').click();
});