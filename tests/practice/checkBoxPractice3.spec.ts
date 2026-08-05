import { test,Locator } from '@playwright/test';

test('checkbox traversing & check', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes");

    const checkboxLocator:Locator = page.locator('#checkboxes input[type="checkbox"]');

    const count1 = await checkboxLocator.count();


    for (let i = 0; i < count1; i++) {
    const element = checkboxLocator.nth(i);
    await element.check();
}

    
});


