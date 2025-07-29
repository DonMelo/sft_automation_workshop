import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('https://travel.agileway.net/login');
  await page.locator('#username').fill('agileway');
  await page.locator('#password').fill('testW1se');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('https://travel.agileway.net/flights/start');

  await page.context().storageState({ path: authFile });
});