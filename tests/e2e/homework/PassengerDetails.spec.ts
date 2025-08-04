import { test, expect } from '@playwright/test';
import { POM } from '../POM Homework/POM';
import wrongDataSet from './utils/passengerWrongDetailsDataSet.json'
import dataSet from './utils/passengerDetailsDataSet.json'

for(const {label, firstName, lastName} of wrongDataSet){
    test(`${label}`, async ({page}) => {
    const POManager = new POM(page);
    const homeworkPage = POManager.getHomeworkPage();
    await homeworkPage.goToPage();
    await homeworkPage.logIn('agileway', 'testW1se');

    //Assert
    await expect(homeworkPage.notificationForSuccSignIn).toBeVisible();
    await expect(homeworkPage.notificationForSuccSignIn).toHaveText('Signed in!');
    console.log('✅ Prisijungta.');

    const flightDetailsPage = POManager.getFlightPage();
    await flightDetailsPage.submit();
    const passengerDetailsPage = POManager.getPassengerDetailsPage();

    //Assert
    await expect (passengerDetailsPage.Header).toHaveText('Passenger Details');

    await passengerDetailsPage.fillFirstAndLastNames(firstName, lastName);
    await passengerDetailsPage.clickSubmitButton();
    //Assert
    await expect(passengerDetailsPage.flashAlert).toBeVisible();
    await expect(passengerDetailsPage.flashAlert).toHaveText('Must provide last name');
});
}

for(const {label, firstName, lastName} of dataSet){
    test(`${label}`, async ({page}) => {
    const POManager = new POM(page);
    const homeworkPage = POManager.getHomeworkPage();
    await homeworkPage.goToPage();
    await homeworkPage.logIn('agileway', 'testW1se');

    //Assert
    await expect(homeworkPage.notificationForSuccSignIn).toBeVisible();
    await expect(homeworkPage.notificationForSuccSignIn).toHaveText('Signed in!');
    console.log('✅ Prisijungta.');

    const flightDetailsPage = POManager.getFlightPage();
    await flightDetailsPage.submit();
    const passengerDetailsPage = POManager.getPassengerDetailsPage();

    //Assert
    await expect (passengerDetailsPage.Header).toHaveText('Passenger Details');

    await passengerDetailsPage.fillFirstAndLastNames(firstName, lastName);
    await passengerDetailsPage.clickSubmitButton();
    const paymentPage = POManager.getPaymentPage();
    
    //Assert
    await expect(paymentPage.header).toHaveText('Pay by Credit Card');
});
}