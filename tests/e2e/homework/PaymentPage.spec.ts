import { test, expect } from '@playwright/test';
import { POM } from '../POM Homework/POM';
import paymentDataSet from './utils/paymentDataSet.json';
test.beforeEach(async ({ page }) => {
    const POManager = new POM(page);
    const loginPage = POManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.login('agileway', 'testW1se');

    await expect(loginPage.successNotification).toBeVisible();
    await expect(loginPage.successNotification).toHaveText('Signed in!');
});

for(const {label, cardType, holderName, cardNum, expMonth, expYear} of paymentDataSet){
    test(`${label}`, async ({page}) => {
    const POManager = new POM(page);

    const flightDetailsPage = POManager.getFlightPage();
    await flightDetailsPage.submit();
    const passengerDetailsPage = POManager.getPassengerDetailsPage();

    await expect (passengerDetailsPage.header).toHaveText('Passenger Details');
    
    await passengerDetailsPage.fillFirstAndLastNames('firstName', 'lastName');
    await passengerDetailsPage.clickSubmitButton();
    const paymentPage = POManager.getPaymentPage();

    await expect(paymentPage.header).toHaveText('Pay by Credit Card');
    await paymentPage.fillPaymentForm({cardType, holderName, cardNum, expMonth, expYear});

    await expect(paymentPage.confirmationMessage).toBeVisible();
    await expect(paymentPage.confirmationMessage).toHaveText('Confirmation');
    await expect(paymentPage.bookingNumber).toBeVisible();
});
}