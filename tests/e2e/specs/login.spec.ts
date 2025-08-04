import { test, expect } from '@playwright/test';
import { users, messages, headers } from '../data/testData';
import { PageManager } from '../pom/PageManager';

/*
 * Login Functionality Tests
 *
 * This feature is critical because all users must authenticate before accessing any other functionality.
 * Tests cover both successful and invalid login.
 */

  let pageManager: PageManager;
  test.beforeEach(async ({page}) => {
    pageManager = new PageManager(page);
    await pageManager.basePage.goto();
  })

  test.describe('Valid tests for login and logout and register redirection', () => {
      test('should log in successfully with valid credentials', async ({ page }) => {
    
    await pageManager.loginPage.login(users.valid.username, users.valid.password);
    await expect(pageManager.basePage.successMessage).toHaveText(messages.loginSuccess);
  });

    test('Clicking on register button leads to register page', async ({page}) => {

      await pageManager.loginPage.register();
      await pageManager.basePage.waitForPageHeading(headers.registerPage);
    })

    test('User can login and logout', async ({page}) => {
      await pageManager.loginPage.login(users.valid.username, users.valid.password);
      await pageManager.basePage.logout();
      await expect(pageManager.basePage.successMessage).toHaveText(messages.logoutSuccess)
    })
  })

const invalidCases = [
  { name: 'invalid username and password', user: users.invalid },
  { name: 'blank username', user: users.blank_username },
  { name: 'blank password', user: users.blank_password },
  { name: 'both fields blank', user: users.blank_both }
];
test.describe('Login functionality - negative cases', () => {
  invalidCases.forEach(({ name, user }) => {
    test(`should show error for ${name}`, async ({ page }) => {
      await pageManager.loginPage.login(user.username, user.password);
      await expect(pageManager.basePage.errorMessage).toHaveText(messages.invalidLogin);
    });
  });
});

// This test fails because user is able to access flight search without login
test('Should show error when accessing /flights/start without login', async ({ page }) => {
  pageManager = new PageManager(page);
  await page.goto('/flights/start');
  await expect(pageManager.basePage.errorMessage).toBeVisible();
});