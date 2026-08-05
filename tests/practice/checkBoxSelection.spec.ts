import{test,expect} from '@playwright/test';

test.skip('checkbox by map method', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    let arr:string[]=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let getLocator=arr.map(a=>page.getByLabel(a));

    for (const loc of getLocator) {
        await loc.check();
        
    }
    

  await page.pause();

});

test('check set of checkbox by map method', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    let arr:string[]=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let getLocator=arr.map(a=>page.getByLabel(a));

    for (const loc of getLocator.slice(-7)) {
        await loc.check();
        
    }
    

  await page.pause();

});

