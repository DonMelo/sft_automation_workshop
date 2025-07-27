import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import { vars } from '../others/constants';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
});

test('Login with correct credentials', async ({ page }) => {
    await loginPage.enterUsername(vars.correct_username);
    await loginPage.enterPassword(vars.correct_password);
    await loginPage.submitSignIn();

    await expect(page.locator('#flash_notice')).toBeVisible();
});

test.describe('Login with incorrect credentials', () => {
	test('Login with incorrect credentials', async ({ page }) => {
		await loginPage.enterUsername(vars.incorrect_username);
		await loginPage.enterPassword(vars.incorrect_password);
		await loginPage.submitSignIn();

		await expect(page.locator('#flash_alert')).toBeVisible();
	})
	test('Login with empty credentials', async ({ page }) => {
		await loginPage.enterUsername('');
		await loginPage.enterPassword('');
		await loginPage.submitSignIn();

		await expect(page.locator('#flash_alert')).toBeVisible();
	});
	test('Login with only username', async ({ page }) => {
		await loginPage.enterUsername(vars.correct_username);
		await loginPage.enterPassword('');
		await loginPage.submitSignIn();

		await expect(page.locator('#flash_alert')).toBeVisible();
	});
	test('Login with only password', async ({ page }) => {
		await loginPage.enterUsername('');
		await loginPage.enterPassword(vars.correct_password);
		await loginPage.submitSignIn();

		await expect(page.locator('#flash_alert')).toBeVisible();
	});
	test('Login with incorrect username and correct password', async ({ page }) => {
		await loginPage.enterUsername(vars.incorrect_username);
		await loginPage.enterPassword(vars.correct_password);
		await loginPage.submitSignIn();

		await expect(page.locator('#flash_alert')).toBeVisible();
	});
	test('Login with correct username and incorrect password', async ({ page }) => {
		await loginPage.enterUsername(vars.correct_username);
		await loginPage.enterPassword(vars.incorrect_password);
		await loginPage.submitSignIn();

		await expect(page.locator('#flash_alert')).toBeVisible();
	});
	test('Login with incorrect username and password', async ({ page }) => {
		await loginPage.enterUsername(vars.incorrect_username);
		await loginPage.enterPassword(vars.incorrect_password);
		await loginPage.submitSignIn();

		await expect(page.locator('#flash_alert')).toBeVisible();
	});
});

test('Sign out', async ({ page }) => {
	await loginPage.enterUsername(vars.correct_username);
	await loginPage.enterPassword(vars.correct_password);
	await loginPage.submitSignIn();

	await loginPage.signOut();
	await expect(page.locator('#flash_notice')).toContainText('Signed out!');
});