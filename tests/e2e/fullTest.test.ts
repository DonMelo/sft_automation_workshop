import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { SelectFlightPage } from '../Pages/selectFligth';
import { PassengerDetailsPage } from '../Pages/passengerDetails';
import { PayMethodPage } from '../Pages/payMethodPage';

// Test data
const returnData = require('../utils/selectFligthWithReturn.json');
const oneWayData = require('../utils/selectFligthOneWayToFligth.json');

// Common login + navigation
test.beforeEach('Login and go to flight selection', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoTo();
  await loginPage.enterUsername('agileway');
  await loginPage.enterPassword('testW1se');
  await loginPage.setRememberMe(true);
  await loginPage.signIn();

  const flightPage = new SelectFlightPage(page);
  await flightPage.goTo();
});

// Return flights
for (const data of returnData) {
  test(`Booking (Return): ${data.fromCity} → ${data.toCity} | Depart ${data.departDay} ${data.departMonth} | Return ${data.returnDay} ${data.returnMonth}`, async ({ page }) => {
    const selectFlight = new SelectFlightPage(page);
    await selectFlight.selectTripType('Return');
    await selectFlight.selectFromCity(data.fromCity);
    await selectFlight.selectToCity(data.toCity);
    await selectFlight.selectDepartMonth(data.departMonth);
    await selectFlight.selectDepartDay(data.departDay);
    await selectFlight.selectReturnMonth(data.returnMonth);
    await selectFlight.selectReturnDay(data.returnDay);
    await selectFlight.selectFlight(data.flightIndex);
    await selectFlight.pressContinueButton();

    const passenger = new PassengerDetailsPage(page);
    await passenger.enterFirstName('John');
    await passenger.enterLastName('Smith');
    await passenger.pressNextButton();

    const pay = new PayMethodPage(page);
    await pay.selectCardType('Visa');
    await pay.enterName('John Smith');
    await pay.enterCardNumber('1234567890');
    await pay.selectExpiryDate('01', '2027');
    await pay.confirmPayment();

    await pay.validateDepartDate(data.departDate);
    await pay.validateReturnDate(data.returnDate);
    await pay.validateDepartCities(data.fromCity, data.toCity);
    await pay.validateReturnCities(data.toCity, data.fromCity);
    await pay.validateFare('return', data.fromCity, data.toCity);
    await pay.validateFlightName('John Smith');
    await pay.validateCardName('John Smith');
  });
}

// One-way flights
for (const data of oneWayData) {
  test(`Booking (One Way): ${data.fromCity} → ${data.toCity} | Depart ${data.departDay} ${data.departMonth}`, async ({ page }) => {
    const selectFlight = new SelectFlightPage(page);
    await selectFlight.selectTripType('One way');
    await selectFlight.selectFromCity(data.fromCity);
    await selectFlight.selectToCity(data.toCity);
    await selectFlight.selectDepartMonth(data.departMonth);
    await selectFlight.selectDepartDay(data.departDay);
    await selectFlight.selectFlight(data.flightIndex);
    await selectFlight.pressContinueButton();

    const passenger = new PassengerDetailsPage(page);
    await passenger.enterFirstName('John');
    await passenger.enterLastName('Smith');
    await passenger.pressNextButton();

    const pay = new PayMethodPage(page);
    await pay.selectCardType('Visa');
    await pay.enterName('John Smith');
    await pay.enterCardNumber('1234567890');
    await pay.selectExpiryDate('01', '2027');
    await pay.confirmPayment();

    await pay.validateDepartDate(data.departDate);
    await pay.validateDepartCities(data.fromCity, data.toCity);
    await pay.validateFare('oneway', data.fromCity, data.toCity);
    await pay.validateFlightName('John Smith');
    await pay.validateCardName('John Smith');
  });
}
