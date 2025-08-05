import { test, expect } from '@playwright/test';
import { LoginPage } from '../automation_homework/tests/e2e/pom/login.page';

    let loginPage: LoginPage;

    const validUsername = 'agileway';
    const validPassword = 'testW1se';
    const invalidUsername = 'invalidUser';
    const invalidPassword = 'invalidPass';  

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('login successful with valid credentials', async ({ page }) => {
        await loginPage.login(validUsername, validPassword);
        await loginPage.expectSuccessMessage();
    });

    test('redirects to start page after successful login', async ({ page }) => {
        await loginPage.login(validUsername, validPassword);
        await loginPage.assertRedirectToStartPage();
    });

    test('login fails with invalid credentials', async ({ page }) => {
        await loginPage.login('invalidUser', 'invalidPass');
        await loginPage.expectErrorMessage();
    });

    test('login fails with empty username', async ({ page }) => {
        await loginPage.login('', validPassword);  
        await loginPage.expectErrorMessage();
    });

    test('login fails with empty password', async ({ page }) => {
        await loginPage.login(validUsername, '');      
        await loginPage.expectErrorMessage();
    });

    test('login fails with empty credentials', async ({ page }) => {
        await loginPage.login('', '');
        await loginPage.expectErrorMessage();
    });

    test('login fails with invalid username', async ({ page }) => {
        await loginPage.login(invalidUsername, validPassword);
        await loginPage.expectErrorMessage();
    });

    test('login fails with invalid password', async ({ page }) => {
        await loginPage.login(validUsername, invalidPassword);
        await loginPage.expectErrorMessage();
    });