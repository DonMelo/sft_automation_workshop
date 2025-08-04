import { test, expect } from '@playwright/test';
import { StartPage } from '../pom/start.page';
import { PassengerDetailsPage } from '../pom/passengerDetails.page';

let startPage: StartPage;
let passengerDetails: PassengerDetailsPage;

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
})

const passengerFirstName = 'John';
const passengerLastName = 'Doe';

test('User can fill passenger details after selecting flight and is redirected to Payment page', async ({ page }) => {
    await passengerDetails.fillPassengerDetails(passengerFirstName, passengerLastName);
    await passengerDetails.assertRedirectToPaymentPage();
})

test.skip('Providing empty passenger details throws an error', async ({ page })=> {
    await passengerDetails.fillPassengerDetails('', '');
    //error message, which would be defined in pom file, but in this case it's provided here
    const error = page.locator('error-message')
    await expect(error).toBeVisible();
    await expect(error).toHaveText('Passenger details must not be left blank.');
})