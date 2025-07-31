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
        await expect(pageManager.successAlert).toBeVisible();
    });

test.describe('Negative login scenarios', () => {

    const testCases = [
        ['', variables.validPassword],
        [variables.validUsername, ''],
        [variables.validUsername, variables.invalidPassword],
        [variables.invalidUsername, variables.validPassword],
    ];

    for (const [username, password] of testCases) {
    test(`Login attempt with username: "${username}" and password: "${password}"`, async () => {
        await pageManager.login.loginUser(username, password);
        await expect(pageManager.errorAlert).toBeVisible();
    });
    }
});
