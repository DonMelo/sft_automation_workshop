import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import { vars } from '../others/constants';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
});

// Base case to ensure the login page loads correctly and the user is able to login with correct credentials
test('Login with correct credentials', async ({ page }) => {
    await loginPage.enterUsername(vars.correct_username);
    await loginPage.enterPassword(vars.correct_password);
    await loginPage.submitSignIn();

    await loginPage.expectNoticeVisible();
});

// Tests to ensure the login page handles incorrect credentials properly
test.describe('Login with incorrect credentials', () => {
	[
		{ "username": vars.incorrect_username, "password": vars.incorrect_password },
		{ "username": vars.correct_username, "password": vars.incorrect_password },
		{ "username": vars.incorrect_username, "password": vars.correct_password },
		{ "username": vars.correct_username, "password": "" },
		{ "username": "", "password": vars.correct_password },
		{ "username": "", "password": "" },
	].forEach(({ username, password }) => {
		test(`Login with username: "${username}" and password: "${password}"`, async ({ page }) => {
			await loginPage.enterUsername(username);
			await loginPage.enterPassword(password);
			await loginPage.submitSignIn();

			await loginPage.expectErrorVisible();
		});
	});
});

// Test to ensure the user can sign out successfully
test('Sign out', async ({ page }) => {
	await loginPage.enterUsername(vars.correct_username);
	await loginPage.enterPassword(vars.correct_password);
	await loginPage.submitSignIn();

	await loginPage.signOut();
	await loginPage.expectNoticeContainText('Signed out!');
});