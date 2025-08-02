import { test, expect } from '@playwright/test';
import { LoginPage } from 'tests/POM/1_Homework_Login.page';
import { SelectFlightsPage} from 'tests/POM/2_Homework_SelectFlight.page';
import { PassengerDetailsAndPayment } from 'tests/POM/3_Homework_PassengerDetails_Payment.page';

let loginPage : LoginPage;
let selectflightsPage : SelectFlightsPage;
let passengerDetailAndPayment : PassengerDetailsAndPayment;

const username = 'agileway';
const password = 'testW1se';
const firstName = 'Vardenis';
const lastName = 'Pavardenis';
const cardNb = '12345';
const exMonth = '07';
const exYear = '2028';

test('Login before booking flights', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.Login(username, password);
});

test.beforeEach('Book a flight with valid data', async ({ page }) => {
  selectflightsPage = new SelectFlightsPage(page);
  await selectflightsPage.goto()
  await selectflightsPage.onewayTripToggle();
  await selectflightsPage.fromSanFrancisco();
  await  selectflightsPage.toSydney();
  await selectflightsPage.departureDate('07','August 2026');
  await selectflightsPage.airline(':30 VA23 Virgin Australia');
  await selectflightsPage.clickContinue();
  await selectflightsPage.visiblePassengerDetails();
});

test('Use valid first and last name', async ({ page }) => {
  passengerDetailAndPayment = new PassengerDetailsAndPayment (page);
  await passengerDetailAndPayment.passengerDetails(firstName, lastName);
  await passengerDetailAndPayment.visiblePaymentForm();
});

test('Leave the last name field empty', async ({ page }) => {
  passengerDetailAndPayment = new PassengerDetailsAndPayment (page);
  await passengerDetailAndPayment.passengerDetails(firstName, '');
  await passengerDetailAndPayment.FlashAlert();
});

test('First name field empty', async ({ page }) => {
  passengerDetailAndPayment = new PassengerDetailsAndPayment (page);
  await passengerDetailAndPayment.passengerDetails('', lastName);
  await passengerDetailAndPayment.FlashAlert();
});
//BUG - System shuoldn't allow booking without providing passengers name.

test('Visa payment with valid data', async ({ page }) => {
  passengerDetailAndPayment = new PassengerDetailsAndPayment (page);
  await passengerDetailAndPayment.passengerDetails(firstName, lastName);
  await passengerDetailAndPayment.visiblePaymentForm();
  await passengerDetailAndPayment.selectVisa();
  await passengerDetailAndPayment.paymentData(cardNb, exMonth, exYear)
  await passengerDetailAndPayment.visibleConfirmation();
});

test('Mastercard payment with valid data', async ({ page }) => {
  passengerDetailAndPayment = new PassengerDetailsAndPayment (page);
  await passengerDetailAndPayment.passengerDetails(firstName, lastName);
  await passengerDetailAndPayment.visiblePaymentForm();
  await passengerDetailAndPayment.selectMastercard();
  await passengerDetailAndPayment.paymentData(cardNb, exMonth, exYear)
  await passengerDetailAndPayment.visibleConfirmation();
});

test('No card selecter but all data is valid', async ({ page }) => {
  passengerDetailAndPayment = new PassengerDetailsAndPayment (page);
  await passengerDetailAndPayment.passengerDetails(firstName, lastName);
  await passengerDetailAndPayment.visiblePaymentForm();
  await  passengerDetailAndPayment.paymentData(cardNb, exMonth, exYear)
  await passengerDetailAndPayment.visibleConfirmation();
});

test('No card selected and card number is invalid', async ({ page }) => {
  passengerDetailAndPayment = new PassengerDetailsAndPayment (page);
  await passengerDetailAndPayment.passengerDetails(firstName, lastName);
  await passengerDetailAndPayment.visiblePaymentForm();
  await passengerDetailAndPayment.paymentData('Hello', exMonth, exYear)
  await passengerDetailAndPayment.notvisibleConfirmation();
  await passengerDetailAndPayment.paymentFlashAlert();
});
//BUG - Booking confirmation is shown and no flash alert is shown.

test('Visa payment selected, but the card number is left empty', async ({ page }) => {
  passengerDetailAndPayment = new PassengerDetailsAndPayment (page);
  await passengerDetailAndPayment.passengerDetails(firstName, lastName);
  await passengerDetailAndPayment.visiblePaymentForm();
  await passengerDetailAndPayment.selectVisa();
  await passengerDetailAndPayment.paymentData('', exMonth, exYear)
  await passengerDetailAndPayment.notvisibleConfirmation();
  await passengerDetailAndPayment.paymentFlashAlert();
});
//BUG - Booking confirmation is shown and no flash alert is shown.

test('Mastercard payment selected, but the card number is left empty', async ({ page }) => {
  passengerDetailAndPayment = new PassengerDetailsAndPayment (page);
  await passengerDetailAndPayment.passengerDetails(firstName, lastName);
  await passengerDetailAndPayment.visiblePaymentForm();
  await passengerDetailAndPayment.selectMastercard();
  await passengerDetailAndPayment.paymentData('', exMonth, exYear)
  await passengerDetailAndPayment.notvisibleConfirmation();
  await passengerDetailAndPayment.paymentFlashAlert();
});
//BUG - Booking confirmation is shown and no flash alert is shown.

test('Visa payment with expired card', async ({ page }) => {
  passengerDetailAndPayment = new PassengerDetailsAndPayment (page);
  await passengerDetailAndPayment.passengerDetails(firstName, lastName);
  await passengerDetailAndPayment.visiblePaymentForm();
  await passengerDetailAndPayment.selectVisa();
  await passengerDetailAndPayment.paymentData('', '01', '2016')
  await passengerDetailAndPayment.notvisibleConfirmation();
  await passengerDetailAndPayment.paymentFlashAlert();
});
//BUG - Booking confirmation is shown and no flash alert is shown.

test('Mastercard payment with expired card', async ({ page }) => {
  passengerDetailAndPayment = new PassengerDetailsAndPayment (page);
  await passengerDetailAndPayment.passengerDetails(firstName, lastName);
  await passengerDetailAndPayment.visiblePaymentForm();
  await passengerDetailAndPayment.selectMastercard();
  await passengerDetailAndPayment.paymentData('', '01', '2016')
  await passengerDetailAndPayment.notvisibleConfirmation();
  await passengerDetailAndPayment.paymentFlashAlert();
});
//BUG - Booking confirmation is shown and no flash alert is shown.
