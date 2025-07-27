import { test, expect } from '@playwright/test';
import { FlightPage } from './pom/Flight.page';

let flightPage: FlightPage;

test.beforeEach(async ({ page }) => {
    flightPage = new FlightPage(page);
    await flightPage.goto();
});