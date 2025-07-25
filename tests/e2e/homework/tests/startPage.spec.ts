import {test, expect} from '@playwright/test';
import { PageManager } from '../pageObject/poManager';

let pageManager:PageManager;

test.beforeEach('Go to page', async({page}) => {
    pageManager = new PageManager(page);
    await pageManager.login.goToPage();
    await pageManager.login.loginUser('agileway', 'testW1se');
});

test('All elements are displayed', async () => {
    await expect(pageManager.startPage.radioButtonReturn).toBeVisible();
    await expect(pageManager.startPage.radioButtonOneWay).toBeVisible();
    await expect(pageManager.startPage.selectFrom).toBeVisible();
    await expect(pageManager.startPage.selectTo).toBeVisible();
    await expect(pageManager.startPage.selectDepartDay).toBeVisible();
    await expect(pageManager.startPage.selectDepartMonth).toBeVisible();
    await expect(pageManager.startPage.selectReturnDay).toBeVisible();
    await expect(pageManager.startPage.selectReturnMonth).toBeVisible();
    await expect(pageManager.startPage.continueButton).toBeVisible();
});

test.describe('Happy path', () => {
    test('User selecting Return trip type', async ({page}) => {
        
    })
})