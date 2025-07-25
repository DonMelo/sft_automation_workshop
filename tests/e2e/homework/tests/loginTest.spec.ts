import { Login } from '../components/login.page';
import {test, expect} from '@playwright/test';


test.describe('valid login', () => {
test('Login', async ({page}) => {
        const login=new Login(page);
        await login.goToPage();
        await login.login('agileway', 'testW1se');
        await expect(page.locator('#flash_notice')).toBeVisible();
    })
})
test.describe('invalid login', () => {
test('login without username', async ({page}) => {
        const login=new Login(page);
        await login.goToPage();
        await login.login('', 'testW1se');
        await expect(page.locator('#flash_alert')).toBeVisible();
    })
test('login with invalid password', async ({page}) => {
        const login=new Login(page);
        await login.goToPage();
        await login.login('agileway', 'testW1seQA');
        await expect(page.locator('#flash_alert')).toBeVisible();
    })
})
