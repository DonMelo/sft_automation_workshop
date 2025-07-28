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


const testCases = [
    ['', variables.validPassword],
    [variables.validUsername, ''],
    [variables.validUsername, variables.invalidPassword],
    [variables.invalidUsername, variables.validPassword],
];

test.describe('Negative login scenarios', () => {
    for (const [username, password] of testCases) {
    test(`Login attempt with username: "${username}" and password: "${password}"`, async () => {
        await pageManager.login.loginUser(username, password);
        await expect(pageManager.basePage.loginError).toBeVisible();
    });
    }
});
