const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('[type="password"]', 'Learning@830$3mK2');
  await page.check('#terms');
  await Promise.all([
    page.waitForURL('**/angularpractice/shop', { timeout: 20000 }),
    page.click('#signInBtn')
  ]);
  console.log('After login URL:', page.url());
  const productTitles = await page.locator('.card h4').allTextContents();
  console.log('productTitles:', productTitles);
  const found = productTitles.filter(t => t.toLowerCase().includes('iphone x'));
  console.log('iphone x found:', found);
  await browser.close();
})();