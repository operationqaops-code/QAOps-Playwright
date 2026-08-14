import{expect, Locator, Page, test} from '@playwright/test';

test.skip('select multiple combo box',async({page})=>{

//1.Open the website.
await page.goto("https://www.jqueryscript.net/demo/Drop-Down-Combo-Tree/");

const checkBoxIds: string[] = [
    '0', '1', '10', '11', '12',
    '2', '3', '4', '5',
    '510', '511', '512', '6','50','51'
];

//3.Click the dropdown to display the available options
await page.locator('#justAnInputBox').click();

//2.Identify the Multiple Selection dropdown.
const checkboxLocators = checkBoxIds.map(id =>
    page.locator(`span[data-id="${id}"] input[type="checkbox"]`).first()
);
const indexesToCheck:number[] = [0, 1, 5];

for (const [index, element] of checkboxLocators.entries()) {

    if (indexesToCheck.includes(index)) {
        //4. Select the following options:
        await element.check();
        //5.Verify all three selected
        await expect(element).toBeChecked();
    }else{
        await expect(element).not.toBeChecked();
    }
}

//6.Open the dropdown again and deselect Choice 2.

await page.locator('#justAnInputBox').click();
await checkboxLocators[1].uncheck();
await expect(checkboxLocators[1]).not.toBeChecked();

//7. Verify that only Choice 1 and Choice 3 remain selected.
await expect(checkboxLocators[0]).toBeChecked();
await expect(checkboxLocators[5]).toBeChecked();

await page.pause();


});

test('validate comboTree multiple checkboxes',async({page})=>{

    await page.goto("https://www.jqueryscript.net/demo/Drop-Down-Combo-Tree/");
    await page.locator('#justAnInputBox').click();

    await clickCheckBoxes(page,['choice 1','choice 2','choice 3']);
    await page.locator('#justAnInputBox1').click();
    await clickCheckBoxes1(page,['choice 1','choice 2 2','choice 6','choice 6 2']);
    await page.pause();

    


});

async function clickCheckBoxes(page:Page,choice:string[]):Promise<void>{

        for (let ch of choice) {
            
            const getCheckBox:Locator=page.locator('span.comboTreeItemTitle').filter({ hasText:`${ ch }`}).first();
            await getCheckBox.click();  
            
        }

    }

async function clickCheckBoxes1(page:Page,choice1:string[]):Promise<void>{
    for (const element of choice1) {
                
            const getCheckBox1:Locator=page.locator('span.comboTreeItemTitle').filter({ hasText:`${ element }`}).nth(1);
            await getCheckBox1.click();
            }
    
}
