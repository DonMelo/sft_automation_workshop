import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { SelectFlightPage } from '../Pages/selectFligth';
import { PassengerDetailsPage } from '../Pages/passengerDetails';

test('Passenger Details - missing last name should show alert', async ({ page }) => {
  // Step 1: Login
  const loginPage = new LoginPage(page);
  await loginPage.gotoTo();
  await loginPage.enterUsername('agileway');
  await loginPage.enterPassword('test$W1se');
  await loginPage.setRememberMe(true);
  await loginPage.signIn();

  // Step 2: Go to flight selection and choose flight
  const selectFlight = new SelectFlightPage(page);
  await selectFlight.goTo();
  await selectFlight.selectTripType('One way');
  await selectFlight.selectFromCity('New York');
  await selectFlight.selectToCity('Sydney');
  await selectFlight.selectDepartMonth('November 2025');
  await selectFlight.selectDepartDay('01');
  await selectFlight.selectFlight(1); // Assume a valid index
  await selectFlight.pressContinueButton();

  // Step 3: Passenger details
  const passengerDetails = new PassengerDetailsPage(page);
  await passengerDetails.enterFirstName('John');
  // No last name entered
  await passengerDetails.pressNextButton();

  // Step 4: Validate alert for missing last name
  await passengerDetails.expectMissingLastNameAlert();
});
