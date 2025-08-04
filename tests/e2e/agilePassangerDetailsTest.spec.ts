import { test, expect, Page } from '@playwright/test';
import { POM } from './pom/POM';
import { start } from 'repl';

let pom: POM;
let loginPage: any;
let startPage: any;
let passangerDetailsPage: any;


test.beforeEach("Setup",async ({ page }) =>{
    pom = new POM(page);
    loginPage = pom.getLoginPage();
    await loginPage.goToPage();
    await loginPage.signIn("agileway", "testW1se");
    startPage = pom.getStartPage();
    await startPage.selectFromLocation("New York");
    await startPage.selectToLocation("New York");
    await startPage.selectDepartureDate("16", "November 2025")
    await startPage.selectReturnDate("25", "April 2026")
    await startPage.checkThirdFlight();
    await startPage.clickContinueButton();
    passangerDetailsPage = pom.getPassangerDetailsPage();

})


test("Valid first name and last name", async () => {
    
    await passangerDetailsPage.inputFirstName("John")
    await passangerDetailsPage.inputLastName("Jacobs")
    await passangerDetailsPage.clickNextButton();
    await passangerDetailsPage.checkSuccessMessage("Successful")
})

test("empty first name and last name", async () => {
    await passangerDetailsPage.clickNextButton();
    await passangerDetailsPage.checkErrorMessage("Must provide")
})

test("empty first name", async ({page}) => {
    
    await passangerDetailsPage.inputLastName("Jonathan")

    await passangerDetailsPage.clickNextButton();
    await passangerDetailsPage.checkErrorMessage("Must provide")
})

test("numbers in first name", async () => {
    
    await passangerDetailsPage.inputFirstName("Jo4na89");
    await passangerDetailsPage.inputLastName("Miller")

    await passangerDetailsPage.clickNextButton();
    await passangerDetailsPage.checkErrorMessage("Invalid")
})

test("special characters first name", async () => {
    
    await passangerDetailsPage.inputFirstName("@\n$$!_-\\/")
    await passangerDetailsPage.inputLastName("James")

    await passangerDetailsPage.clickNextButton();
    await passangerDetailsPage.checkErrorMessage("Invalid")
})

test("empty last name", async () => {
    
    await passangerDetailsPage.inputFirstName("John");

    await passangerDetailsPage.clickNextButton();
    await passangerDetailsPage.checkErrorMessage("Must provide")
})

test("numbers in last name", async () => {
    
    await passangerDetailsPage.inputFirstName("John");
    await passangerDetailsPage.inputLastName("J4mes8946")

    await passangerDetailsPage.clickNextButton();
    await passangerDetailsPage.checkErrorMessage("Invalid")
})

test("special characters in last name", async () => {
    
    await passangerDetailsPage.inputFirstName("Jacob");
    await passangerDetailsPage.inputLastName("@\n$$!_-\\/")

    await passangerDetailsPage.clickNextButton();
    await passangerDetailsPage.checkErrorMessage("Invalid")
})

test("first name with 100 characters", async () => {
    
    await passangerDetailsPage.inputFirstName("vLrQeKfWgJyRaAmncHXkBZpTq"+
        "YtVbCdMSzEjuLFxDNwPoIGsUhMYqvRLeCKXatnJzBGOUykhNiTqWmVAExPbHs");
    await passangerDetailsPage.inputLastName("James")

    await passangerDetailsPage.clickNextButton();
    await passangerDetailsPage.checkErrorMessage("Invalid")
})

test("last name with 100 characters", async () => {
    

    await passangerDetailsPage.inputFirstName("James")
    await passangerDetailsPage.inputLastName("vLrQeKfWgJyRaAmncHXkBZpTq"+
        "YtVbCdMSzEjuLFxDNwPoIGsUhMYqvRLeCKXatnJzBGOUykhNiTqWmVAExPbHs");
    
    
    await passangerDetailsPage.clickNextButton();
    await passangerDetailsPage.checkErrorMessage("Invalid")
})


test("Non-ASCII first name and last name", async () => {
    
    await passangerDetailsPage.inputFirstName("Šarūnas")
    await passangerDetailsPage.inputLastName("Jonaitis")
    await passangerDetailsPage.clickNextButton();
    await passangerDetailsPage.checkSuccessMessage("Successful")
})

test.only("first name and Non-ASCII last name", async () => {
    
    await passangerDetailsPage.inputFirstName("Emily")
    await passangerDetailsPage.inputLastName("Žukauskaitė")
    await passangerDetailsPage.clickNextButton();

    await passangerDetailsPage.checkSuccessMessage("Successful")
})