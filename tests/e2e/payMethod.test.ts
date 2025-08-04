import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { SelectFlightPage } from '../Pages/selectFligth';
import { PassengerDetailsPage } from '../Pages/passengerDetails';
import { PayMethodPage } from '../Pages/payMethodPage';

test('End-to-end flight booking including payment', async ({ page }) => {
  // Login
  const loginPage = new LoginPage(page);
    await loginPage.gotoTo();
    await loginPage.enterUsername('agileway');
    await loginPage.enterPassword('testW1se');
    await loginPage.setRememberMe(true);
    await loginPage.signIn();

  // Select flight
  const selectFlight = new SelectFlightPage(page);
  await selectFlight.goTo();
  await selectFlight.selectTripType('Return');
  await selectFlight.selectFromCity('New York');
  await selectFlight.selectToCity('Sydney');
  await selectFlight.selectDepartMonth('November 2025');
  await selectFlight.selectDepartDay('01');
  await selectFlight.selectReturnMonth('December 2025');
  await selectFlight.selectReturnDay('03');
  await selectFlight.selectFlight(1);
  await selectFlight.pressContinueButton();

  // Passenger details
  const passengerDetails = new PassengerDetailsPage(page);
  const passengerName = 'John Smith';
  await passengerDetails.enterFirstName('John');
  await passengerDetails.enterLastName('Smith');
  await passengerDetails.pressNextButton();

  // Payment
  const payPage = new PayMethodPage(page);
  await payPage.selectCardType('Visa');
  await payPage.enterName(passengerName);
  await payPage.enterCardNumber('4111111111111111');
  await payPage.selectExpiryDate('01', '2025');
  await payPage.confirmPayment();

});