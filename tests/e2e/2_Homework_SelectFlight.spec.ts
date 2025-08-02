import { test, expect } from '@playwright/test';
import { LoginPage } from 'tests/POM/1_Homework_Login.page';
import { SelectFlightsPage} from 'tests/POM/2_Homework_SelectFlight.page';

let loginPage : LoginPage;
let selectflightsPage : SelectFlightsPage;

const username = 'agileway';
const password = 'testW1se';


test('Login before booking flights', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.Login(username, password);
  await loginPage.assertLogin();
});

test.beforeEach('Go to flights page', async ({ page }) => {
  selectflightsPage = new SelectFlightsPage(page);
  await selectflightsPage.goto();
});

test('Toggle one way trip - assert return field is hidden', async ({ page }) => {
  selectflightsPage = new SelectFlightsPage(page);
  await selectflightsPage.onewayTripToggle();
  await selectflightsPage.notvisibleReturnTripFiels();
});

test('Toggle return trip - assert return field is visible', async ({ page }) => {
  selectflightsPage = new SelectFlightsPage(page);
  await selectflightsPage.returnTripToggle();
  await selectflightsPage.visibleReturnTripFiels();
});

test('Flyght booking for one way trip with valid data', async ({ page }) => {
  selectflightsPage = new SelectFlightsPage(page);
  await selectflightsPage.onewayTripToggle();
  await selectflightsPage.fromSanFrancisco();
  await selectflightsPage.toSydney();
  await selectflightsPage.departureDate('07','August 2026');
  await selectflightsPage.airline(':30 VA23 Virgin Australia');
  await selectflightsPage.clickContinue();
  await selectflightsPage.visiblePassengerDetails();
});

test('Flyght booking for return trip with valid data', async ({ page }) => {
  selectflightsPage = new SelectFlightsPage(page);
  await selectflightsPage.returnTripToggle();
  await selectflightsPage.fromSanFrancisco();
  await selectflightsPage.toSydney();
  await selectflightsPage.departureDate('07','August 2026');
  await selectflightsPage.returnDate('08', 'July 2026');
  await selectflightsPage.airline(':30 VA23 Virgin Australia');
  await selectflightsPage.clickContinue();
  await selectflightsPage.visiblePassengerDetails();
});

test('Flyght booking for one way trip with invalid data', async ({ page }) => {
  selectflightsPage = new SelectFlightsPage(page);
  await selectflightsPage.onewayTripToggle();
  await selectflightsPage.fromSydney();
  await selectflightsPage.toSydney();
  await selectflightsPage.departureDate('07','January 2025');
  await selectflightsPage.clickContinue();
  await selectflightsPage.notvisiblePassengerDetails();
  await selectflightsPage.visibleFlashAlert();
});
// Should be a BUG -> The system allows go to Sidney form Sidney on the same day, though currently there is only one airport.
// But the test passes

test('Flyght booking for return trip with invalid data - duplicate selections', async ({ page }) => {
  selectflightsPage = new SelectFlightsPage(page);
  await selectflightsPage.returnTripToggle();
  await selectflightsPage.fromSydney();
  await selectflightsPage.toSydney();
  await selectflightsPage.departureDate('07','August 2026');
  await selectflightsPage.departureDate('07','January 2025');
  await selectflightsPage.clickContinue();
  await selectflightsPage.notvisiblePassengerDetails();
  await selectflightsPage.visibleFlashAlert();
});
// Should be a BUG -> The system allows go to Sidney form Sidney on the same day, though currently there is only one airport.
// But the test passes

test('Flyght booking for one way trip with empty fields', async ({ page }) => {
  selectflightsPage = new SelectFlightsPage(page);
  await selectflightsPage.onewayTripToggle();
  await selectflightsPage.clickContinue();
  await selectflightsPage.notvisiblePassengerDetails();
  await selectflightsPage.visibleFlashAlert();
});
// Should be a BUG -> system allows leaving destination and origin fields empty with past dates (by default).
// But the test passes

test('Flyght booking for return trip with empty fields', async ({ page }) => {
  selectflightsPage = new SelectFlightsPage(page);
  await selectflightsPage.returnTripToggle();
  await selectflightsPage.clickContinue();
  await selectflightsPage.notvisiblePassengerDetails();
  await selectflightsPage.visibleFlashAlert();
});
// Should be a BUG -> system allows leaving destination and origin fields empty with past dates (by default).
// But the test passes
