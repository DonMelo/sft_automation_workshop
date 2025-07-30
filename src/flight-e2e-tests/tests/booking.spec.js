const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { FlightBookingPage } = require('../pages/flightBookingPage');

test.describe('Regression Tests - Flight Booking App', () => {

  test('User can log in and book a flight', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const bookingPage = new FlightBookingPage(page);

    await loginPage.goto();
    await loginPage.login('agileway', 'testW1se');

    await expect(page).toHaveURL(/.*flights\/start/); // Confirm login success

    await bookingPage.bookFlight('Sydney', 'New York');
    await expect(page).toHaveURL("https://travel.agileway.net/flights/select_date?tripType=return&fromPort=Sydney&toPort=New+York&departDay=01&departMonth=012025&returnDay=01&returnMonth=012025"); // Confirm booking
  });
  
  test('Booking with same departure and arrival city should fail', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('agileway', 'testW1se');

    const booking = new BookingPage(page);
    await booking.selectCities('Sydney', 'Sydney'); // same city
    await booking.submit();

    await expect(page.locator('.error')).toContainText('Departure and arrival cities must be different');
  });

});
