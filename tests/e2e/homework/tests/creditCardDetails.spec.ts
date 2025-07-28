import { test, expect } from '@playwright/test';
import { SelectFlightPage } from '../pages/SelectFlight.page';
import { PassengerDetailsPage } from '../pages/PassengerDetails.page';
import { CreditCardDetailsPage } from '../pages/CreditCardDetails.page';

let creditCardDetailsPage:CreditCardDetailsPage;

const tripType = 'return';
const fromCity = 'New York';
const toCity = 'Sydney';
const departDay = '03';
const departMonth = 'August 2025';
const returnDay = '05';
const returnMonth = 'December 2025';
const flightIndex = 0;
const firstName = 'Vardas';
const lastName = 'Pavarde';

test.beforeEach('Login', async({page})=> 
{
    const selectFlightPage = new SelectFlightPage(page);
    await selectFlightPage.gotoTravelPage();
    await selectFlightPage.logInToTravelPage();
    await page.waitForLoadState('networkidle');
    await selectFlightPage.checkTripType(tripType);
    await selectFlightPage.chooseFromPort(fromCity);
    await selectFlightPage.chooseToPort(toCity);
    await selectFlightPage.chooseDepartDay(departDay);
    await selectFlightPage.chooseDepartMonth(departMonth);
    await selectFlightPage.chooserReturnDay(returnDay);
    await selectFlightPage.chooseReturnMonth(returnMonth);
    await selectFlightPage.selectFlightTime(flightIndex);
    const passengerDetailsPage = await selectFlightPage.continueWithSelectedFlight();
    await passengerDetailsPage.fillFirstName(firstName);
    await passengerDetailsPage.fillLastName(lastName);
    creditCardDetailsPage = await passengerDetailsPage.clickNextButton();
})

test('Depart city is the same as chosen', async ({page})=>{

    const foundCity = page.locator('i', { hasText: fromCity });
    console.log(foundCity);
    await expect(foundCity).toContainText(fromCity);
});

test('Return city is the same as chosen', async ({page})=>{

    const foundCity = page.locator('i', { hasText: toCity });
    await expect(foundCity).toContainText(toCity);
});

test('Can continue without providing Card Type', async ({page})=>{
    await creditCardDetailsPage.fillCardNumber('123456789123456');
    await creditCardDetailsPage.chooseExpiryMonth('08')
    await creditCardDetailsPage.chooseExpiryYear('2027')
    await creditCardDetailsPage.clickPayNowButton();

    await expect(creditCardDetailsPage.bookingNumber).toBeVisible();
});

test('Card holder name is the same as given name', async ({page})=>{

    const expectedName = firstName + ' ' + lastName;
  
    await expect(creditCardDetailsPage.cardHolderName).toBeVisible();
    const actualName = await creditCardDetailsPage.cardHolderName.inputValue();

    expect(actualName).toBe(expectedName);
});

const invalidCards = [
    { cardNumber: '12345678912345677' },
    { cardNumber: '123456789123456' },
    { cardNumber: '1' }
  ];

test.describe('Invalid card number tests', () => {
    for (const { cardNumber } of invalidCards) {
        test(`Cannot pay with wrong card lenght (should be 16) ${cardNumber}`, async ({page})=>{
        
            await expect(creditCardDetailsPage.cardNumber).toBeVisible();
            await creditCardDetailsPage.fillCardNumber(cardNumber);
            await creditCardDetailsPage.chooseExpiryMonth('08')
            await creditCardDetailsPage.chooseExpiryYear('2027')
            await creditCardDetailsPage.clickPayNowButton();

            await creditCardDetailsPage.loading.waitFor({ state: 'hidden' });

            const bookingNumber = page.locator('#booking_number');
            await expect(bookingNumber).not.toHaveText(/[0-9]/);
        });
    }
});


