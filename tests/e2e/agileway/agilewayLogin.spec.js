import { expect, test } from "playwright/test";
import {AgilewayLogin} from "../pom/agileway/agilewayLogin.page"
import { addAbortListener } from "events";
/*
  Issues/Questions (website)
register button leads to unfinished page
terms of conditions are unfinished
registry page heading "Heading New Staff" doesn't make any sense

No auth-guard for page, login is unnecessary
"remember me" button does nothing?

what is "origin" and "Destination" in flight select
why are there available times in the past? (2016 and 2021) 
no checks for return time being after departure time on return flights
why is it possible to travel from and to the same place 
allows to continue order without picking a time and airline if departure value left as default

time, flight no. and airline not shown in passaneger detail screen
nothing to make sure the details are correct 

why can the user change cardholders name in payment page if it was asked in the details page nad was auto filled in?
no card numbers validation check (empty, letters are valid)
too little info in general required for a flight booking
card expiry date options 2021 and 2016 


  Questions (homework)
regression tests without story = can't know what is a bug and what is a feature?? (don't want to regression test to keep a bug)
during workshop everything had its seperate function (many functions in POM), but making a function do multiple things ...
  seems more simple to understand and work with.
tests often show as failed without retries, can I fix that?
why do automated testing when there are so many obvious major bugs on the site? 
why do regression tests when so much of the site has to change in order to realistically work (as a flight booking service)
*/


let agilewayLogin;
test.beforeEach(async ({page}) =>{
  agilewayLogin = new AgilewayLogin(page);
  await agilewayLogin.gotoPage();
});

test.describe("Successful logins", () => {
  test('Succesful login', async ({page}) => {
    await agilewayLogin.fullLogin('agileway','testW1se');
    await expect(page).toHaveURL('https://travel.agileway.net/flights/start');
    await expect(page.locator('#flash_notice')).toBeVisible();
  });

});

test.describe("Failed logins", () => {  
  test('Incorrect username ', async ({page}) =>{
    await agilewayLogin.fullLogin('wrongUsername','testW1se');

    await expect(page.locator('#flash_alert')).toBeVisible();
  });
  test('Incorrect password', async ({page}) =>{
    await agilewayLogin.fullLogin('agileway','wrongPassword');

    await expect(page.locator('#flash_alert')).toBeVisible();
  });
  test('Incorrect username and password ', async ({page}) =>{
    await agilewayLogin.fullLogin('wrongUsername','wrongPassword');

    await expect(page.locator('#flash_alert')).toBeVisible();
  });
  
});
