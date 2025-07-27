import {test, expect} from '@playwright/test';
import { PageManager } from '../pageObject/poManager';
import { variables } from '../pageObject/config';

let pageManager:PageManager;
test.beforeEach('Go to page', async({page}) => {
    pageManager = new PageManager(page);
    await pageManager.login.goToPage();
    await pageManager.login.loginUser(variables.validUsername, variables.validPassword);
    await pageManager.startPage.oneWayTrip(variables.departFrom, variables.arriveTo, variables.departDay, variables.departMonth);
});

test('Continue with valid user details', async ({page}) => {
    await pageManager.passengerDetailsPage.enterPassengerDetails(variables.passengerFirstName, variables.passengerLastName);
    await expect(page.locator('h2')).toContainText('Pay by Credit Card');
});

test.describe('Negative tests', () => {

    test('Continue without filling out first and last name', async () => {
        await pageManager.passengerDetailsPage.enterPassengerDetails('', ''); 
        await expect(pageManager.passengerDetailsPage.errorAlert).toBeVisible();
    });
    
    test('Continue without first name', async () => {
        await pageManager.passengerDetailsPage.enterPassengerDetails('', variables.passengerLastName);
        await expect(pageManager.passengerDetailsPage.errorAlert).toBeVisible();
    });
    
    test('Continue without last name', async () => {
        await pageManager.passengerDetailsPage.enterPassengerDetails(variables.passengerFirstName, '');
        await expect(pageManager.passengerDetailsPage.errorAlert).toBeVisible();
    });
});