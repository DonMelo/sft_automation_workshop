import { test, expect } from '@playwright/test';

const userName = 'agileway';
const password = 'testW1se';

test.beforeEach(async ({ page }) => {
  await page.goto('https://travel.agileway.net/login');
});

test('Valid Login', async ({ page }) => {
  await page.locator('#username').fill(userName);
  await page.locator('#password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.locator('#flash_notice')).toHaveText('Signed in!');

  await page.getByRole('link', { name: 'Sign off (agileway)' }).click();
  await expect(page.locator('#flash_notice')).toHaveText('Signed out!');
});

test('Invalid Login - Invalid username', async ({ page }) => {
  await page.locator('#username').fill('agilewayyy');
  await page.locator('#password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.locator('#flash_alert')).toHaveText('Invalid email or password');
});

test('Invalid Login - Invalid password', async ({ page }) => {
  await page.locator('#username').fill(userName);
  await page.locator('#password').fill('test$W1se');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.locator('#flash_alert')).toHaveText('Invalid email or password');
});

test('Invalid Login - empty username', async ({ page }) => {
  await page.locator('#username').fill('');
  await page.locator('#password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.locator('#flash_alert')).toHaveText('Invalid email or password');
});

test('Invalid Login - empty password', async ({ page }) => {
  await page.locator('#username').fill(userName);
  await page.locator('#password').fill('');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.locator('#flash_alert')).toHaveText('Invalid email or password');
});

test('Remember me', async ({ page }) => {
  await page.locator('#username').fill(userName);
  await page.locator('#password').fill(password);
  await page.locator('#remember_me').check();
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.locator('#flash_notice')).toHaveText('Signed in!');

  await page.getByRole('link', { name: 'Sign off (agileway)' }).click();
  await expect(page.locator('#flash_notice')).toHaveText('Signed out!');

  await page.goto('https://travel.agileway.net/login');
  await Promise.all([
    expect(page.locator('#username')).toHaveValue(userName),
    expect(page.locator('#password')).toHaveValue(password),
  ]);
});
// BUG -> "Remember me" functionality is not working
