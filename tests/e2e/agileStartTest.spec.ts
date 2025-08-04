import { test, expect, Page } from '@playwright/test';
import { POM } from './pom/POM';
import { start } from 'repl';


let pom: POM;
let loginPage: any;
let startPage: any;


test.beforeEach("Setup",async ({ page }) =>{
    pom = new POM(page);
    loginPage = pom.getLoginPage();
    await loginPage.goToPage();
    await loginPage.signIn("agileway", "testW1se");
    startPage = pom.getStartPage();
})


// Return
test("Not inputing any data (Return)", async () => {
    await startPage.clickContinueButton();
    await startPage.checkErrorMessage("Invalid");
})

test("Not selecting 'From' location (Return)", async () => {
    await startPage.selectToLocation("New York")
    await startPage.clickContinueButton();
    await startPage.checkErrorMessage("Invalid");
})

test("Not selecting 'To' location (Return)", async () => {
    await startPage.selectFromLocation("San Francisco")
    await startPage.clickContinueButton();
    await startPage.checkErrorMessage("Invalid");
})

test("Departure date is later than returning date (Return)", async () => {
    await startPage.selectFromLocation("New York");
    await startPage.selectToLocation("New York");
    await startPage.selectDepartureDate("22", "April 2025")
    await startPage.selectReturnDate("05", "November 2016")
    await startPage.checkSecondFlight();
    await startPage.clickContinueButton();
    await startPage.checkErrorMessage("Invalid");

})

test("Invalid departure and returning dates (Return)", async () => {
    await startPage.selectFromLocation("New York");
    await startPage.selectToLocation("New York");
    await startPage.selectDepartureDate("02", "November 2016")
    await startPage.selectReturnDate("25", "November 2016")
    await startPage.checkFirstFlight();
    await startPage.clickContinueButton();
    await startPage.checkErrorMessage("Invalid");

})


test("Selecting no flights (Return)", async () => {
    await startPage.selectFromLocation("New York");
    await startPage.selectToLocation("New York");
    await startPage.selectDepartureDate("16", "November 2025")
    await startPage.selectReturnDate("25", "April 2026")
    await startPage.clickContinueButton();
    await startPage.checkErrorMessage("Invalid");

})

test("Selecting multiple flights (Return)", async () => {
    await startPage.selectFromLocation("New York");
    await startPage.selectToLocation("New York");
    await startPage.selectDepartureDate("16", "November 2025")
    await startPage.selectReturnDate("25", "April 2026")
    await startPage.checkFirstFlight();
    await startPage.checkSecondFlight();
    await startPage.checkThirdFlight();
    await startPage.clickContinueButton();
    await startPage.checkErrorMessage("Invalid");

})

test("Selecting 1 flight (Return)", async () => {
    await startPage.selectFromLocation("New York");
    await startPage.selectToLocation("New York");
    await startPage.selectDepartureDate("16", "November 2025")
    await startPage.selectReturnDate("25", "April 2026")
    await startPage.checkThirdFlight();
    await startPage.clickContinueButton();
    await startPage.checkSuccessMessage("Successful");

})

// One way

test("Not inputing any data (One way)", async () => {
    await startPage.checkOneWayRadioButton();
    await startPage.clickContinueButton();
    await startPage.checkErrorMessage("Invalid");
})

test("Not selecting 'From' location (One way)", async () => {
    await startPage.selectToLocation("New York")
    await startPage.clickContinueButton();
    await startPage.checkErrorMessage("Invalid");
})

test("Not selecting 'To' location (One way)", async () => {
    await startPage.selectFromLocation("San Francisco")
    await startPage.clickContinueButton();
    await startPage.checkErrorMessage("Invalid");
})

test("Departure date is later than returning date (One way)", async () => {
    await startPage.selectFromLocation("New York");
    await startPage.selectToLocation("New York");
    await startPage.selectDepartureDate("22", "April 2025")
    await startPage.checkSecondFlight();
    await startPage.clickContinueButton();
    await startPage.checkErrorMessage("Invalid");

})

test("Invalid departure and returning dates (One way)", async () => {
    await startPage.selectFromLocation("New York");
    await startPage.selectToLocation("New York");
    await startPage.selectDepartureDate("02", "November 2016")
    await startPage.checkFirstFlight();
    await startPage.clickContinueButton();
    await startPage.checkErrorMessage("Invalid");

})


test("Selecting no flights (One way)", async () => {
    await startPage.selectFromLocation("New York");
    await startPage.selectToLocation("New York");
    await startPage.selectDepartureDate("16", "November 2025")
    await startPage.clickContinueButton();
    await startPage.checkErrorMessage("Invalid");

})

test("Selecting multiple flights (One way)", async () => {
    await startPage.selectFromLocation("New York");
    await startPage.selectToLocation("New York");
    await startPage.selectDepartureDate("16", "November 2025")
    await startPage.checkFirstFlight();
    await startPage.checkSecondFlight();
    await startPage.checkThirdFlight();
    await startPage.clickContinueButton();
    await startPage.checkErrorMessage("Invalid");

})

test("Selecting 1 flight (One way)", async () => {
    await startPage.selectFromLocation("New York");
    await startPage.selectToLocation("New York");
    await startPage.selectDepartureDate("16", "November 2025")
    await startPage.checkThirdFlight();
    await startPage.clickContinueButton();

    
    await startPage.checkSuccessMessage("Successful");

})
