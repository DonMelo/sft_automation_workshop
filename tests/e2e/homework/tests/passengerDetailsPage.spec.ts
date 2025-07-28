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
    await expect(pageManager.paymentPage.header).toBeVisible();

    const headerText = await pageManager.paymentPage.verifyPageHeader();
    expect(headerText).toBe('Pay by Credit Card');
});

const testCases = [
    ['', ''],
    [variables.validUsername, ''],
    [variables.validUsername, variables.invalidPassword],
    [variables.invalidUsername, variables.validPassword],
];

test.describe('Negative tests', () => {

    const testCases = [
        ['', ''],
        ['', variables.passengerLastName],
        [variables.passengerFirstName, ''],
    ];

test.describe('Negative tests', () => {
    for (const [passengerFirstName, passengerLastName] of testCases) {
        test(`Booking trip without passenger details '${passengerFirstName}', '${passengerLastName}'`, async () => {
            await pageManager.passengerDetailsPage.enterPassengerDetails(passengerFirstName, passengerLastName);
            await expect(pageManager.passengerDetailsPage.errorAlert).toBeVisible();
        });
    }
    });
});