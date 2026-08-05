import { test, expect } from '@playwright/test';
test('Alert popup handling', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    
    page.on('dialog', async (dialog) => {

        switch (dialog.type()) {
            case 'alert':
                expect(dialog.message()).toBe('I am an alert box!');
                await dialog.accept();
                break;
            case 'confirm':     
                expect(dialog.message()).toBe('Press a button!');
                await dialog.accept();
                break;
            case 'prompt':
                expect(dialog.message()).toBe('Please enter your name:');
                await dialog.accept('Abdul');
                break;
        }
    });

    await page.locator('button#alertBtn').first().click();
    await page.locator('button#confirmBtn').first().click();
    await expect(page.locator("#demo")).toHaveText("You pressed OK!");
    await page.locator('button#promptBtn').first().click();
    await expect(page.locator("#demo")).toHaveText("Hello Abdul! How are you today?");
    await page.waitForTimeout(2000);
});