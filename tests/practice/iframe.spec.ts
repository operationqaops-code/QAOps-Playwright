import { test, expect, FrameLocator } from '@playwright/test';

test("iframe Handling", async ({ page }) => {

    await page.goto('https://selectorshub.com/iframe-scenario/')
    await page.waitForTimeout(4000);
    let frame1: FrameLocator = page.frameLocator('iframe#pact1').first();
    await frame1.locator("input#inp_val").first().fill('xyz');
    let frame2: FrameLocator = frame1.frameLocator('iframe#pact2').first();
    await frame2.locator("input#jex").first().fill('Abdul')
    let frame3: FrameLocator = frame2.frameLocator('iframe#pact3').first();
    await frame3.locator("input#glaf").first().fill('abcd');
    await page.waitForTimeout(4000);




})