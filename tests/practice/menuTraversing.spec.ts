import{Locator, test}from '@playwright/test';

test('traversing menu bar',async({page})=>{

    await page.goto("https://www.testmuai.com/");

    const menuLoc:Locator=page.locator('.chfw-dropdown-toggle');
    const testPlannerLoc:Locator=page.getByText("Test Planner Agent");
    const searchText:Locator=page.locator('//textarea[contains(@placeholder, "Generate test cases")]');
    const expectedMenu:string="AI Agents";
    const Menucount=await menuLoc.count();
    for (let i = 0; i < Menucount; i++) {
        const item = menuLoc.nth(i);
        const element=await item.textContent();
        console.log(element);
        if(element?.includes(expectedMenu) ){
            await item.click();
            break;
            
        }

        
    }

    await testPlannerLoc.click();
    await searchText.type("write a test case to automate login page using playwright");
    await searchText.press('Enter');
    await page.pause();


});

