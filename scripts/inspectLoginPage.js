const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const locators = {
    username: await page.locator('#username').count(),
    password: await page.locator('[type="password"]').count(),
    checkbox: await page.locator('#terms').count(),
    signIn: await page.locator('#signInBtn').count(),
    shopButton: await page.locator('a[href*="shop"]').count(),
    alertText: await page.locator('[style*="block"]').textContent().catch(() => null),
    loginFormVisible: await page.locator('.container').first().isVisible(),
  };
  console.log(JSON.stringify(locators, null, 2));
  await browser.close();
})();