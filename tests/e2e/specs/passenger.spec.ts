import { test, expect } from "@playwright/test";
import {
  users,
  messages,
  tripType,
  cities,
  flightDates,
  headers,
  passenger,
} from "../data/testData";
import { PageManager } from "../pom/PageManager";

/*
 * Passenger Details Tests
 
 * This page collects passenger information required to complete a booking.
 * It’s a critical part of the flow and must handle both valid and invalid input.
 * Ensuring this step works is vital, as incorrect or missing passenger data could block or corrupt bookings.
 */

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
  pageManager = new PageManager(page);
  await pageManager.loginPage.goto();
  await pageManager.loginPage.login(users.valid.username, users.valid.password);
  await pageManager.searchPage.selectTripType(tripType.return);
  await pageManager.searchPage.setFromTo(cities.sydney, cities.newYork);
  await pageManager.searchPage.setDate(
    flightDates.valid.depart.day,
    flightDates.valid.depart.monthYear
  );
  await pageManager.searchPage.setDate(
    flightDates.valid.return.day,
    flightDates.valid.return.monthYear
  );
  await expect(pageManager.searchPage.flightOptions.first()).toBeVisible();
  await pageManager.searchPage.selectFlightOption(1);
  await pageManager.searchPage.submitSearch();
  await pageManager.searchPage.waitForPageHeading(headers.passengerDetailsPage);
});

test.describe.configure({ mode: "serial" });
test.describe("Passenger Details Page", () => {
  test("User can fill in passenger details", async () => {
    await pageManager.passengerDetailsPage.fillAndSubmitPassengerDetails(
      passenger.firstName,
      passenger.lastName
    );
    await pageManager.searchPage.waitForPageHeading(headers.paymentPage);
  });

  test("User fills first name but leaves last name blank", async () => {
    await pageManager.passengerDetailsPage.fillAndSubmitPassengerDetails(
      passenger.firstName,
      passenger.lastNameBlank
    );
    await pageManager.searchPage.verifyErrorAlert(messages.lastNameRequired);
  });

  //This test fails because it allows user to leave First Name blank
  test("User fills last name but leaves first name blank", async () => {
    await pageManager.passengerDetailsPage.fillAndSubmitPassengerDetails(
      passenger.firstNameBlank,
      passenger.lastName
    );
    await expect(pageManager.searchPage.errorAlert).toBeVisible();
  });
});
