import { test, expect } from '@playwright/test';
import { FlightBookingPage } from 'e2e-tests/pom/buy.page';
import { LoginPage } from 'e2e-tests/pom/login.page';
import { VALID_LOGIN_DETAILS, FLIGHT_DETAILS, PASSENGER_DETAILS, CARD_DETAILS } from '../consts';

let loginPage: LoginPage;
let flightBookingPage: FlightBookingPage;

test.describe('Travel Agileway E2E Tests', () => {
  test.beforeEach('setup', async ({page}) => {  
      loginPage = new LoginPage(page);
      flightBookingPage = new FlightBookingPage(page);

      await flightBookingPage.goTo();
      await loginPage.login(VALID_LOGIN_DETAILS);
      await expect(page).toHaveURL('https://travel.agileway.net/flights/start');
      await expect(loginPage.flashNotice).toHaveText('Signed in!');
      await expect(loginPage.selectFlight).toHaveText('Select Flight');
  })  

  test('Complete flight booking flow - select flight, fill passenger details, and process payment', async ({ page }) => {
    await flightBookingPage.selectFlightAndContinue(FLIGHT_DETAILS);
    await flightBookingPage.fillPassengerDetailsAndContinue(PASSENGER_DETAILS);
    await flightBookingPage.fillPaymentDetailsAndPay(CARD_DETAILS);

    await expect(flightBookingPage.confirmation).toHaveText('Confirmation');
    await expect(flightBookingPage.bookingNumber).toBeVisible();
    await expect(flightBookingPage.passengerDetails).toContainText(CARD_DETAILS.cardHolderName);
  })
})

