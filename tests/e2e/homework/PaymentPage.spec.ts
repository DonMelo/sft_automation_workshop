import { test, expect    } from '@playwright/test';
import { POM } from '../POM Homework/POM';
import paymentDataSet from './utils/paymentDataSet.json';

for(const {label, cardType, holderName, cardNum, expMonth, expYear} of paymentDataSet){
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
    
    await passengerDetailsPage.fillFirstAndLastNames('firstName', 'lastName');
    await passengerDetailsPage.clickSubmitButton();
    const paymentPage = POManager.getPaymentPage();

    //Assert
    await expect(paymentPage.header).toHaveText('Pay by Credit Card');
    await paymentPage.fillOutTheForm({cardType, holderName, cardNum, expMonth, expYear});

    //Assert
    await expect(paymentPage.confirmation).toBeVisible();
    await expect(paymentPage.confirmation).toHaveText('Confirmation');
    await expect(paymentPage.bookingNumber).toBeVisible();
});
}