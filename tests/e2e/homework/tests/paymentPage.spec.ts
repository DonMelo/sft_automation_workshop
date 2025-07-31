import {test, expect} from '@playwright/test';
import { PageManager } from '../pageObject/poManager';
import { variables } from '../pageObject/config';

let pageManager:PageManager;

test.beforeEach('Go to page', async({page}) => {
    pageManager = new PageManager(page);
    await pageManager.login.goToPage();
    await pageManager.login.loginUser(variables.validUsername, variables.validPassword);
    await pageManager.startPage.oneWayTrip(variables.departFrom, variables.arriveTo, variables.departDay, variables.departMonth);
    await pageManager.passengerDetailsPage.enterPassengerDetails(variables.passengerFirstName, variables.passengerLastName);
});

test('Happy Path', async() => {
    await pageManager.paymentPage.fillPaymentForm(variables.creditCardName, variables.creditCardNumber, variables.creditCardMonth, variables.creditCardYear);
    await expect(pageManager.paymentPage.confirmation).toBeVisible();
    await expect(pageManager.paymentPage.bookingNumber).toBeVisible();
    await expect(pageManager.paymentPage.tripDetails).toContainText(`oneway ${variables.departFrom} to ${variables.arriveTo}`);
    await expect(pageManager.paymentPage.passengerDetails).toContainText(`Passenger Details: ${variables.passengerFirstName} ${variables.passengerLastName}`);
});

test('Fill out payment form without selecting card type', async() => {
        await pageManager.paymentPage.paymentFormWithoutCardType(variables.creditCardName, variables.creditCardNumber, variables.creditCardMonth, variables.creditCardYear);
        await expect(pageManager.paymentPage.confirmation).not.toBeVisible(); 
    });

test.describe('Fill out payment form without required details', () => {

    const testCases = [
        ['', variables.creditCardNumber, variables.creditCardMonth, variables.creditCardYear],
        [variables.creditCardName, '', variables.creditCardMonth, variables.creditCardYear],
        [variables.creditCardName, variables.creditCardNumber, '', '']
    ];

        for (const [cardName, cardNumber, cardMonth, cardYear] of testCases) {
            test(`Payment attempt with details: '${cardName}', '${cardNumber}', '${cardMonth}', '${cardYear}'`, async () => {
                await pageManager.paymentPage.fillPaymentForm(cardName, cardNumber, cardMonth, cardYear);
                await expect(pageManager.paymentPage.confirmation).not.toBeVisible();
            });
        }
});
