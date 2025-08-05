import { test, expect, Page } from '@playwright/test';
import { LogInPage } from './pom/agileLogIn.page';
import { StartPage } from './pom/agileStart.page';
import { PassangerDetailsPage } from './pom/agilePassangerDetails.page';
import { PaymentPage } from './pom/agilePayment.page';
import testDataObject from './utils/ValidPaymentDetails.json';
const testData = JSON.parse(JSON.stringify(testDataObject))

let loginPage: LogInPage;
let startPage: StartPage;
let passangerDetailsPage: PassangerDetailsPage;
let paymentPage: PaymentPage

let username;


test.beforeEach("Setup",async ({ page }) =>{


    loginPage = new LogInPage(page);
    await loginPage.goToPage();
    await loginPage.signIn("agileway", "testW1se");


    startPage = new StartPage(page)
    await startPage.selectFromLocation("New York");
    await startPage.selectToLocation("New York");
    await startPage.selectDepartureDate("16", "November 2025")
    await startPage.selectReturnDate("25", "April 2026")
    await startPage.checkThirdFlight();
    await startPage.clickContinueButton();


    passangerDetailsPage = new PassangerDetailsPage(page)
    await passangerDetailsPage.inputFirstName("John")
    await passangerDetailsPage.inputLastName("Jacobs")
    await passangerDetailsPage.clickNextButton();


    paymentPage = new PaymentPage(page)
})


test("Valid payment details", async () => {
    await paymentPage.selectCardType(testData.cardType);
    await paymentPage.inputCardholdersName(testData.Name)
    await paymentPage.inputCardNumber(testData.CardNumber)
    await paymentPage.inputCardExpiryDate(testData.CardExpiryMonth,
         testData.CardExpiryYear)
    await paymentPage.clickPayNowButton();
    await paymentPage.checkConfirmation();
})

test("Valid payment details without card type", async () => {
    await paymentPage.inputCardholdersName(testData.Name)
    await paymentPage.inputCardNumber(testData.CardNumber)
    await paymentPage.inputCardExpiryDate(testData.CardExpiryMonth, 
        testData.CardExpiryYear)
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Please select")
})

test("only first card holder's name", async () => {
    await paymentPage.selectCardType("visa");
    await paymentPage.inputCardholdersName("John")
    await paymentPage.inputCardNumber(testData.CardNumber)
    await paymentPage.inputCardExpiryDate(testData.CardExpiryMonth, 
        testData.CardExpiryYear)
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Invalid")
})


test("empty card holder's name", async () => {
    await paymentPage.selectCardType(testData.CardType);
    await paymentPage.inputCardholdersName("")
    await paymentPage.inputCardNumber(testData.CardNumber)
    await paymentPage.inputCardExpiryDate(testData.CardExpiryMonth, 
        testData.CardExpiryYear)
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Please provide")
})

test("100 charactares cardholder's name", async () => {
    await paymentPage.selectCardType(testData.CardType);
    await paymentPage.inputCardholdersName("vLrQeKfWgJyRaAmncHXkBZpTq"+
        "YtVbCdMSzEjuLFxDNwPoIGsUhMYqvRLeCKXatnJzBGOUykhNiTqWmVAExPbHs")
    await paymentPage.inputCardNumber(testData.CardNumber)
    await paymentPage.inputCardExpiryDate(testData.CardExpiryMonth, 
        testData.CardExpiryYear)
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Invalid")
})


test("Non-ASCII card holder's name", async () => {
    await paymentPage.selectCardType(testData.CardType);
    await paymentPage.inputCardholdersName("Šarūnas Čerkauskas")
    await paymentPage.inputCardNumber(testData.CardNumber)
    await paymentPage.inputCardExpiryDate(testData.CardExpiryMonth, 
        testData.CardExpiryYear)
    await paymentPage.clickPayNowButton();
    await paymentPage.checkConfirmation();
})

test("empty card number field", async()=>{
    await paymentPage.selectCardType(testData.CardType);
    await paymentPage.inputCardholdersName(testData.Name)
    await paymentPage.inputCardNumber("")
    await paymentPage.inputCardExpiryDate(testData.CardExpiryMonth,
        testData.CardExpiryYear
    )
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Please provide")
})

test("Valid payment details, card number with spaces", async () => {
    await paymentPage.selectCardType(testData.CardType);
    await paymentPage.inputCardholdersName(testData.Name)
    await paymentPage.inputCardNumber("1234 5678 9012 3456")
    await paymentPage.inputCardExpiryDate(testData.CardExpiryMonth, 
        testData.CardExpiryYear)
    await paymentPage.clickPayNowButton();
    await paymentPage.checkConfirmation();
})


test("card number with 75 characters", async()=>{
    await paymentPage.selectCardType(testData.CardType);
    await paymentPage.inputCardholdersName(testData.Name)
    await paymentPage.inputCardNumber("9081746253019478562039481765092837"
        +"46192837465029384756120394857612938475610")
    await paymentPage.inputCardExpiryDate(testData.CardExpiryMonth, 
        testData.CardExpiryYear)
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Invalid")

})

test("card number field with special characters", async()=>{
    await paymentPage.selectCardType(testData.CardType);
    await paymentPage.inputCardholdersName(testData.CardType)
    await paymentPage.inputCardNumber("@\n$$!_-\\/")
    await paymentPage.inputCardExpiryDate(testData.CardExpiryMonth, 
        testData.CardExpiryYear)
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Invalid")
})

test("card number field with letters", async()=>{
    await paymentPage.selectCardType(testData.CardType);
    await paymentPage.inputCardholdersName(testData.Name)
    await paymentPage.inputCardNumber("this input should not allow letters")
    await paymentPage.inputCardExpiryDate((testData.CardExpiryMonth, 
        testData.CardExpiryYear))
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Invalid")
})

test("Card already expired", async () => {
    await paymentPage.selectCardType(testData.CardType);
    await paymentPage.inputCardholdersName(testData.Name)
    await paymentPage.inputCardNumber(testData.CardNumber)
    await paymentPage.inputCardExpiryDate("05", "2016")
    await paymentPage.clickPayNowButton();
    await paymentPage.checkErrorMessage("Expired")
})