test('Cannot pay with card number that contains not only letters (should be 16)', async ({page})=>{
        
    await expect(creditCardDetailsPage.cardNumber).toBeVisible();
    await creditCardDetailsPage.fillCardNumber('1234567891234567#');
    await creditCardDetailsPage.chooseExpiryMonth('08')
    await creditCardDetailsPage.chooseExpiryYear('2027')
    await creditCardDetailsPage.clickPayNowButton();

    await creditCardDetailsPage.loading.waitFor({ state: 'hidden' });

    const bookingNumber = page.locator('#booking_number');
    await expect(bookingNumber).not.toHaveText(/[0-9]/);
    });


test('Cannot pay with wrong visa card start (should start with 4)', async ({page})=>{
  
    await creditCardDetailsPage.checkCardTypeVisa();
    await creditCardDetailsPage.fillCardNumber('1234567891234567');
    await creditCardDetailsPage.chooseExpiryMonth('08')
    await creditCardDetailsPage.chooseExpiryYear('2027')
    await creditCardDetailsPage.clickPayNowButton();

    await creditCardDetailsPage.loading.waitFor({ state: 'hidden' });
    
    const bookingNumber = page.locator('#booking_number');
    await expect(bookingNumber).not.toHaveText(/[0-9]/);
});

test('Cannot pay with wrong master card start (should start with 51–55, 2221–2720)', async ({page})=>{
  
    await creditCardDetailsPage.checkCardTypeMaster();
    await creditCardDetailsPage.fillCardNumber('1234567891234567');
    await creditCardDetailsPage.chooseExpiryMonth('08')
    await creditCardDetailsPage.chooseExpiryYear('2027')
    await creditCardDetailsPage.clickPayNowButton();

    await creditCardDetailsPage.loading.waitFor({ state: 'hidden' });
    
    const bookingNumber = page.locator('#booking_number');
    await expect(bookingNumber).not.toHaveText(/[0-9]/);
});
test('Can pay with visa card that starts with 4', async ({page})=>{
  
    await creditCardDetailsPage.checkCardTypeVisa();
    await creditCardDetailsPage.fillCardNumber('4234567891234567');
    await creditCardDetailsPage.chooseExpiryMonth('08')
    await creditCardDetailsPage.chooseExpiryYear('2027')
    await creditCardDetailsPage.clickPayNowButton();

    await creditCardDetailsPage.loading.waitFor({ state: 'hidden' });
    
    const bookingNumber = page.locator('#booking_number');
    await expect(bookingNumber).toHaveText(/[0-9]/);
});

test('Can pay with master card that starts with 51–55, 2221–2720', async ({page})=>{
  
    await creditCardDetailsPage.checkCardTypeMaster();
    await creditCardDetailsPage.fillCardNumber('5534567891234567');
    await creditCardDetailsPage.chooseExpiryMonth('08')
    await creditCardDetailsPage.chooseExpiryYear('2027')
    await creditCardDetailsPage.clickPayNowButton();

    await creditCardDetailsPage.loading.waitFor({ state: 'hidden' });
    
    const bookingNumber = page.locator('#booking_number');
    await expect(bookingNumber).toHaveText(/[0-9]/);
});

const validMasterCards = [
    { cardNumber: '5134567891234567' },
    { cardNumber: '5534567891234567' },
    { cardNumber: '2221567891234567' },
    { cardNumber: '2720567891234567' }
  ];

test.describe('Invalid card number tests', () => {
    for (const { cardNumber } of validMasterCards) {
        test(`Can pay with master card that starts with (51–55, 2221–2720) ${cardNumber}`, async ({page})=>{
        
            await creditCardDetailsPage.checkCardTypeMaster();
            await creditCardDetailsPage.fillCardNumber(cardNumber);
            await creditCardDetailsPage.chooseExpiryMonth('08')
            await creditCardDetailsPage.chooseExpiryYear('2027')
            await creditCardDetailsPage.clickPayNowButton();

            await creditCardDetailsPage.loading.waitFor({ state: 'hidden' });

            const bookingNumber = page.locator('#booking_number');
            await expect(bookingNumber).toHaveText(/[0-9]/);
        });
    }
});

