import{Locator, test} from '@playwright/test';

test('validate option by using filter',async({page})=>{

    await page.goto("https://www.google.com/");
    await page.getByRole('combobox',{name:'Search'}).type('selenium');

    const suggestions:Locator= page.locator('li');

    await suggestions.filter({hasText: 'selenium 3x',visible:true}).first().click(); 

    await page.pause();

});

