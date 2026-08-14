import { FrameLocator, Locator, test } from '@playwright/test';

test('handling svg element in a map', async ({ page }) => {
    await page.goto("https://petdiseasealerts.org/forecast-map#/");
    await page.waitForTimeout(5000)

    //Note - Xpath does not work here
    //svg - scaler vector graphs
    let frame: FrameLocator = page.frameLocator('iframe[id*="instance"]');

    let allRegion: Locator[] = await frame.locator('g.region').all()

    for (const reg of allRegion) {
        let region = await reg.boundingBox();

        /* let centerx = region!.x + region!.width / 2
        let centery = region!.y + region!.height / 2
        await page.mouse.move(centerx, centery) */

        await page.mouse.move(region!.x + region!.width / 2, region!.y + region!.height / 2);

    }

    await page.pause();


});