import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { SelectFlightPage } from '../Pages/selectFligth';
import { PassengerDetailsPage } from '../Pages/passengerDetails';

test('Select a return flight after login', async ({ page }) => {
  // Step 1: Login
  const loginPage = new LoginPage(page);
    await loginPage.gotoTo();
    await loginPage.enterUsername('agileway');
    await loginPage.enterPassword('testW1se');
    await loginPage.setRememberMe(true);
    await loginPage.signIn();

  // Step 2: Go to flight selection
  const selectFlight = new SelectFlightPage(page);
  await selectFlight.goTo();
  await selectFlight.selectTripType('Return');
  await selectFlight.selectFromCity('New York');
  await selectFlight.selectToCity('Sydney');
  await selectFlight.selectDepartMonth('November 2025');
  await selectFlight.selectDepartDay('01');
  await selectFlight.selectReturnMonth('December 2025');
  await selectFlight.selectReturnDay('03');
  await selectFlight.selectFlight(0); 
  await selectFlight.pressContinueButton();

  // Step 3: Validate passenger detail step is reached
  const passengerPage = new PassengerDetailsPage(page);
  await expect(passengerPage.firstNameField).toBeVisible();
  await expect(passengerPage.lastNameField).toBeVisible();
});
