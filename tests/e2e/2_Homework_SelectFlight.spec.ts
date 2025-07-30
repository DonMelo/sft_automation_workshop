import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://travel.agileway.net/flights/start');
});

test('Trip Type Toggle finctionality', async ({ page }) => {
  await page.getByRole('radio').nth(1).check();
  expect(page.locator('#returnTrip')).not.toBeVisible;
  await page.getByRole('radio').nth(0).check();
  expect(page.locator('#returnTrip')).toBeVisible;
});

test('Valid one way trip', async ({ page }) => {
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

test('Valid return trip', async ({ page }) => {
  await page.getByRole('radio').nth(0).check();
  await page.locator('select[name="fromPort"]').selectOption('San Francisco');
  await page.locator('select[name="toPort"]').selectOption('Sydney');
  await page.locator('#departDay').selectOption('07');
  await page.locator('#departMonth').selectOption('042026');
  await page.locator('#returnDay').selectOption('08');
  await page.locator('#returnMonth').selectOption('072026');
  expect(page.locator('#flights')).toBeVisible;
  await page.getByRole('row', { name: ':30 VA23 Virgin Australia' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Continue' }).click();
  expect(page.getByRole('heading', { name: 'Passenger Details' })).toBeVisible;
});

test('Invalid one way trip', async ({ page }) => {
  await page.getByRole('radio').nth(1).check();
  await page.locator('select[name="fromPort"]').selectOption('Sydney');
  await page.locator('select[name="toPort"]').selectOption('Sydney');
  await page.locator('#departDay').selectOption('07');
  await page.locator('#departMonth').selectOption('042026');
  expect(page.locator('#flights')).not.toBeVisible;
  await page.getByRole('button', { name: 'Continue' }).click();
  expect(page.getByRole('heading', { name: 'Passenger Details' })).not.toBeVisible;
  expect(page.locator('#flash_alert')).toBeVisible;
});
// Should be a BUG -> The system allows go to Sidney form Sidney on the same day, though currently there is only one airport.
// But the test passes
// FALSE POSITIVE!!!

test('Invalid return trip - Duplicate selections', async ({ page }) => {
  await page.getByRole('radio').nth(0).check();
  await page.locator('select[name="fromPort"]').selectOption('Sydney');
  await page.locator('select[name="toPort"]').selectOption('Sydney');
  await page.locator('#departDay').selectOption('07');
  await page.locator('#departMonth').selectOption('042026');
  await page.locator('#returnDay').selectOption('07');
  await page.locator('#returnMonth').selectOption('042026');
  expect(page.locator('#flights')).not.toBeVisible;
  await page.getByRole('button', { name: 'Continue' }).click();
  expect(page.getByRole('heading', { name: 'Passenger Details' })).not.toBeVisible;
  expect(page.locator('#flash_alert')).toBeVisible;
});
// Should be a BUG -> The system allows go to Sidney form Sidney on the same day, though currently there is only one airport.
// But the test passes
// FALSE POSITIVE!!!

test('Empty firlds in one way trip', async ({ page }) => {
  await page.getByRole('radio').nth(1).check();
  expect(page.locator('#flights')).not.toBeVisible;
  await page.getByRole('button', { name: 'Continue' }).click();
  expect(page.getByRole('heading', { name: 'Passenger Details' })).not.toBeVisible;
  expect(page.locator('#flash_alert')).toBeVisible;
});
//Should be a BUG -> system allows leaving destination and origin fields empty with past dates (by default).
// But the test passes
// FALSE POSITIVE!!!
test('Empty firlds in return trip', async ({ page }) => {
  await page.getByRole('radio').nth(0).check();
  expect(page.locator('#flights')).not.toBeVisible;
  await page.getByRole('button', { name: 'Continue' }).click();
  expect(page.getByRole('heading', { name: 'Passenger Details' })).not.toBeVisible;
  expect(page.locator('#flash_alert')).toBeVisible;
});
//Should be a BUG -> system allows leaving destination and origin fields empty with past dates (by default).
// But the test passes
// FALSE POSITIVE!!!
