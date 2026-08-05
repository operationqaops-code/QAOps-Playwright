import{test} from '@playwright/test';

test('checkbox validation',async({page})=>{

    await page.goto("https://www.testmuai.com/selenium-playground/checkbox-demo/");
    let labelOptions:string[]=['Option 1','Option 2','Option 3','Option 4'];
    let geAllLocators=labelOptions.map(a=>page.getByLabel(a).nth(0));

    for (const element of geAllLocators) {

        if(await element.isDisabled()){
            continue;

        }
        await element.check();
        
    }

    await page.pause();


});