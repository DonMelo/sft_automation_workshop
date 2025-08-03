import { test } from '@playwright/test';
import { POM } from '../POM Homework/POM';
import wrongDataSet from './utils/passengerWrongDetailsDataSet.json'
import dataSet from './utils/passengerDetailsDataSet.json'

for(const {label, firstName, lastName} of wrongDataSet){
    test(`${label}`, async ({page}) => {
    const POManager = new POM(page);
    const homeworkPage = POManager.getHomeworkPage();
    await homeworkPage.goToPage();
    await homeworkPage.logIn('agileway', 'testW1se');
    await homeworkPage.verifySuccSignIn();
    const flightDetailsPage = POManager.getFlightPage();
    await flightDetailsPage.submit();
    const passengerDetailsPage = POManager.getPassengerDetailsPage();
    await passengerDetailsPage.verifyPassengerDetailsHeader();
    await passengerDetailsPage.fillFirstAndLastNames(firstName, lastName);
    await passengerDetailsPage.clickSubmitButton();
    await passengerDetailsPage.verifyErrorAppears();
});
}

for(const {label, firstName, lastName} of dataSet){
    test(`${label}`, async ({page}) => {
    const POManager = new POM(page);
    const homeworkPage = POManager.getHomeworkPage();
    await homeworkPage.goToPage();
    await homeworkPage.logIn('agileway', 'testW1se');
    await homeworkPage.verifySuccSignIn();
    const flightDetailsPage = POManager.getFlightPage();
    await flightDetailsPage.submit();
    const passengerDetailsPage = POManager.getPassengerDetailsPage();
    await passengerDetailsPage.verifyPassengerDetailsHeader();
    await passengerDetailsPage.fillFirstAndLastNames(firstName, lastName);
    await passengerDetailsPage.clickSubmitButton();
    const paymentPage = POManager.getPaymentPage();
    await paymentPage.verifyPaymentHeader();
});
}