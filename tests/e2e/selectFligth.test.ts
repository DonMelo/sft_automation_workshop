import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { SelectFlightPage } from '../Pages/selectFligth';
import { PassengerDetailsPage } from '../Pages/passengerDetails';

const flightScenarios = [
  {
    tripType: 'Return',
    fromCity: 'New York',
    toCity: 'Sydney',
    departMonth: 'November 2025',
    departDay: '01',
    returnMonth: 'December 2025',
    returnDay: '03',
    flightIndex: 0,
  },
  {
    tripType: 'One way',
    fromCity: 'San Francisco',
    toCity: 'Sydney',
    departMonth: 'October 2025',
    departDay: '15',
    flightIndex: 1,
  },
  {
    tripType: 'One way',
    fromCity: 'New York',
    toCity: '',
    departMonth: 'December 2025',
    departDay: '10',
    flightIndex: 0,
  },
  {
    tripType: 'Return',
    fromCity: 'New York',
    toCity: 'New York',
    departMonth: 'September 2025',
    departDay: '10',
    returnMonth: 'October 2025',
    returnDay: '01',
    flightIndex: 0,
  }
];

for (const scenario of flightScenarios) {
  test(`Flight selection: ${scenario.tripType} from ${scenario.fromCity} to ${scenario.toCity}`, async ({ page }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.gotoTo();
    await loginPage.enterUsername('agileway');
    await loginPage.enterPassword('testW1se');
    await loginPage.setRememberMe(true);
    await loginPage.signIn();

    // Step 2: Select flight
    const selectFlight = new SelectFlightPage(page);
    await selectFlight.goTo();
    await selectFlight.selectTripType(scenario.tripType);
    await selectFlight.selectFromCity(scenario.fromCity);
    await selectFlight.selectToCity(scenario.toCity);
    await selectFlight.selectDepartMonth(scenario.departMonth);
    await selectFlight.selectDepartDay(scenario.departDay);

    if (scenario.tripType === 'Return') {
      await selectFlight.selectReturnMonth(scenario.returnMonth!);
      await selectFlight.selectReturnDay(scenario.returnDay!);
    }

    await selectFlight.selectFlight(scenario.flightIndex);
    await selectFlight.pressContinueButton();

    // Step 3: Validate Passenger Details Page is visible
    const passengerPage = new PassengerDetailsPage(page);
    await expect(passengerPage.firstNameField).toBeVisible();
    await expect(passengerPage.lastNameField).toBeVisible();
    });
}
