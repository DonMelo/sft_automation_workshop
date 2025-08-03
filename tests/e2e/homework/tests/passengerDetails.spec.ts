import { Login } from '../components/loginPage';
import {test, expect} from '@playwright/test';
import { FlightPage } from '../components/flightPage';
import { PassengerDetails } from '../components/passengerDetails';

let login: Login;
let flightPage: FlightPage;
test.beforeEach('go to page', async({page})=>{
    login = new Login (page);
    flightPage = new FlightPage (page);
    await login.goToPage();
    await login.login(login.defaultUsername, login.defaultPassword);
    await flightPage.flightSelection('New York', 'Sydney', '30', 'August 2025');
})

test('valid Passenger Details', async({page})=>{
    const passengerDetails = new PassengerDetails(page);
    await passengerDetails.passengerDetailsInput('Test', 'Testaitis');
    await expect(page.locator('h2')).toHaveText('Pay by Credit Card');
})

test.describe('invalid Passenger Details', () => {    

test('no input added', async ({page}) => {
    const passengerDetails = new PassengerDetails(page);
    await passengerDetails.passengerDetailsInput('', '');
    await expect(page.locator('#flash_alert')).toHaveText('Must provide last name'); 
})

test('last name not added', async ({page}) => {
    const passengerDetails = new PassengerDetails(page);
    await passengerDetails.passengerDetailsInput('Test', '');
    await expect(page.locator('#flash_alert')).toHaveText('Must provide last name');    
})
})
