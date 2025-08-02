import { test, expect } from '@playwright/test';
import { TravelPage } from './pom/travel.page';

// I chose to automate the main user actions: logging in, booking one-way and return flights, and logging out. 
// These are important features that can easily break if the system changes. I also added two negative 
// tests: one for wrong login details and one for a missing last name. 
// These tests help check that the system properly handles user input. 
// Overall, the tests make sure that the most important parts of the app keep working after updates.

test.describe('Travel Page', () => {
    test.beforeEach(async ({ page }) => {
        // Setup before each test: navigate to the Travel page
        const travelPage = new TravelPage(page);
        await travelPage.navigateToPage();
    });

    test('should show error when credentials are wrong', async ({ page }) => { //Login (invalid credentials)
        const travelPage = new TravelPage(page);

        await travelPage.login('agileway','neteisingasslaptazodis');
        await travelPage.pressSighInButton();
        
        expect(await travelPage.getFlashAlertText()).toHaveText('Invalid email or password');
    });

    test('should login', async ({ page }) => { //Login (valid credentials)
        const travelPage = new TravelPage(page);
        
        await travelPage.login('agileway','testW1se');
        await travelPage.pressSighInButton();

        expect(await travelPage.getFlashNoticeText()).toHaveText('Signed in!');
    });


    test('should login and fill one way flight details', async ({ page }) => { //One-Way flight booking 
        const travelPage = new TravelPage(page);


        const firstName = 'Jurgita';
        const lastName = 'Lizdene';
        const departingDay = '02'; 
        const departingMonth = '072025'; 
        const from = 'New York';
        const to = 'Sydney';
        const cardType = 'visa';
        const cardNumber = '1234 1234';
        const expireDay = '02';
        const expireYear = '2028';

        await travelPage.login('agileway','testW1se');
        await travelPage.pressSighInButton();

        await travelPage.selectTripType('oneway');
        await travelPage.fillOneWayFlightInformation(`${from}`, `${to}`, `${departingDay}`, `${departingMonth}`);
        await travelPage.pressContinueButton();
        
        await travelPage.fillInPassangerDetails(`${firstName}`, `${lastName}`);
        await travelPage.pressNextButton();
  
        await travelPage.fillInCreditCardForm(`${cardType}`, `${cardNumber}`, `${expireDay}`, `${expireYear}`);
        await travelPage.pressPayNow();
              
        await expect(travelPage.page.locator('#booking_number')).toBeVisible();
        
        const confirmationText = await travelPage.page.locator('#confirmation').innerText();
        const departureYear = departingMonth.slice(2, 6);
        const departureMonth = departingMonth.slice(0, 2);
        const departDate = `${departureYear}-${departureMonth}-${departingDay}`;

        await expect(confirmationText).toContain('(oneway Trip)');
        await expect(confirmationText).toContain(`${departDate} ${from} to ${to}`);
        await expect(confirmationText).toContain(`Passenger Details: ${firstName} ${lastName}`);


    });

     test('should login and fill return flight details', async ({ page }) => { //Return flight booking 
        const travelPage = new TravelPage(page);

        const firstName = 'Jurgita';
        const lastName = 'Lizdene';
        const departingDay = '02'; 
        const departingMonth = '072025'; 
        const returnDay = '03';
        const returnMonth = '082025';
        const from = 'New York';
        const to = 'Sydney';
        const cardType = 'visa';
        const cardNumber = '1234 1234';
        const expireDay = '02';
        const expireYear = '2028';

        await travelPage.login('agileway','testW1se');
        await travelPage.pressSighInButton();

        await travelPage.selectTripType('return');  
        await travelPage.fillReturnFlightInformation(`${from}`, `${to}`, `${departingDay}`, `${departingMonth}`, `${returnDay}`, `${returnMonth}`);
        await travelPage.pressContinueButton();
        
        await travelPage.fillInPassangerDetails(`${firstName}`, `${lastName}`);
        await travelPage.pressNextButton();
  
        await travelPage.fillInCreditCardForm(`${cardType}`, `${cardNumber}`, `${expireDay}`, `${expireYear}`);
        await travelPage.pressPayNow();

        await expect(travelPage.page.locator('#booking_number')).toBeVisible();
        const confirmationText = await travelPage.page.locator('#confirmation').innerText();
        const departDate = `${departingMonth.slice(2, 6)}-${departingMonth.slice(0, 2)}-${departingDay}`;
        const returnDate = `${returnMonth.slice(2, 6)}-${returnMonth.slice(0, 2)}-${returnDay}`;

        await expect(confirmationText).toContain('(return Trip)');
        await expect(confirmationText).toContain(`${departDate} ${from} to ${to}`);
        await expect(confirmationText).toContain(`${returnDate} ${to} to ${from}`);
        await expect(confirmationText).toContain(`Passenger Details: ${firstName} ${lastName}`);

    });

     test('should sign off', async ({ page }) => { //Sign-off (Logout)
        const travelPage = new TravelPage(page);

        await travelPage.login('agileway','testW1se');
        await travelPage.pressSighInButton();

        await travelPage.signOff();
        await expect(await travelPage.getFlashNoticeText()).toContain('Signed out!');
    });

    test('Last name required', async ({ page }) => { //Required field validation (Last name)
        const travelPage = new TravelPage(page);

        await travelPage.login('agileway','testW1se');
        await travelPage.pressSighInButton();
        
        await travelPage.selectTripType('oneway');
        await travelPage.fillOneWayFlightInformation('New York', 'Sydney', '02', '072025');
        await travelPage.pressContinueButton();
        
        await travelPage.fillInPassangerDetails('Jurgita','');
        await travelPage.pressNextButton();

        expect(await travelPage.getFlashAlertText()).toBe('Must provide last name');
     });
}); 


 



