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
        
        await expect(travelPage.page.locator('#flash_alert')).toHaveText('Invalid email or password');
    });

    test('should login', async ({ page }) => { //Login (valid credentials)
        const travelPage = new TravelPage(page);
        
        await travelPage.login('agileway','testW1se');
        await travelPage.pressSighInButton();

        await travelPage.verifyThatUserLoggedIn();
    });


    test('should login and select one way flight', async ({ page }) => { //One-Way flight booking 
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
        await travelPage.verifyThatUserLoggedIn();

        
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

     test('should login and select return flight', async ({ page }) => { //Return flight booking 
        const travelPage = new TravelPage(page);

        await travelPage.login('agileway','testW1se');
        await travelPage.pressSighInButton();
        await travelPage.verifyThatUserLoggedIn();

        await travelPage.selectTripType('return');  
        await travelPage.fillReturnFlightInformation('New York', 'Sydney', '02', '072025', '03', '082025');
        await travelPage.pressContinueButton();
        
        await travelPage.fillInPassangerDetails('Jurgita', 'Lizdene');
        await travelPage.pressNextButton();
  
        await travelPage.fillInCreditCardForm('visa', '1234 1234', '02', '2028');
        await travelPage.pressPayNow();
        
        await travelPage.verifyBookingInformationReturn('New York', 'Sydney', '02', '072025', '03', '082025', 'Jurgita', 'Lizdene');
        

    });

     test('should sign off', async ({ page }) => { //Sign-off (Logout)
        const travelPage = new TravelPage(page);

        await travelPage.login('agileway','testW1se');
        await travelPage.pressSighInButton();
        await travelPage.verifyThatUserLoggedIn();

        await travelPage.signOff();
        await travelPage.verifyThatUserSignedOff();
    });

    test('Last name required', async ({ page }) => { //Required field validation (Last name)
        const travelPage = new TravelPage(page);

        await travelPage.login('agileway','testW1se');
        await travelPage.pressSighInButton();
        await travelPage.verifyThatUserLoggedIn();
        
    
        await travelPage.selectTripType('oneway');
        await travelPage.fillOneWayFlightInformation('New York', 'Sydney', '02', '072025');
        await travelPage.pressContinueButton();
        
        await travelPage.fillInPassangerDetails('Jurgita','');
        await travelPage.pressNextButton();
        await travelPage.verifyThatLastNameRequired();
     });
}); 


 



