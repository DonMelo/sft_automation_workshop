import {test, expect} from '@playwright/test';
import { PageManager } from '../pageObject/poManager';

let pageManager:PageManager;

test('Sign off', async ({page}) => {
    pageManager = new PageManager(page);
    await pageManager.login.goToPage();
    await pageManager.login.loginUser('agileway', 'testW1se');
    await pageManager.signOff.signOut();
    await expect(pageManager.signOff.logOutSuccess).toContainText('Signed out!');
});