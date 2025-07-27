import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/Login.page';



/*
 * Login Functionality Tests

 * This feature is critical because all users must authenticate before accessing any other functionality.
 * Tests cover both successful and invalid login.
 */


test.describe('Login functionality', () => {
    test('should log in successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.goto();
        await loginPage.login('agileway', 'testW1se');
        await expect(loginPage.welcomeMessage).toBeVisible();
    });

    test('should display an error message with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.goto();
        await loginPage.login('notauser', 'notapass');
        await expect(loginPage.errorMessage).toBeVisible();
    });
});