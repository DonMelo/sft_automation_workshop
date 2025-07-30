import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Negative Login Tests', () => {
  test('Wrong username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('wronguser', 'testW1se');
    await expect(page.locator('.error')).toContainText('Invalid username or password');
  });

  test('Wrong password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('agileway', 'wrongPassword');
    await expect(page.locator('.error')).toContainText('Invalid username or password');
  });
});
