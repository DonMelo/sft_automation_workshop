import { test, expect } from '@playwright/test';
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
    fromCity: 'London',
    toCity: 'Paris',
    departMonth: 'December 2025',
    departDay: '10',
    returnMonth: 'December 2025',
    returnDay: '20',
    flightIndex: 0,
    firstName: 'Alice',
    lastName: 'Pierson',   
  }
];

test('Passenger Details', async ({ page }) => {
  // Step 1: Login
  const loginPage = new LoginPage(page);
  await loginPage.gotoTo();
  await loginPage.enterUsername('agileway');
  await loginPage.enterPassword('testW1se');
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
  await passengerDetails.enterLastName('Pierson'); 
  await passengerDetails.pressNextButton();

});
