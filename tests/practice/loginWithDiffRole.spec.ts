import { BrowserContext, expect, Page, test } from '@playwright/test';

test('handle multiple user login', async ({ browser }) => {

    let window1: BrowserContext = await browser.newContext();
    let window2: BrowserContext = await browser.newContext();
    let window3: BrowserContext = await browser.newContext();

    let page1: Page = await window1.newPage();
    let page2: Page = await window2.newPage();
    let page3: Page = await window3.newPage();

    await page1.goto("https://eventhub.rahulshettyacademy.com")
    await page1.getByPlaceholder('you@email.com').fill('awalom.official4@gmail.com');
    await page1.getByLabel('password').fill('Abdul@7866');
    await page1.locator('#login-btn').click();
    await expect(page1.locator('h1').first()).toHaveText('Discover & BookAmazing Events');

    await page2.goto("https://eventhub.rahulshettyacademy.com")
    await page2.getByPlaceholder('you@email.com').fill('awalom.official@gmail.com');
    await page2.getByLabel('password').fill('Abdul@7866');
    await page2.locator('#login-btn').click();
    await expect.soft(page2.locator('h1').first()).toHaveText('Discover & BookAmazing Events');

    await page3.goto("https://eventhub.rahulshettyacademy.com")
    await page3.getByPlaceholder('you@email.com').fill('awalom.official1@gmail.com');
    await page3.getByLabel('password').fill('Abdul@7866');
    await page3.locator('#login-btn').click();
    await expect.soft(page3.locator('h1').first()).toHaveText('Discover & BookAmazing Events');

    await page3.pause();


});