import { test } from '@playwright/test';

test('check & Uncheck checkboxes', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const allLocators = [
        '#checkBoxOption1',
        '#checkBoxOption2',
        '#checkBoxOption3'
    ];
    for (const element of allLocators) {
        await page.locator(element).check();
    }

    /*  for (const element of getAllLocators) {
         await element.uncheck();
         
     }  */


    await page.pause();

});