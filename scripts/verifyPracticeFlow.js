const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.fill('#username','rahulshettyacademy');
  await page.fill('[type="password"]','learning');
  await page.check('#terms');
  await Promise.all([
    page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop', { timeout: 10000 }),
    page.click('#signInBtn')
  ]);
  console.log('URL after login', page.url());
  const productCards = page.locator('.card h4');
  const count = await productCards.count();
  const products = [];
  for (let i=0; i<count; i++) {
    const title = await productCards.nth(i).textContent();
    products.push(title.trim());
  }
  console.log('products', products);
  const contains = products.some(t => t.includes('iphone X') || t.includes('iPhone X'));
  console.log('contains iphone x?', contains);
  await browser.close();
})();