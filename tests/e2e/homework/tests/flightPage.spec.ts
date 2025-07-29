import { Login } from '../components/loginPage';
import {test, expect} from '@playwright/test';
import { FlightPage } from '../components/flightPage';

let login:Login;
test.beforeEach('go to page', async({page})=>{
    login = new Login (page);
    await login.goToPage();
    await login.login('agileway', 'testW1se');
})

test('valid One Way Flight Selection', async({page})=>{
    const flightPage = new FlightPage(page);
    await flightPage.flightSelection('New York', 'Sydney', '30', 'July 2025');
    await expect(page.locator('h2')).toHaveText('Passenger Details');
   })
test.describe('invalid One Way Flight Selection', () => {

test('same from to data selected for One Way Flight', async({page})=>{
    const flightPage = new FlightPage(page);
    await flightPage.flightSelection('New York', 'New York', '30', 'July 2025');
    await expect(page.locator('error')).toBeVisible();
})

test('past date for the selected One Way flight', async({page})=>{
    const flightPage = new FlightPage(page);
    await flightPage.flightSelection('New York', 'Sydney', '01', 'July 2025');
    await expect(page.locator('error')).toBeVisible();
})
})


