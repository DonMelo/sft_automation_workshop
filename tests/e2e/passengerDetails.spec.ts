import { test, expect } from '@playwright/test';
import { StartPage } from '../pom/start.page';
import { PassengerDetailsPage } from '../pom/passengerDetails.page';

let startPage: StartPage;
let passengerDetails: PassengerDetailsPage;
test.beforeEach('setup', async ({page}) => {
    startPage = new StartPage(page);
    await startPage.goTo();
    await startPage.fillTripDetails('return', 'New York', 'Sydney', '14', '032025', '21', '032025');

    passengerDetails = new PassengerDetailsPage(page);
})

const passengerFirstName = 'John';
const passengerLastName = 'Doe';

test('User can fill passenger details after selecting flight and is redirected to Payment page', async ({ page }) => {
    await passengerDetails.fillPassengerDetails(passengerFirstName, passengerLastName);
    await passengerDetails.assertRedirectToPaymentPage();
})