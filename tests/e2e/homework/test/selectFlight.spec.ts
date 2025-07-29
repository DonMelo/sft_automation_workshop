import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/login.page';
import { PassengerDetailsPage } from '../pom/passengerDetails.page';
import { PaymentPage } from '../pom/payment.page';
import { SelectFlightPage } from '../pom/selectFlight.page';
const datasetReturn = JSON.parse(JSON.stringify(require("../utils/selectFlightReturnTestData.json")));
const datasetOneWay = JSON.parse(JSON.stringify(require("../utils/selectFlightOneWayTestData.json")));


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

for (const data of datasetReturn) {
    test(`select flight, two-way return type | ${data.fromCity} - ${data.toCity} | ${data.departDay} ${data.departMonth}, ${data.returnDay} ${data.returnMonth}`, async ( {page} ) => {
        const selectFlight = new SelectFlightPage(page);
        await selectFlight.selectTripType('Return');
        if (data.fromCity) await selectFlight.selectFromCity(data.fromCity);
        if (data.toCity) await selectFlight.selectToCity(data.toCity);
        if (data.departDay) await selectFlight.selectDepartDay(data.departDay);
        if (data.departMonth) await selectFlight.selectDepartMonth(data.departMonth);
        if (data.returnDay) await selectFlight.selectReturnDay(data.returnDay);
        if (data.returnMonth) await selectFlight.selectReturnMonth(data.returnMonth);
        if (data.flightIndex != -1) await selectFlight.selectFlight(data.flightIndex);
        await selectFlight.pressContinueButton();
        
        const passengerDetails = new PassengerDetailsPage(page);
        await passengerDetails.validateDepartDate(data.departDate);
        await passengerDetails.validateReturnDate(data.returnDate);
        await passengerDetails.validateDepartCities(data.fromCity, data.toCity);
        await passengerDetails.validateReturnCities(data.toCity, data.fromCity);

        await passengerDetails.enterFirstName('John');
        await passengerDetails.enterLastName('Smith');
        await passengerDetails.pressNextButton();

        const payment = new PaymentPage(page);
        await payment.selectCardType('Visa');
        await payment.enterCardNumber('1234567890');
        await payment.selectExpiryDate('01', '2027');
        await payment.pressNextButton();

        await payment.validateDepartDate(data.departDate);
        await payment.validateReturnDate(data.returnDate);
        await payment.validateDepartCities(data.fromCity, data.toCity);
        await payment.validateReturnCities(data.toCity, data.fromCity);
        await payment.validateFare('return', data.fromCity, data.toCity);
        expect((await payment.nameConfirmation.textContent())).toEqual("Passenger Details: John Smith");
        expect((await payment.nameField.inputValue())).toEqual("John Smith");
    })
}
for (const data of datasetOneWay) {
    test(`select flight, one-way return type | ${data.fromCity} - ${data.toCity} | ${data.departDay} ${data.departMonth}`, async ( {page} ) => {
        const selectFlight = new SelectFlightPage(page);
        await selectFlight.selectTripType('One way');
        if (data.fromCity) await selectFlight.selectFromCity(data.fromCity);
        if (data.toCity) await selectFlight.selectToCity(data.toCity);
        if (data.departDay) await selectFlight.selectDepartDay(data.departDay);
        if (data.departMonth) await selectFlight.selectDepartMonth(data.departMonth);
        if (data.flightIndex != -1) await selectFlight.selectFlight(data.flightIndex);
        await selectFlight.pressContinueButton();
        
        const passengerDetails = new PassengerDetailsPage(page);
        await passengerDetails.validateDepartDate(data.departDate);
        await passengerDetails.validateDepartCities(data.fromCity, data.toCity);
        
        await passengerDetails.enterFirstName('John');
        await passengerDetails.enterLastName('Smith');
        await passengerDetails.pressNextButton();

        const payment = new PaymentPage(page);
        await payment.selectCardType('Visa');
        await payment.enterCardNumber('1234567890');
        await payment.selectExpiryDate('01', '2027');
        await payment.pressNextButton();

        await payment.validateDepartDate(data.departDate);
        await payment.validateDepartCities(data.fromCity, data.toCity);
        await payment.validateFare('oneway', data.fromCity, data.toCity);
        expect((await payment.nameConfirmation.textContent())).toEqual("Passenger Details: John Smith");
        expect((await payment.nameField.inputValue())).toEqual("John Smith");
    });
}