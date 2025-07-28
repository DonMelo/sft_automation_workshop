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

test.describe('Negative tests', () => {
    test('Fill out payment form without selecting card type', async() => {
        await pageManager.paymentPage.paymentFormWithoutCardType(variables.creditCardName, variables.creditCardNumber, variables.creditCardMonth, variables.creditCardYear);
        await expect(pageManager.paymentPage.confirmation).not.toBeVisible(); 
    });

    test('Fill out payment form without card holders name', async() => {
        await pageManager.paymentPage.fillPaymentForm('', variables.creditCardNumber, variables.creditCardMonth, variables.creditCardYear);
        await expect(pageManager.paymentPage.confirmation).not.toBeVisible();
    });

    test('Fill out payment form without card number', async() => {
        await pageManager.paymentPage.fillPaymentForm(variables.creditCardName, '', variables.creditCardMonth, variables.creditCardYear);
        await expect(pageManager.paymentPage.confirmation).not.toBeVisible();
    });

    test('Fill out payment form without expiry date', async() => {
        await pageManager.paymentPage.fillPaymentForm(variables.creditCardName, variables.creditCardNumber, '', '');
        await expect(pageManager.paymentPage.confirmation).not.toBeVisible();
    });
})