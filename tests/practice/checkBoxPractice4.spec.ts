import{test} from '@playwright/test';

test('checkbox handling',async({page})=>{

await page.goto("https://practice.expandtesting.com/checkboxes");

const allLocator:string[]=['Checkbox 1','Checkbox 2'];
const getAllLocator=allLocator.map(a=>page.getByLabel(a));

for (const element of getAllLocator) {
    await element.check();
    
}


await page.pause();

})