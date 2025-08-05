import { test, expect } from '@playwright/test';
import { POM } from '../POM Homework/POM';
import wrongDataSet from './utils/passengerWrongDetailsDataSet.json'
import dataSet from './utils/passengerDetailsDataSet.json'

test.beforeEach(async ({ page }) => {
    const POManager = new POM(page);
    const loginPage = POManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.login('agileway', 'testW1se');
    
    await expect(loginPage.successNotification).toBeVisible();
    await expect(loginPage.successNotification).toHaveText('Signed in!');
});

for(const {label, firstName, lastName} of wrongDataSet){
    test(`${label}`, async ({page}) => {
    const POManager = new POM(page);

    const flightDetailsPage = POManager.getFlightPage();
    await flightDetailsPage.submit();
    const passengerDetailsPage = POManager.getPassengerDetailsPage();

    await expect (passengerDetailsPage.header).toHaveText('Passenger Details');

    await passengerDetailsPage.fillFirstAndLastNames(firstName, lastName);
    await passengerDetailsPage.clickSubmitButton();

    await expect(passengerDetailsPage.flashAlert).toBeVisible();
    await expect(passengerDetailsPage.flashAlert).toHaveText('Must provide last name');
});
}

for(const {label, firstName, lastName} of dataSet){
    test(`${label}`, async ({page}) => {
    const POManager = new POM(page);

    const flightDetailsPage = POManager.getFlightPage();
    await flightDetailsPage.submit();
    const passengerDetailsPage = POManager.getPassengerDetailsPage();

    await expect (passengerDetailsPage.header).toHaveText('Passenger Details');

    await passengerDetailsPage.fillFirstAndLastNames(firstName, lastName);
    await passengerDetailsPage.clickSubmitButton();
    const paymentPage = POManager.getPaymentPage();
    
    await expect(paymentPage.header).toHaveText('Pay by Credit Card');
});
}