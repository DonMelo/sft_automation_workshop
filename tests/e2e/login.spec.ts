import { test, expect } from '@playwright/test';
import { LoginPage } from 'e2e-tests/pom/login.page';
import { FlightPage } from 'e2e-tests/pom/flight.page';

let loginPage: LoginPage;
let flightPage: FlightPage;

test.beforeEach('setup', async ({page}) => {
    loginPage = new LoginPage(page);
    flightPage = new FlightPage(page);

    await loginPage.goTo();
})

test('Sign in with correct credentials and get success message', async ({ page }) => {
    await loginPage.enterCredentialsAndSignIn('agileway', 'testW1se');
    await flightPage.expectSuccessMessage('Signed in!');
})

test('Sign in with incorrect password fails', async ({ page }) => {
    await loginPage.enterCredentialsAndSignIn('agileway', '');
    await loginPage.expectLoginErrorMessage('Invalid email or password');
})

test('Sign in with incorrect username fails', async ({ page }) => {
    await loginPage.enterCredentialsAndSignIn('', 'testW1se');
    await loginPage.expectLoginErrorMessage('Invalid email or password');
})