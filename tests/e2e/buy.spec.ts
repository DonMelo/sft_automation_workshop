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
      await expect(page.locator('#flash_notice')).toContainText('Signed in!');
      await expect(page.locator('h2')).toContainText('Select Flight');
  })

  test('Purchase a reservation', async ({ page }) => {
    await flightBookingPage.selectFlight(FLIGHT_DETAILS);
    await flightBookingPage.fillPassengerDetails(PASSENGER_DETAILS);
    await flightBookingPage.fillPaymentDetails(CARD_DETAILS);

    await expect(page.locator("#confirmation > h2")).toHaveText('Confirmation');
    await expect(page.locator("#booking_number")).toBeDefined();
    await expect(page.locator('label:has-text("Passenger Details")')).toContainText(CARD_DETAILS.cardHolderName)
  })
})

