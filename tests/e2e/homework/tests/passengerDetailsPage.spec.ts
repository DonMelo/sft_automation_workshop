import {test, expect} from '@playwright/test';
import { PageManager } from '../pageObject/poManager';

let pageManager:PageManager;
test.beforeEach('Go to page', async({page}) => {
    pageManager = new PageManager(page);
    await pageManager.login.goToPage();
    await pageManager.login.loginUser('agileway', 'testW1se');
    await pageManager.startPage.oneWayTrip('New York', 'Sydney', '15', 'July 2026');
});

test('Continue with valid user details', async ({page}) => {
    await pageManager.passengerDetailsPage.enterPassengerDetails('Kristina', 'Cvirkaite');
    await expect(page.locator('h2')).toContainText('Pay by Credit Card');
});

test.describe('Negative tests', () => {

    test('Continue without filling out first and last name', async () => {
        await pageManager.passengerDetailsPage.enterPassengerDetails('', ''); 
        await expect(pageManager.passengerDetailsPage.errorAlert).toBeVisible();
    });
    
    test('Continue without first name', async () => {
        await pageManager.passengerDetailsPage.enterPassengerDetails('', 'Cvirkaite');
        await expect(pageManager.passengerDetailsPage.errorAlert).toBeVisible();
    });
    
    test('Continue without last name', async () => {
        await pageManager.passengerDetailsPage.enterPassengerDetails('Kristina', '');
        await expect(pageManager.passengerDetailsPage.errorAlert).toBeVisible();
    });
});