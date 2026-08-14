import { test, expect } from '@playwright/test';
 
test('verify multiple products', async ({ page }) => {

  await page.goto('https://shop.example.com');

  
 
  const products = ['iPhone 15', 'Samsung S23', 'Pixel 8'];
 
  products.forEach(async (product) => {

    await page.fill('#search', product);

    await page.click('#searchBtn');
 
    await page.waitForTimeout(2000);
 
    const result = await page.textContent('.result');

    expect(result).toContain(product);

  });

});