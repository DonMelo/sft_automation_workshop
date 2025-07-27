import { AgilewayLogin } from "../pom/agileway/agilewayLogin.page";
import { test, expect } from "playwright/test";

test.beforeEach(async ({page}) => {
let login = new AgilewayLogin(page);
await login.gotoPage();
await login.fullLogin('agileway','testW1se');
});
test('pay', async ({ page }) => {
  await page.getByRole('radio').nth(1).check();
  await page.locator('input[name="card_number"]').click();
  await page.locator('input[name="card_number"]').fill('1234123412341234');
  await page.locator('select[name="expiry_month"]').selectOption('05');
  await page.locator('select[name="expiry_year"]').selectOption('2028');
  await page.getByRole('button', { name: 'Pay now' }).click();

  await page.getByText('Booking number:').click();
  await page.getByText('Flights (return Trip)').click();
  await page.getByText('Flights (return Trip) 2025-10').click();
  await page.getByRole('paragraph').filter({ hasText: 'Passenger Details: john joohn' }).click();
  await page.getByText('Fare (return New York to').click();
});