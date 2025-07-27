import { Login } from '../components/loginPage';
import {test, expect} from '@playwright/test';
import { FlightPage } from '../components/flightPage';
import { PassengerDetails } from '../components/passengerDetails';
import { PayByCreditCard } from '../components/payByCreditCard';

let login: Login;
let flightPage: FlightPage;
let passengerDetails: PassengerDetails;
test.beforeEach('go to page', async({page})=>{
    login = new Login (page);
    flightPage = new FlightPage (page);
    passengerDetails = new PassengerDetails (page);
    await login.goToPage();
    await login.login('agileway', 'testW1se');
    await flightPage.flightSelection('New York', 'Sydney', '30', 'July 2025');
    await passengerDetails.passengerDetailsInput('Test', 'Testaitis');
})
test('valid Credit Card data', async({page})=>{
    const payByCreditCard = new PayByCreditCard(page);
    await payByCreditCard.payByCreditCardInput('Test Testaitis', '13579', '25', '2028');
    await expect(page.locator('#confirmation')).toBeVisible();
})

test.describe('invalid Credit Card data to be added', () => {    

test('no input added', async ({page}) => {
    const payByCreditCard = new PayByCreditCard(page);
    await payByCreditCard.payByCreditCardInput('', '', '01', '2025');
    await expect(page.locator('error')).toBeVisible(); 
})
test('invalid credit card validation added', async ({page}) => {
    const payByCreditCard = new PayByCreditCard(page);
    await payByCreditCard.payByCreditCardInput('Test Testaitis', '13579', '01', '2016');
    await expect(page.locator('error')).toBeVisible(); 
})
})