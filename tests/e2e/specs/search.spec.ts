import { test, expect } from "@playwright/test";
import {
  users,
  messages,
  tripType,
  cities,
  flightDates,
  headers,
} from "../data/testData";
import { PageManager } from "../pom/PageManager";

/*
 * Flight Search Tests

 * The flight search is core to the app's purpose. Users must be able to search for flights reliably.
 * These tests verify one-way and return trip functionality, validation of inputs,
 * and correct handling of invalid values like identical origin and destination.
 */

let pageManager: PageManager;

test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
  pageManager = new PageManager(page);
  await pageManager.loginPage.goto();
  await pageManager.loginPage.login(users.valid.username, users.valid.password);
  await expect(pageManager.loginPage.successMessage).toHaveText(
    messages.loginSuccess
  );
});

test.describe("Positive tests", () => {
  test("Return trip search works", async () => {
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
    await pageManager.searchPage.waitForPageHeading(
      headers.passengerDetailsPage
    );
  });

  test("One way trip search works", async () => {
    await pageManager.searchPage.selectTripType(tripType.oneWay);
    await pageManager.searchPage.setTo(cities.sydney);
    await pageManager.searchPage.setDate(
      flightDates.valid.depart.day,
      flightDates.valid.depart.monthYear
    );
    await expect(pageManager.searchPage.flightOptions.first()).toBeVisible();
    await pageManager.searchPage.selectFlightOption(1);
    await pageManager.searchPage.submitSearch();
    await pageManager.searchPage.waitForPageHeading(
      headers.passengerDetailsPage
    );
  });
});

test.describe("Negative tests", () => {
  // This test fails because user is able to continue without filling any info
  test("User cannot submit search with missing fields", async () => {
    await expect(pageManager.searchPage.errorAlert).toBeVisible();
  });

  // This test fails because user is able to select same destination as origin
  test("Same origin/destination not allowed", async () => {
    await pageManager.searchPage.selectTripType(tripType.return);
    await pageManager.searchPage.setFromTo(cities.newYork, cities.newYork);
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
    await expect(pageManager.searchPage.errorAlert).toBeVisible();
  });

  // This test fails because user is able to select earlier arrival date that departure date
  test("Departure cannot be after return date", async () => {
    await pageManager.searchPage.selectTripType(tripType.return);
    await pageManager.searchPage.setFromTo(cities.newYork, cities.newYork);
    await pageManager.searchPage.setDate(
      flightDates.departAfterReturn.depart.day,
      flightDates.departAfterReturn.depart.monthYear
    );
    await pageManager.searchPage.setDate(
      flightDates.departAfterReturn.return.day,
      flightDates.departAfterReturn.return.monthYear
    );
    await expect(pageManager.searchPage.flightOptions.first()).toBeVisible();
    await pageManager.searchPage.selectFlightOption(1);
    await pageManager.searchPage.submitSearch();
    await expect(pageManager.searchPage.errorAlert).toBeVisible();
  });

  //This test fails because user is able to continue without selecting a flight option
  test("User cannot continue without selecting flight option", async () => {
    await pageManager.searchPage.selectTripType(tripType.return);
    await pageManager.searchPage.setFromTo(cities.newYork, cities.newYork);
    await pageManager.searchPage.setDate(
      flightDates.departAfterReturn.depart.day,
      flightDates.departAfterReturn.depart.monthYear
    );
    await pageManager.searchPage.setDate(
      flightDates.departAfterReturn.return.day,
      flightDates.departAfterReturn.return.monthYear
    );
    await expect(pageManager.searchPage.flightOptions.first()).toBeVisible();
    await pageManager.searchPage.submitSearch();
    await expect(pageManager.searchPage.errorAlert).toBeVisible();
  });
  //This test fails because user is able to continue with two flight options selected
  test("User cannot continue with two flight options selected", async () => {
    await pageManager.searchPage.selectTripType(tripType.return);
    await pageManager.searchPage.setFromTo(cities.newYork, cities.newYork);
    await pageManager.searchPage.setDate(
      flightDates.departAfterReturn.depart.day,
      flightDates.departAfterReturn.depart.monthYear
    );
    await pageManager.searchPage.setDate(
      flightDates.departAfterReturn.return.day,
      flightDates.departAfterReturn.return.monthYear
    );
    await expect(pageManager.searchPage.flightOptions.first()).toBeVisible();
    await pageManager.searchPage.selectFlightOption(1);
    await pageManager.searchPage.selectFlightOption(2);
    await pageManager.searchPage.submitSearch();
    await expect(pageManager.searchPage.errorAlert).toBeVisible();
  });
});
