import { test, expect } from '@playwright/test';
import { LoginPage } from 'e2e-tests/pom/login.page';

let loginPage : LoginPage;

/** CORRECT CREDENTIALS */
test.describe('return selected', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    
    await loginPage.goTo();
    await loginPage.logIn('agileway', 'testW1se');
  });

  test('correct success message', async ({ page }) => {
    await loginPage.successMessage.waitFor({state: 'visible'});
    await expect(loginPage.successMessage).toHaveText('Signed in!');  
  });

  test('takes to start page', async ({ page }) => {
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL('https://travel.agileway.net/flights/start');
  });
});

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    
    await loginPage.goTo();
});

test('incorrect username', async ({ page }) => {
    await loginPage.logIn('agilewaytest', 'testW1se');

    await expect(loginPage.errorMessage).toBeVisible();
});

test('incorrect password', async ({ page }) => {
    await loginPage.logIn('agileway', 'testW1setest');

    await expect(loginPage.errorMessage).toBeVisible();
});

test('correct error message', async ({ page }) => {
    await loginPage.logIn('agileway', 'testW1setest');

    await expect(loginPage.errorMessage).toHaveText('Invalid email or password');
});








