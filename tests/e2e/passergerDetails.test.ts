import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { SelectFlightPage } from '../Pages/selectFligth';
import { PassengerDetailsPage } from '../Pages/passengerDetails';

const testData = [
  {
    username: 'agileway',
    password: 'testW1se',
    tripType: 'One way',
    fromCity: 'New York',
    toCity: 'Sydney',
    departMonth: 'November 2025',
    departDay: '01',
    flightIndex: 1,
    firstName: 'John',
    lastName: 'Lonsson',
  },
  {
    username: 'agileway',
    password: 'testW1se',
    tripType: 'Return',
    fromCity: 'San Francisco',
    toCity: 'New York',
    departMonth: 'December 2025',
    departDay: '10',
    returnMonth: 'December 2025',
    returnDay: '20',
    flightIndex: 0,
    firstName: 'Alice',
    lastName: 'Pierson',
  },
  {
    username: 'agileway',
    password: 'testW1se',
    tripType: 'One way',
    fromCity: 'New York',
    toCity: 'Sydney', 
    departMonth: 'December 2025',
    departDay: '10',
    flightIndex: 0,
    firstName: 'Alice',
    lastName: 'Pierson',
  }
];

test.describe('Passenger Details Test Suite', () => {
  testData.forEach((data, index) => {
    test(`Test Case #${index + 1}: ${data.tripType} from ${data.fromCity} to ${data.toCity}`, async ({ page }) => {
      // Step 1: Login
      const loginPage = new LoginPage(page);
      await loginPage.gotoTo();
      await loginPage.enterUsername(data.username);
      await loginPage.enterPassword(data.password);
      await loginPage.setRememberMe(true);
      await loginPage.signIn();

      // Step 2: Select flight
      const selectFlight = new SelectFlightPage(page);
      await selectFlight.goTo();
      await selectFlight.selectTripType(data.tripType);
      await selectFlight.selectFromCity(data.fromCity);

      if (data.toCity) {
        await selectFlight.selectToCity(data.toCity);
      }

      await selectFlight.selectDepartMonth(data.departMonth);
      await selectFlight.selectDepartDay(data.departDay);

      if (data.tripType === 'Return') {
        await selectFlight.selectReturnMonth(data.returnMonth!);
        await selectFlight.selectReturnDay(data.returnDay!);
      }

      await selectFlight.selectFlight(data.flightIndex);
      await selectFlight.pressContinueButton();

      // Step 3: Passenger details
      const passengerDetails = new PassengerDetailsPage(page);
      await passengerDetails.enterFirstName(data.firstName);
      await passengerDetails.enterLastName(data.lastName);
      await passengerDetails.pressNextButton();
    });
  });
});
