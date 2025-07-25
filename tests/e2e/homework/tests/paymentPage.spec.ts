import {test, expect} from '@playwright/test';
import { PageManager } from '../pageObject/poManager';

let pageManager:PageManager;

test.beforeEach('Go to page', async({page}) => {
    pageManager = new PageManager(page);
    await pageManager.login.goToPage();
    await pageManager.login.loginUser('agileway', 'testW1se');
    await pageManager.startPage.oneWayTrip('New York', 'Sydney', '15', 'July 2026');
    await pageManager.passengerDetailsPage.enterPassengerDetails('Kristina', 'Cvirkaite');
});

test('Happy Path', async() => {
    await pageManager.paymentPage.fillPaymentForm('Kristina Cvirkaite', '123456', '07', '2027');
    await expect(pageManager.paymentPage.confirmation).toBeVisible();
    await expect(pageManager.paymentPage.bookingNumber).toBeVisible();
});

test.describe('Negative tests', () => {
    test('Fill out payment form without selecting card type', async() => {
        await pageManager.paymentPage.paymentFormWithoutCardType('Kristina Cvirkaite', '123456', '07', '2027');
        await expect(pageManager.paymentPage.bookingNumber).not.toBeVisible(); 
    });
})