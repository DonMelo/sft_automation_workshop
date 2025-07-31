import {test, expect} from '@playwright/test';
import { PageManager } from '../pageObject/poManager';
import { variables } from '../pageObject/config';

let pageManager:PageManager;

test('Sign off', async ({page}) => {
    pageManager = new PageManager(page);
    await pageManager.login.goToPage();
    await pageManager.login.loginUser(variables.validUsername, variables.validPassword);
    await pageManager.signOff.signOut();
    await expect(pageManager.successAlert).toContainText('Signed out!');
});
