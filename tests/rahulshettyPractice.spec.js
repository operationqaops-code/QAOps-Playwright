const { test, expect } = require('@playwright/test');
const { PracticeLoginPage } = require('../pageObjects/PracticeLoginPage');

test('Practice login should navigate to shop and show iphone X', async ({ page }) => {
    const loginPage = new PracticeLoginPage(page);
    await loginPage.goTo();

    // Live site currently rejects the old password "learning".
    // Using the current valid site credential to verify the navigation and product presence.
    await loginPage.login('rahulshettyacademy', 'Learning@830$3mK2');

    await loginPage.waitUntilShopPage();
    expect(page.url()).toBe('https://rahulshettyacademy.com/angularpractice/shop');
    expect(await loginPage.isProductPresent('iphone X')).toBeTruthy();
});