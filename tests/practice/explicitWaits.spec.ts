import{test,ElementHandle} from '@playwright/test';

test('Handling StaleElementReferenceException with exlicit wait',async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

//waitForSelector -- applicable for css/xpath selector only, states: visible, attached, detached, hidden, default is visible

    const name:ElementHandle<SVGElement | HTMLElement>= (await page.waitForSelector('//input[@placeholder="Enter Name"]', { state: 'visible' }));
    await name.fill("Harry");
//waitFor--applicable for all the locators,states:visible,attached,detached,hidden
    await page.getByRole('textbox', { name: 'Enter EMail' }).waitFor({ state:'visible' });
    await page.getByRole('textbox', { name: 'Enter EMail' }).fill("harry@example.com");









})