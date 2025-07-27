import { test, expect } from '@playwright/test';
import { TravelPage } from 'e2e-tests/pom/travel.page';

let travelPage : TravelPage;

test.beforeEach('setup', async ({page}) => {
    travelPage = new TravelPage(page);

  await travelPage.goTo();
});

test('Validate card number (Visa/Master)', async ({ page }) => {
await travelPage.loginFlow ('agileway', 'testW1se');
await travelPage.flightSelect ('New York', 'Sydney', '082025', '15');
await travelPage.passengerDetails ('Marius', 'Marauskas');
await travelPage.cardDetails ('1234567898765432', '2026', '03');
});


