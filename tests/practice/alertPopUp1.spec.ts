import { test, expect } from '@playwright/test';

test('Handle Popup & Alert Box!', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', async (dialog) => {

        switch (dialog.type()) {
            case 'alert': expect(dialog.message()).toBe('I am an alert box!');
                dialog.accept();
                break;
            case 'confirm':expect(dialog.message()).toBe('Press a button!');
               dialog.accept();
               break;
            case 'prompt':expect(dialog.message()).toBe('Please enter your name:');
                dialog.accept('Harry');
                break;
        }
    });

    await page.locator('button#alertBtn').first().click();
    await page.locator('button#confirmBtn').first().click();
    await expect(page.locator('#demo')).toHaveText('You pressed OK!')
    await page.locator('button#promptBtn').first().click();
    await expect(page.locator('#demo')).toHaveText('Hello Harry! How are you today?');
    
});