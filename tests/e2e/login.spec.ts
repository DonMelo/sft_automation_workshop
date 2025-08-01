import { test } from '@playwright/test';
import { LoginPage } from 'e2e-tests/pom/login.page';

let loginPage: LoginPage;

test.beforeEach('setup', async ({page}) => {
    loginPage = new LoginPage(page);

    await loginPage.goTo();
});

test('login is successful with valid data', async ({ page }) => {
    const successfulMessage = 'Signed in!';
    const username = 'agileway';
    const password = 'testW1se';

    await loginPage.login(username, password);
    await loginPage.assertSignedIn(successfulMessage);
});

test('login is unsuccessful with invalid data', async ({ page }) => {
    const unsuccessfulMessage = 'Invalid email or password';
    const username = 'agil';
    const password = 'test';

    await loginPage.login(username, password);
    await loginPage.assertLoginFailed(unsuccessfulMessage);
});

test('login is unsuccessful when fields are empty ', async ({ page }) => {
    const unsuccessfulMessage = 'Invalid email or password';
    const username = '';
    const password = '';

    await loginPage.login(username, password);
    await loginPage.assertLoginFailed(unsuccessfulMessage);
});