import { test, expect, Page } from '@playwright/test';
import { POM } from './pom/POM';
import { start } from 'repl';
import { LogInPage } from './pom/agileLogIn.page';
import { StartPage } from './pom/agileStart.page';
import { PassangerDetailsPage } from './pom/agilePassangerDetails.page';
import { PaymentPage } from './pom/agilePayment.page';

let pom: POM;
let loginPage: LogInPage;
let startPage: StartPage;
let passangerDetailsPage: PassangerDetailsPage;
let paymentPage: PaymentPage


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
    await passangerDetailsPage.inputFirstName("John")
    await passangerDetailsPage.inputLastName("Jacobs")
    await passangerDetailsPage.clickNextButton();


    paymentPage = pom.getPaymentPage();
})


test("Valid payment details", async ({page}) => {
    await paymentPage.selectCardType("master");
    await paymentPage.inputCardholdersName("John Jackson")
    await paymentPage.inputCardNumber("1234567890123456")
    await paymentPage.inputCardExpiryDate("05", "2027")
    await paymentPage.clickPayNowButton();
    await paymentPage.checkConfirmation();
})

test("Valid payment details without card type", async ({page}) => {
    await paymentPage.inputCardholdersName("John Jackson")
    await paymentPage.inputCardNumber("1234567890123456")
    await paymentPage.inputCardExpiryDate("05", "2027")
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Please select")
})

test("only first card holder's name", async ({page}) => {
    await paymentPage.selectCardType("visa");
    await paymentPage.inputCardholdersName("John")
    await paymentPage.inputCardNumber("1234567890123456")
    await paymentPage.inputCardExpiryDate("05", "2027")
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Invalid")
})


test("empty card holder's name", async ({page}) => {
    await paymentPage.selectCardType("master");
    await paymentPage.inputCardholdersName("")
    await paymentPage.inputCardNumber("1234567890123456")
    await paymentPage.inputCardExpiryDate("05", "2027")
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Please provide")
})

test("100 charactares cardholder's name", async ({page}) => {
    await paymentPage.selectCardType("visa");
    await paymentPage.inputCardholdersName("vLrQeKfWgJyRaAmncHXkBZpTq"+
        "YtVbCdMSzEjuLFxDNwPoIGsUhMYqvRLeCKXatnJzBGOUykhNiTqWmVAExPbHs")
    await paymentPage.inputCardNumber("1234567890123456")
    await paymentPage.inputCardExpiryDate("05", "2027")
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Invalid")
})


test("Non-ASCII card holder's name", async ({page}) => {
    await paymentPage.selectCardType("master");
    await paymentPage.inputCardholdersName("Šarūnas Čerkauskas")
    await paymentPage.inputCardNumber("1234567890123456")
    await paymentPage.inputCardExpiryDate("05", "2027")
    await paymentPage.clickPayNowButton();
    await paymentPage.checkConfirmation();
})

test("empty card number field", async({page})=>{
    await paymentPage.selectCardType("visa");
    await paymentPage.inputCardholdersName("Emily James")
    await paymentPage.inputCardNumber("")
    await paymentPage.inputCardExpiryDate("11", "2028")
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Please provide")
})

test("Valid payment details, card number with spaces", async ({page}) => {
    await paymentPage.selectCardType("master");
    await paymentPage.inputCardholdersName("John Jackson")
    await paymentPage.inputCardNumber("1234 5678 9012 3456")
    await paymentPage.inputCardExpiryDate("05", "2027")
    await paymentPage.clickPayNowButton();
    await paymentPage.checkConfirmation();
})


test("card number with 75 characters", async({page})=>{
    await paymentPage.selectCardType("master");
    await paymentPage.inputCardholdersName("Emily James")
    await paymentPage.inputCardNumber("9081746253019478562039481765092837"
        +"46192837465029384756120394857612938475610")
    await paymentPage.inputCardExpiryDate("11", "2028")
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Invalid")

})

test("card number field with special characters", async({page})=>{
    await paymentPage.selectCardType("visa");
    await paymentPage.inputCardholdersName("Emily James")
    await paymentPage.inputCardNumber("@\n$$!_-\\/")
    await paymentPage.inputCardExpiryDate("11", "2028")
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Invalid")
    await page.pause();
})

test("card number field with letters", async({page})=>{
    await paymentPage.selectCardType("visa");
    await paymentPage.inputCardholdersName("Emily James")
    await paymentPage.inputCardNumber("this input should not allow letters")
    await paymentPage.inputCardExpiryDate("11", "2028")
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Invalid")
    await page.pause();
})

test.only("Card already expired", async ({page}) => {
    await paymentPage.selectCardType("master");
    await paymentPage.inputCardholdersName("John Jackson")
    await paymentPage.inputCardNumber("1234567890123456")
    await paymentPage.inputCardExpiryDate("05", "2016")
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Expired")
})