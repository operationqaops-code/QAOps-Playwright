const {test,expect}=require('@playwright/test');

test('UI validation' ,async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();

    const URL="https://rahulshettyacademy.com/AutomationPractice/";

    await page.goto(URL);
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.on('dialog',dialog=>dialog.accept());
    await page.locator("#confirmbtn").click()



});