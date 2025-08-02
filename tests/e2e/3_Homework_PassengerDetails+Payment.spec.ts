import { test, expect } from '@playwright/test';

const firstName = 'Vardenis';
const lastName = 'Pavardenis';
const cardNumber = '12345';
const exMonth = '07';
const exYear = '2028';

test.beforeEach(async ({ page }) => {
  await page.goto('https://travel.agileway.net/flights/start');
  await page.getByRole('radio').nth(1).check();
  await page.locator('select[name="fromPort"]').selectOption('San Francisco');
  await page.locator('select[name="toPort"]').selectOption('Sydney');
  await page.locator('#departDay').selectOption('07');
  await page.locator('#departMonth').selectOption('042026');
  expect(page.locator('#flights')).toBeVisible;
  await page.getByRole('row', { name: ':30 VA23 Virgin Australia' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Continue' }).click();
  expect(page.getByRole('heading', { name: 'Passenger Details' })).toBeVisible;
});


test('Valid first and last name', async ({ page }) => {
  await page.locator('input[name="passengerFirstName"]').fill(firstName);
  await page.locator('input[name="passengerLastName"]').fill(lastName);
  await page.getByRole('button', { name: 'Next' }).click();
  expect(page.locator('#payment-form')).toBeVisible;
});

test('Last name field empty', async ({ page }) => {
  await page.locator('input[name="passengerFirstName"]').fill(firstName);
  await page.locator('input[name="passengerLastName"]').fill('');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator('#flash_alert')).toHaveText('Must provide last name');
});

test('First name field empty', async ({ page }) => {
  await page.locator('input[name="passengerFirstName"]').fill('');
  await page.locator('input[name="passengerLastName"]').fill(lastName);
  await page.getByRole('button', { name: 'Next' }).click();
  expect(page.locator('#payment-form')).toBeVisible;
});

//---------------------------------------------- 

test('Visa - valid data', async ({ page }) => {
  await page.getByRole('radio').nth(0).check();
  await page.locator('input[name="card_number"]').fill(cardNumber);
  await page.locator('select[name="expiry_month"]').selectOption(exMonth);
  await page.locator('select[name="expiry_year"]').selectOption(exYear);
  expect(page.getByText('Confirmation Booking number:')).toBeVisible;
});

//test('Mastercard - valid data', async ({ page }) => {
//});

//test('No toggel selected - valid data', async ({ page }) => {
//});

//test('No toggel selected - invalid data', async ({ page }) => {
//});

//test('Visa - Empty card number', async ({ page }) => {
//});

//test('Mastercard - Empty card number', async ({ page }) => {
//});

//test('Visa - Expired card', async ({ page }) => {
//});

//test('Mastercard - Expired card', async ({ page }) => {
//});