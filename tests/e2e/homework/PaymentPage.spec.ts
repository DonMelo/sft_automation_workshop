import { test } from '@playwright/test';
import { POM } from '../POM Homework/POM';
import paymentDataSet from './utils/paymentDataSet.json';

for(const {label, cardType, holderName, cardNum, expMonth, expYear} of paymentDataSet){
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
    await passengerDetailsPage.fillFirstAndLastNames('firstName', 'lastName');
    await passengerDetailsPage.clickSubmitButton();
    const paymentPage = POManager.getPaymentPage();
    await paymentPage.verifyPaymentHeader();
    await paymentPage.fillOutTheForm({cardType, holderName, cardNum, expMonth, expYear});
    await paymentPage.verifyConfirmationAppears();
});
}