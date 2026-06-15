const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('[type="password"]', 'learning');
  await page.check('#terms');
  await page.click('#signInBtn');
  await page.waitForTimeout(5000);
  console.log('current URL:', page.url());
  console.log('title:', await page.title());
  const pageText = await page.locator('body').textContent();
  console.log('body starts with:', pageText.slice(0, 300).replace(/\s+/g, ' '));
  const productLoc = page.locator('.card h4');
  console.log('product cards count:', await productLoc.count());
  if (await productLoc.count() > 0) {
    for (let i = 0; i < await productLoc.count(); i++) {
      const text = await productLoc.nth(i).textContent();
      console.log(`product[${i}] =`, text.trim());
    }
  }
  await browser.close();
})();