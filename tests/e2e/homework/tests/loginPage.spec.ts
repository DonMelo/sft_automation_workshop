import {test, expect} from '@playwright/test';
import { PageManager } from '../pageObject/poManager';

let pageManager:PageManager;

test.beforeEach('Go to page', async({page}) => {
    pageManager = new PageManager(page);
    await pageManager.login.goToPage();
});
test.describe('Login with valid details', () => {
    test('Login', async ({page}) => {
        await pageManager.login.loginUser('agileway', 'testW1se');
        await expect(page.locator('#flash_notice')).toBeVisible();
    });
});

test.describe('Negative login scenarios', () => {

    test('Login without username', async ({page}) => {
        await pageManager.login.loginUser('', 'testW1se');
        await expect(page.locator('#flash_alert')).toHaveText('Invalid email or password');
    });

    test('Login without password', async ({page}) => {
        await pageManager.login.loginUser('agileway', '');
        await expect(page.locator('#flash_alert')).toHaveText('Invalid email or password');
    });

    test('Login with invalid password', async ({page}) => {
        await pageManager.login.loginUser('agileway', 'test1Wise');
    });
});