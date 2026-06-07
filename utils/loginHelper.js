const { expect } = require('@playwright/test');
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
async function loginAndGoToBooking(page, email, password) {
    await page.goto(BASE_URL);
    await page.locator("#email").fill(email);
    await page.locator("#password").fill(password);
    await page.locator("#login-btn").click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
    await page.locator("#nav-events").click();


}

module.exports = { loginAndGoToBooking };