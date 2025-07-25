import { test, expect } from '@playwright/test';
import { LoginPage } from './pom/login.page';
import { PassengerDetailsPage } from './pom/passengerdetails.page';
import { PaymentPage } from './pom/payment.page';
import { SelectFlightPage } from './pom/selectflight.page';

test.beforeEach('go to main site', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoToPage();
    await loginPage.enterUsername('agileway');
    await loginPage.enterPassword('test$W1se');
    await loginPage.setRememberMe(true);
    await loginPage.signIn();
    const selectFlight = new SelectFlightPage(page);
    await selectFlight.goToPage();
})

test('input all fields, two-way return type', async ( {page} ) => {
    const selectFlight = new SelectFlightPage(page);
    await selectFlight.selectTripType('Return');
    await selectFlight.selectFromCity('New York');
    await selectFlight.selectToCity('Sydney');
    await selectFlight.selectDepartDate('01', 'November 2025');
    await selectFlight.selectReturnDate('03', 'December 2025');
    await selectFlight.selectFlight(2);
    await selectFlight.pressContinueButton();
    
    //enter the rest of data
    const passengerDetails = new PassengerDetailsPage(page);
    //check if flight information is correct
    await passengerDetails.validateDepartDate('2025-11-01');
    await passengerDetails.validateReturnDate('2025-12-03');
    await passengerDetails.validateDepartCities('New York', 'Sydney');
    await passengerDetails.validateReturnCities('Sydney', 'New York');

    await passengerDetails.enterFirstName('John');
    await passengerDetails.enterLastName('Smith');
    await passengerDetails.pressNextButton();

    const payment = new PaymentPage(page);
    await payment.selectCardType('Visa');
    await payment.enterCardNumber('1234567890');
    await payment.selectExpiryDate('01', '2027');
    await payment.pressNextButton();

    //check if flight information is correct
    await payment.validateDepartDate('2025-11-01');
    await payment.validateReturnDate('2025-12-03');
    await payment.validateDepartCities('New York', 'Sydney');
    await payment.validateReturnCities('Sydney', 'New York');
    await payment.validateFlightName('John Smith');
    await payment.validateCardName('John Smith');
    await payment.validateFare('return', 'New York', 'Sydney');
})

test('input all fields, one-way return type', async ( {page} ) => {
    const selectFlight = new SelectFlightPage(page);
    await selectFlight.selectTripType('One way');
    await selectFlight.selectFromCity('New York');
    await selectFlight.selectToCity('Sydney');
    await selectFlight.selectDepartDate('01', 'November 2025');
    await selectFlight.selectFlight(2);
    await selectFlight.pressContinueButton();
    
    //enter the rest of data
    const passengerDetails = new PassengerDetailsPage(page);
    //check if flight information is correct
    await passengerDetails.validateDepartDate('2025-11-01');
    await passengerDetails.validateDepartCities('New York', 'Sydney');
    
    await passengerDetails.enterFirstName('John');
    await passengerDetails.enterLastName('Smith');
    await passengerDetails.pressNextButton();

    const payment = new PaymentPage(page);
    await payment.selectCardType('Visa');
    await payment.enterCardNumber('1234567890');
    await payment.selectExpiryDate('01', '2027');
    await payment.pressNextButton();

    //check if flight information is correct
    await payment.validateDepartDate('2025-11-01');
    await payment.validateDepartCities('New York', 'Sydney');
    await payment.validateFlightName('John Smith');
    await payment.validateCardName('John Smith');
    await payment.validateFare('oneway', 'New York', 'Sydney');
});