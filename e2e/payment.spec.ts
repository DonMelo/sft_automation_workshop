//https://travel.agileway.net/flights/passenger
import { test, expect } from '@playwright/test';
import { PassengerDetailsPage } from '../automation_homework/tests/e2e/pom/passengerDetails.page'; 
import { StartPage } from '../automation_homework/tests/e2e/pom/start.page';
import { PaymentPage } from 'automation_homework/tests/e2e/pom/payment.page';
import { ConfirmationPage } from 'automation_homework/tests/e2e/pom/confirmation.page';

let passengerDetailsPage: PassengerDetailsPage;
let startPage: StartPage;
let paymentPage: PaymentPage;
let confirmationPage: ConfirmationPage;

const passengerName = 'John';
const lastName = 'Smith';
const expectedName = passengerName + ' ' + lastName;
const tripTypeOneWay = 'oneway';
const tripTypeRoundTrip = 'return';
const fromLocation = 'Sydney';
const toLocation = 'New York'; 
const departDay = '15';
const departMonth = '032026';   
const returnDay = '20';
const returnMonth = '032026';

const cardTypeMaster = "master";
const cardTypeVisa = "visa";
const cardNumber = '9876543';
const cardExpiryMonth = '04';
const cardExpiryYear = '2028';

test.beforeEach(async ({ page }) => {
    startPage = new StartPage(page);
    await startPage.goto();
    await startPage.searchFlights(tripTypeOneWay, fromLocation, toLocation, departDay, departMonth);
    passengerDetailsPage = new PassengerDetailsPage(page);
    passengerDetailsPage.fillPassengerDetails(passengerName, lastName);
    paymentPage = new PaymentPage(page);
});

test.describe('Passenger Details Page Tests', () => {
    test('Card holders name is prefilled', async ({ page }) => {
        await expect(paymentPage.cardHolderNameInput).toHaveValue(expectedName);
    });

    test('providing empty passenger details shows error', async ({ page }) => {
        await passengerDetailsPage.fillPassengerDetails('', '');
        await expect(page.locator('.error-message')).toBeVisible();
    });

    test('Clicking payment button shows cnfirmation page', async ({ page }) => {
        await paymentPage.fillPaymentDetails(cardTypeMaster, null, cardNumber, cardExpiryMonth, cardExpiryYear);
        await (paymentPage.payButton).click();
        confirmationPage = new ConfirmationPage(page);
        await expect(confirmationPage.heading).toBeVisible();
    }); 
});