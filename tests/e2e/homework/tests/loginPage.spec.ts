import {test, expect} from '@playwright/test';
import { PageManager } from '../pageObject/poManager';
import { variables } from '../pageObject/config';

let pageManager:PageManager;

test.beforeEach('Go to page', async({page}) => {
    pageManager = new PageManager(page);
    await pageManager.login.goToPage();
});
    test('Login with valid details', async ({page}) => {
        await pageManager.login.loginUser(variables.validUsername, variables.validPassword);
        await expect(page.locator('#flash_notice')).toBeVisible();
    });

test.describe('Negative login scenarios', () => {
    test('Login without username', async ({page}) => {
        await pageManager.login.loginUser('', variables.validPassword);
        await expect(page.locator('#flash_alert')).toHaveText('Invalid email or password');
    });

    test('Login without password', async ({page}) => {
        await pageManager.login.loginUser(variables.validUsername, '');
        await expect(page.locator('#flash_alert')).toHaveText('Invalid email or password');
    });

    test('Login with invalid password', async ({page}) => {
        await pageManager.login.loginUser(variables.validUsername, variables.invalidPassword);
        await expect(page.locator('#flash_alert')).toHaveText('Invalid email or password');
    });

    test('Login with invalid username', async ({page}) => {
        await pageManager.login.loginUser(variables.invalidUsername, variables.validPassword);
        await expect(page.locator('#flash_alert')).toHaveText('Invalid email or password');
    });
});