test('Cannot pay with expired visa card', async ({page})=>{
  
    await creditCardDetailsPage.checkCardTypeVisa();
    await creditCardDetailsPage.fillCardNumber('5134567891234567');
    await creditCardDetailsPage.chooseExpiryMonth('08')
    await creditCardDetailsPage.chooseExpiryYear('2021')
    await creditCardDetailsPage.clickPayNowButton();

    await creditCardDetailsPage.loading.waitFor({ state: 'hidden' });
    
    const bookingNumber = page.locator('#booking_number');
    await expect(bookingNumber).not.toHaveText(/[0-9]/);
});

test('Cannot pay with expired master card', async ({page})=>{
    
    await creditCardDetailsPage.checkCardTypeMaster();
    await creditCardDetailsPage.fillCardNumber('5134567891234567');
    await creditCardDetailsPage.chooseExpiryMonth('08')
    await creditCardDetailsPage.chooseExpiryYear('2021')
    await creditCardDetailsPage.clickPayNowButton();

    await creditCardDetailsPage.loading.waitFor({ state: 'hidden' });
    
    const bookingNumber = page.locator('#booking_number');
    await expect(bookingNumber).not.toHaveText(/[0-9]/);
});

test('Can pay with valid visa card', async ({page})=>{
  
    await creditCardDetailsPage.checkCardTypeVisa();
    await creditCardDetailsPage.fillCardNumber('5134567891234567');
    await creditCardDetailsPage.chooseExpiryMonth('08')
    await creditCardDetailsPage.chooseExpiryYear('2027')
    await creditCardDetailsPage.clickPayNowButton();

    await creditCardDetailsPage.loading.waitFor({ state: 'hidden' });
    
    const bookingNumber = page.locator('#booking_number');
    await expect(bookingNumber).toHaveText(/[0-9]/);
});

test('Can pay with valid master card', async ({page})=>{
    
    await creditCardDetailsPage.checkCardTypeMaster();
    await creditCardDetailsPage.fillCardNumber('5134567891234567');
    await creditCardDetailsPage.chooseExpiryMonth('08')
    await creditCardDetailsPage.chooseExpiryYear('2027')
    await creditCardDetailsPage.clickPayNowButton();

    await creditCardDetailsPage.loading.waitFor({ state: 'hidden' });
    
    const bookingNumber = page.locator('#booking_number');
    await expect(bookingNumber).toHaveText(/[0-9]/);
});

test('Confirmation field shows correct trip type', async ({page})=>{
    
    await creditCardDetailsPage.checkCardTypeMaster();
    await creditCardDetailsPage.fillCardNumber('5134567891234567');
    await creditCardDetailsPage.chooseExpiryMonth('08')
    await creditCardDetailsPage.chooseExpiryYear('2027')
    await creditCardDetailsPage.clickPayNowButton();

    await creditCardDetailsPage.loading.waitFor({ state: 'hidden' });
  
    const confirmatipnTripType = await creditCardDetailsPage.confirmationParagraphs.nth(1).innerText();
    expect(confirmatipnTripType.includes(tripType)).toBe(true);
});

test('Confirmation field shows correct passenger details', async ({page})=>{
    
    const expectedName = firstName + ' ' + lastName;

    await creditCardDetailsPage.checkCardTypeMaster();
    await creditCardDetailsPage.fillCardNumber('5134567891234567');
    await creditCardDetailsPage.chooseExpiryMonth('08')
    await creditCardDetailsPage.chooseExpiryYear('2027')
    await creditCardDetailsPage.clickPayNowButton();

    await creditCardDetailsPage.loading.waitFor({ state: 'hidden' });
  
    const confirmatipnTripType = await creditCardDetailsPage.confirmationParagraphs.nth(2).innerText();
    expect(confirmatipnTripType.includes(expectedName)).toBe(true);
});

