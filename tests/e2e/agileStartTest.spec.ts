import { test, expect, Page } from '@playwright/test';
import { LogInPage } from './pom/agileLogIn.page';
import { StartPage } from './pom/agileStart.page';

let loginPage: LogInPage;
let startPage: StartPage;


test.beforeEach("Setup",async ({ page }) =>{
    loginPage = new LogInPage(page)
    await loginPage.goToPage();
    await loginPage.signIn("agileway", "testW1se");
    startPage = new StartPage(page)
})


test.describe("Returning flights", () => {
    test("Not inputing any data", async () => {
        await startPage.clickContinueButton();
        await startPage.checkErrorMessage("Invalid");
    })

    test("Not selecting 'From' location", async () => {
        await startPage.selectToLocation("New York")
        await startPage.clickContinueButton();
        await startPage.checkErrorMessage("Invalid");
    })

    test("Not selecting 'To' location", async () => {
        await startPage.selectFromLocation("San Francisco")
        await startPage.clickContinueButton();
        await startPage.checkErrorMessage("Invalid");
    })

    test("Departure date is later than returning date", async () => {
        await startPage.selectFromLocation("New York");
        await startPage.selectToLocation("New York");
        await startPage.selectDepartureDate("22", "April 2025")
        await startPage.selectReturnDate("05", "November 2016")
        await startPage.checkSecondFlight();
        await startPage.clickContinueButton();
        await startPage.checkErrorMessage("Invalid");

    })

    test("Invalid departure and returning dates", async () => {
        await startPage.selectFromLocation("New York");
        await startPage.selectToLocation("New York");
        await startPage.selectDepartureDate("02", "November 2016")
        await startPage.selectReturnDate("25", "November 2016")
        await startPage.checkFirstFlight();
        await startPage.clickContinueButton();
        await startPage.checkErrorMessage("Invalid");

    })


    test("Selecting no flights", async () => {
        await startPage.selectFromLocation("New York");
        await startPage.selectToLocation("New York");
        await startPage.selectDepartureDate("16", "November 2025")
        await startPage.selectReturnDate("25", "April 2026")
        await startPage.clickContinueButton();
        await startPage.checkErrorMessage("Invalid");

    })

    test("Selecting multiple flights", async () => {
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

    test("Selecting 1 flight", async () => {
        await startPage.selectFromLocation("New York");
        await startPage.selectToLocation("New York");
        await startPage.selectDepartureDate("16", "November 2025")
        await startPage.selectReturnDate("25", "April 2026")
        await startPage.checkThirdFlight();
        await startPage.clickContinueButton();
        await startPage.checkSuccessMessage("Successful");

    })

})

test.describe("One way flights", () => {


    test("Not inputing any data", async () => {
        await startPage.checkOneWayRadioButton();
        await startPage.clickContinueButton();
        await startPage.checkErrorMessage("Invalid");
    })

    test("Not selecting 'From' location", async () => {
        await startPage.selectToLocation("New York")
        await startPage.clickContinueButton();
        await startPage.checkErrorMessage("Invalid");
    })

    test("Not selecting 'To' location", async () => {
        await startPage.selectFromLocation("San Francisco")
        await startPage.clickContinueButton();
        await startPage.checkErrorMessage("Invalid");
    })

    test("Departure date is later than returning date", async () => {
        await startPage.selectFromLocation("New York");
        await startPage.selectToLocation("New York");
        await startPage.selectDepartureDate("22", "April 2025")
        await startPage.checkSecondFlight();
        await startPage.clickContinueButton();
        await startPage.checkErrorMessage("Invalid");

    })

    test("Invalid departure and returning dates", async () => {
        await startPage.selectFromLocation("New York");
        await startPage.selectToLocation("New York");
        await startPage.selectDepartureDate("02", "November 2016")
        await startPage.checkFirstFlight();
        await startPage.clickContinueButton();
        await startPage.checkErrorMessage("Invalid");

    })


    test("Selecting no flights", async () => {
        await startPage.selectFromLocation("New York");
        await startPage.selectToLocation("New York");
        await startPage.selectDepartureDate("16", "November 2025")
        await startPage.clickContinueButton();
        await startPage.checkErrorMessage("Invalid");

    })

    test("Selecting multiple flights", async () => {
        await startPage.selectFromLocation("New York");
        await startPage.selectToLocation("New York");
        await startPage.selectDepartureDate("16", "November 2025")
        await startPage.checkFirstFlight();
        await startPage.checkSecondFlight();
        await startPage.checkThirdFlight();
        await startPage.clickContinueButton();
        await startPage.checkErrorMessage("Invalid");

    })

    test("Selecting 1 flight", async () => {
        await startPage.selectFromLocation("New York");
        await startPage.selectToLocation("New York");
        await startPage.selectDepartureDate("16", "November 2025")
        await startPage.checkThirdFlight();
        await startPage.clickContinueButton();

        
        await startPage.checkSuccessMessage("Successful");

    })

})