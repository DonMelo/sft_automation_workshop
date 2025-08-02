import { test, expect } from '@playwright/test';
import { LoginPage } from 'tests/POM/1_Homework_Login.page';

let loginPage : LoginPage;

const username = 'agileway';
const password = 'testW1se';

test.beforeEach('Go to page', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

test('Valid Login', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.Login(username, password);
  await loginPage.assertLogin();
});

test('Logout after valid login', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.Login(username, password);
  await loginPage.logout();
  await loginPage.assertLogout();
})
test('Invalid Login with invalid username', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.Login('agilewayyy', password);
  await loginPage.assertLoginFailed();
});

test('Invalid Login with invalid password', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.Login(username, 'testW1seeee');
  await loginPage.assertLoginFailed();
});

test('Invalid Login with empty username', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.Login('', password);
  await loginPage.assertLoginFailed();
});

test('Invalid Login with empty password', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.Login(username, '');
  await loginPage.assertLoginFailed();
});

test('"Remember me" with valid login and check if it works after logging out', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.rememberme();
  await loginPage.Login(username, password);
  await loginPage.assertLogin();

  await loginPage.logout();
  await loginPage.assertLogout();

  await loginPage.goto();
  await expect(page.locator('#username')).toHaveValue(username);
  await expect(page.locator('#password')).toHaveValue(password);
});
// BUG -> "Remember me" functionality is not working
