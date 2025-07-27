import { test, expect } from '@playwright/test';
import  {SignIn} from 'e2e-tests/AgileWay.page.object/signIn.page';
import { BookingAFlight } from 'e2e-tests/AgileWay.page.object/booking.page';

test.describe('Booking flights on AgileWay website', () => {

    let signIn: SignIn;
    let bookingFlight: BookingAFlight;

    test.beforeEach(async ({ page }) => {
        signIn = new SignIn(page);
        bookingFlight = new BookingAFlight(page);
    });

  test('Passenger can successfully book a flight with return using a master card', async ({page}) => {
    await signIn.goTo();
    await signIn.signInToAgileWay('agileway', 'testW1se');
    await bookingFlight.selectFlight('return','Sydney', 'New York', '11', 'Feburary 2025', '8:30', '20', 'July 2025');
    await expect(page.locator('body')).toContainText('2025-07-20');
    await expect(page.locator('body')).toContainText('2025-02-11');
    await expect(page.locator('body')).toContainText('Sydney');
    await expect(page.locator('body')).toContainText('New York');
    await bookingFlight.fillPassengerForm('Antanas', 'Antonelis');
    await expect(page.locator('body')).toContainText('return Sydney to New York');
    await bookingFlight.selectCardPayment('master','2319994883', '05', '2028');
    await expect(page.locator('body')).toContainText('Antanas Antonelis');
    await expect(page.locator('body')).toContainText('Confirmation');
  })
  test('Passenger can successfully book a one way flight using a master card', async ({page}) => {
    await signIn.goTo();
    await signIn.signInToAgileWay('agileway', 'testW1se');
    await bookingFlight.selectFlight('oneway','Sydney', 'New York', '11', 'Feburary 2025', '8:30');
    await expect(page.locator('body')).toContainText('2025-02-11');
    await expect(page.locator('body')).toContainText('Sydney');
    await expect(page.locator('body')).toContainText('New York');
    await bookingFlight.fillPassengerForm('Antanas', 'Antonelis');
    await bookingFlight.selectCardPayment('master','2319994883', '05', '2028');
    await expect(page.locator('body')).toContainText('Antanas Antonelis');
    await expect(page.locator('body')).toContainText('Confirmation');
  })

  test('Passenger can successfully book a flight with return using a visa', async ({page}) => {
    await signIn.goTo();
    await signIn.signInToAgileWay('agileway', 'testW1se');
    await bookingFlight.selectFlight('return','Sydney', 'New York', '11', 'Feburary 2025', '8:30', '20', 'July 2025');
    await expect(page.locator('body')).toContainText('2025-07-20');
    await expect(page.locator('body')).toContainText('2025-02-11');
    await expect(page.locator('body')).toContainText('Sydney');
    await expect(page.locator('body')).toContainText('New York');
    await bookingFlight.fillPassengerForm('Antanas', 'Antonelis');
    await expect(page.locator('body')).toContainText('return Sydney to New York');
    await bookingFlight.selectCardPayment('visa','2319994883', '05', '2028');
    await expect(page.locator('body')).toContainText('Antanas Antonelis');
    await expect(page.locator('body')).toContainText('Confirmation');
  })
   test('Passenger can successfully book a one way flight using a visa', async ({page}) => {
    await signIn.goTo();
    await signIn.signInToAgileWay('agileway', 'testW1se');
    await bookingFlight.selectFlight('oneway','Sydney', 'New York', '11', 'Feburary 2025', '8:30');
    await expect(page.locator('body')).toContainText('2025-02-11');
    await expect(page.locator('body')).toContainText('Sydney');
    await expect(page.locator('body')).toContainText('New York');
    await bookingFlight.fillPassengerForm('Antanas', 'Antonelis');
    await bookingFlight.selectCardPayment('visa','2319994883', '05', '2028');
    await expect(page.locator('body')).toContainText('Antanas Antonelis');
    await expect(page.locator('body')).toContainText('Confirmation');
  })
})