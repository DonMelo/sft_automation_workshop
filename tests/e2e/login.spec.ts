import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/login.page';
import { StartPage } from '../pom/start.page';

test.use({ storageState: undefined});

let loginPage: LoginPage;
let startPage: StartPage;
test.beforeEach('setup', async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.goTo();
})

async function assertInvalidLogin(username:string, password: string) {
  await loginPage.login(username, password);
  await expect(loginPage.errorMessage).toHaveText('Invalid email or password');
}
test('Login with correct credentials is successful', async ({ page }) => {
  await loginPage.login('agileway', 'testW1se');
  await expect(loginPage.successMessage).toHaveText('Signed in!');
});

test('Redirect to flights start page after login', async ({ page}) => {
  await loginPage.login('agileway', 'testW1se');
  await loginPage.assertRedirectToFlightsStartPage();
})

test('Password type is "password"', async () => {
  await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
})

test('Login with incorrect credentials is invalid', async ({ page }) => {
  await assertInvalidLogin('wrongname','wrongpassword');
});

test('Login with correct username and incorrect password is invalid', async ({ page }) => {
  await assertInvalidLogin('agileway','wrongpassword');
});

test('Login with incorrect username and correct password is invalid', async ({ page }) => {
  await assertInvalidLogin('wrongname','testW1se');
});

test('Login with empty username is invalid', async ({ page }) => {
  await assertInvalidLogin('', 'testW1se');
});

test('Login with empty password is invalid', async ({ page }) => {
  await assertInvalidLogin('agileway', '');
});

test('Login with empty credentials is invalid', async ({ page }) => {
  await assertInvalidLogin('', '');
});

test('User can logout successfully', async ({ page }) => {
  await loginPage.login('agileway', 'testW1se');
  await expect(loginPage.successMessage).toHaveText('Signed in!');
  startPage = new StartPage(page);
  await startPage.logoutButton.click();
  loginPage = new LoginPage(page);
  await expect(page).toHaveURL('https://travel.agileway.net/login');
  await expect(loginPage.successLogout).toHaveText('Signed out!');
})