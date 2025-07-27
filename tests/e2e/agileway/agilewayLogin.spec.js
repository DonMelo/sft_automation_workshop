import { expect, test } from "playwright/test";
import {AgilewayLogin} from "../pom/agileway/agilewayLogin.page"
/*TEST
flight select 

passanger details valid test
passanger details no lastname  test
passanger details no firstname  test
passanger details very long lastname  test
passanger details very long firstname  test
passanger details very short firstname  test
passanger details very short lastname  test


  Questions
register button leads to unfinished page
terms of conditions are unfinished
registry page heading "Heading New Staff" doesn't make any sense

No auth-guard for page, login is unnecessary
"remember me" button does nothing? (when having a session cookie still it shows login page, have to input credentials)   
signing out doesn't clear cookie 

what is "origin" and "Destination" in flight select
why are there available times in the past? (2016 and 2021) 
no checks for return time being after departure time on return flights
why is it possible to travel from and to the same place 
allows to continue order without picking a time and airline if departure value left as default


time, flight no. and airline not shown in passanegr detail screen
  make sure the details are correct 
the fare price is wierdly calculated

why can change cardholders name?
no card numbers validation check (no card allows purchase)
too little info in general required for a flight booking
card expiry date options 2021 and 2016 
*/


let agilewayLogin;
test.beforeEach(async ({page}) =>{
  agilewayLogin = new AgilewayLogin(page);
  await agilewayLogin.gotoPage();
});

test.describe("Successful login", () => {

  test('Successful login detailed', async ({page}) =>{
    await agilewayLogin.writeLoginUsername('agileway');
    await agilewayLogin.writeLoginPassword('testW1se'); 
    await agilewayLogin.clickLogin();
    
    await expect(page).toHaveURL('https://travel.agileway.net/flights/start');
  });
  test('Succesful login simple', async ({page}) => {
    await agilewayLogin.fullLogin('agileway','testW1se');
    await expect(page).toHaveURL('https://travel.agileway.net/flights/start');
  });

});

test.describe("Failed login", () => {
  test('Failed login detailed', async ({page}) =>{
    await agilewayLogin.writeLoginUsername('wrongUsername');
    await agilewayLogin.writeLoginPassword('wrongPassword');
    await agilewayLogin.clickLogin();
    
    await expect(page).toHaveURL('https://travel.agileway.net/sessions');
    await expect(page.locator('#flash_alert')).toBeVisible();
  });
  
  test('Failed login simple', async ({page}) =>{
    await agilewayLogin.fullLogin('wrongUsername','wrongPassword');

    await expect(page).toHaveURL('https://travel.agileway.net/sessions');
    await expect(page.locator('#flash_alert')).toBeVisible();
});
});
