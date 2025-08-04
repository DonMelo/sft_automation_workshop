import { test, expect } from '@playwright/test';
import { LoginPage } from './pom/login.page';
import { FlightPage } from './pom/flight.page';
import { CustomerPage } from './pom/customer.page';
import { PaymentPage } from './pom/payment.page';

test('Book a flight to New York', async ({ page }) => {

const loginPage = new LoginPage(page);
const flightPage = new FlightPage(page);
const customerPage = new CustomerPage(page);
const paymentPage = new PaymentPage(page);

await loginPage.gotoFlightPage();
await loginPage.Login();

await flightPage.selectTripType();
await flightPage.selectCityFrom();
await flightPage.selectCityTo();
await flightPage.selectDepartureDay();
await flightPage.selectDepartureMonthYear();
await flightPage.selectReturnDay();
await flightPage.selectReturnMonthYear();
await flightPage.selectFlightOption();
await flightPage.clickContinueButton();
await expect(page.locator('h2')).toHaveText('Passenger Details');

await customerPage.putPassengerDetails();
await expect(page.locator('h2')).toHaveText('Pay by Credit Card');

await paymentPage.selectCardType();
await paymentPage.putCardNumber();
await paymentPage.selectExpiryDate();
await paymentPage.clickPayNow();
await expect(page.locator('#confirmation div')).toContainText('New York');

});