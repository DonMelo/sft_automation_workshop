import { test, expect } from '@playwright/test';
import { PaymentPage } from '../pages/Payment.page';
import { vars } from '../others/constants';

let paymentPage: PaymentPage;

test.beforeEach(async ({ page }) => {
    paymentPage = new PaymentPage(page);
    await paymentPage.goto();
});

test('Enter valid payment details', async ({ page }) => {
    await paymentPage.selectCardType();
    await paymentPage.enterCardHolderName(vars.card_holder_name);
    await paymentPage.enterCardNumber(vars.card_number);
    await paymentPage.enterExpiryMonth(vars.expiry_month);
    await paymentPage.enterExpiryYear(vars.expiry_year);
    await paymentPage.submitPayment();

    await expect(paymentPage.confirmation).toBeVisible();
});

test.describe('Enter invalid payment details', () => {
    test('Enter empty card holder name', async ({ page }) => {
        await paymentPage.selectCardType();
        await paymentPage.enterCardHolderName('');
        await paymentPage.enterCardNumber(vars.card_number);
        await paymentPage.enterExpiryMonth(vars.expiry_month);
        await paymentPage.enterExpiryYear(vars.expiry_year);
        await paymentPage.submitPayment();

        await expect(paymentPage.confirmation).toBeHidden();
    });

    test('Enter empty card number', async ({ page }) => {
        await paymentPage.selectCardType();
        await paymentPage.enterCardHolderName(vars.card_holder_name);
        await paymentPage.enterCardNumber('');
        await paymentPage.enterExpiryMonth(vars.expiry_month);
        await paymentPage.enterExpiryYear(vars.expiry_year);
        await paymentPage.submitPayment();

        await expect(paymentPage.confirmation).toBeHidden();
    });

    test('Enter invalid expiry year', async ({ page }) => {
        await paymentPage.selectCardType();
        await paymentPage.enterCardHolderName(vars.card_holder_name);
        await paymentPage.enterCardNumber(vars.card_number);
        await paymentPage.enterExpiryMonth(vars.expiry_month);
        await paymentPage.enterExpiryYear('2021'); // Invalid year
        await paymentPage.submitPayment();

        await expect(paymentPage.confirmation).toBeHidden();
    });

    test('Submit without entering any details', async ({ page }) => {
        await paymentPage.submitPayment();

        await expect(paymentPage.confirmation).toBeHidden();
        // weirdly this fails
    });

    test('Submit invalid card number', async ({ page }) => {
        await paymentPage.selectCardType();
        await paymentPage.enterCardHolderName(vars.card_holder_name);
        await paymentPage.enterCardNumber('1234'); // Invalid card number
        await paymentPage.enterExpiryMonth(vars.expiry_month);
        await paymentPage.enterExpiryYear(vars.expiry_year);
        await paymentPage.submitPayment();

        await expect(paymentPage.confirmation).toBeHidden();
    });
});