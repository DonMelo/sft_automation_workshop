import { test, expect } from '@playwright/test';
import { users, messages } from '../data/testData';
import { PageManager } from '../pom/PageManager';

/*
 * Login Functionality Tests
 *
 * This feature is critical because all users must authenticate before accessing any other functionality.
 * Tests cover both successful and invalid login.
 */

  test('should log in successfully with valid credentials', async ({ page }) => {
    const pageManager = new PageManager(page);

    await pageManager.loginPage.goto();
    await pageManager.loginPage.login(users.valid.username, users.valid.password);
    await expect(pageManager.basePage.successMessage).toHaveText('Signed in!');
  });

const invalidCases = [
  { name: 'invalid username and password', user: users.invalid },
  { name: 'blank username', user: users.blank_username },
  { name: 'blank password', user: users.blank_password },
  { name: 'both fields blank', user: users.blank_both }
];
test.describe('Login functionality - negative cases', () => {
  invalidCases.forEach(({ name, user }) => {
    test(`should show error for ${name}`, async ({ page }) => {
      const pageManager = new PageManager(page);
      await pageManager.loginPage.goto();
      await pageManager.loginPage.login(user.username, user.password);
      await expect(pageManager.basePage.errorMessage).toHaveText(messages.invalidLogin);
    });
  });
});