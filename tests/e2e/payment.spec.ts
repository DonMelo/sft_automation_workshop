import { test, expect } from '@playwright/test';
import { StartPage } from '../pom/start.page';
import { PassengerDetailsPage } from "../pom/passengerDetails.page";
import { PaymentPage } from '../pom/payment.page';
import { ConfirmationPage } from '../pom/confirmationSection.page';

let startPage: StartPage;
let passengerDetails: PassengerDetailsPage;
let paymentPage: PaymentPage;
let confirmationPage : ConfirmationPage;

const passengerFirstName = 'John';
const passengerLastName = 'Doe';
const expectedName = passengerFirstName + ' ' + passengerLastName;
const tripType = 'return';
const fromPort = 'New York';
const toPort = 'Sydney';
const departDay = '14';
const departMonth = '032025';
const returnDay = '21';
const returnMonth = '032025';

test.beforeEach('setup', async ({page}) => {
    startPage = new StartPage(page);
    await startPage.goTo();
    await startPage.fillTripDetails(tripType, fromPort, toPort, departDay, departMonth, returnDay, returnMonth);
    passengerDetails = new PassengerDetailsPage(page);
    passengerDetails.fillPassengerDetails(passengerFirstName, passengerLastName);
    paymentPage = new PaymentPage (page);
})

test('Card holders name is prefilled from the previous step', async ({ page }) => {
    await expect(paymentPage.cardHoldersName).toHaveValue(expectedName);
})
test('Clicking "Pay now" button after card details submission shows "Confirmation" section with passenger name from previous page', async ({ page }) => {
    await paymentPage.fillPaymentInfo("master", null, '12345567', '02', '2026');
    await page.getByRole('button', { name: 'Pay now' }).click();
    confirmationPage = new ConfirmationPage(page);
    await expect(confirmationPage.passengerDetails).toHaveText('Passenger Details: ' + expectedName);
})