import { test, expect } from '@playwright/test';
import { LoginPage } from 'e2e-tests/pom/login.page';
import { FlightPage } from 'e2e-tests/pom/flight.page';
import { PassengerPage } from 'e2e-tests/pom/passenger.page';
import { CardPage } from 'e2e-tests/pom/card.page';

let loginPage: LoginPage;
let flightPage: FlightPage;
let passengerPage: PassengerPage;
let cardPage: CardPage;

test.beforeEach('setup', async ({page}) => {
    loginPage = new LoginPage(page);
    flightPage = new FlightPage(page);
    passengerPage = new PassengerPage(page);
    cardPage = new CardPage(page);

    await loginPage.goTo();
})

test('Fill in passenger info and check name and surname', async ({page}) => {
    await loginPage.enterCredentialsAndSignIn('agileway', 'testW1se');

    await flightPage.selectOneWayTrip();
    await flightPage.selectFromPort('New York');
    await flightPage.selectToPort('Sydney');
    await flightPage.selectDepartureDate('02', 'July 2025');
    await flightPage.selectFlightByIndex(0);
    await flightPage.clickContinue();

    await passengerPage.enterNameAndSurname('Testavimo', 'Ziurke');
    await passengerPage.clickNext();

    await expect(cardPage.cardHolderName).toHaveValue('Testavimo Ziurke');
})