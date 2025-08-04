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
const newName = 'Johnny Deo';
const tripType = 'return';
const fromPort = 'New York';
const toPort = 'Sydney';
const departDay = '14';
const departMonth = '032025';
const returnDay = '21';
const returnMonth = '032025';

const cardTypeMaster = "master";
const cardTypeVisa = "visa";
const cardNumber = '12345567';
const cardExpiryMonth = '02';
const cardExpiryYear = '2026';



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

test('Card holders name can be edited', async ({ page }) => {
    await paymentPage.cardHoldersName.fill('');
    await paymentPage.cardHoldersName.fill(newName);
})

test('Master: Clicking "Pay now" button after card details submission shows "Confirmation" section with passenger name from Passenger Details page', async ({ page }) => {
    await paymentPage.fillPaymentInfo(cardTypeMaster, null, cardNumber, cardExpiryMonth, cardExpiryYear);
    await (paymentPage.payNowButton).click();
    confirmationPage = new ConfirmationPage(page);
    await expect(confirmationPage.passengerDetails).toHaveText('Passenger Details: ' + expectedName);
})

test('Visa: Clicking "Pay now" button after card details submission shows "Confirmation" section with passenger name from Passenger Details page', async ({ page }) => {
    await paymentPage.fillPaymentInfo(cardTypeVisa, null, cardNumber, cardExpiryMonth, cardExpiryYear);
    await (paymentPage.payNowButton).click();
    confirmationPage = new ConfirmationPage(page);
    await expect(confirmationPage.passengerDetails).toHaveText('Passenger Details: ' + expectedName);
})

test.skip('Pay now button is disabled if card information is empty', async ({ page }) => {
    await paymentPage.fillPaymentInfo(null, null, '', '', '');
    await expect(paymentPage.payNowButton).toBeDisabled();
})