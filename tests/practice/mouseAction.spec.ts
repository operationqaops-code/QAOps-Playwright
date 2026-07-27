import {test,expect} from '@playwright/test';
import {POManager} from '../../Practice-POM-ecom/POManager';
import testData from '../../practice-ecom-testData/test-base.json';
test("mouse actions",async({page})=>{

    const expectedText=testData.expectedText;
    const actualText = "India, officially the Republic of India";
    const poManager = new POManager(page);
    const mouseops=poManager.gotoPage();
    await mouseops.goto();
    await mouseops.mouseHover();
    await mouseops.dragnDrop();
    await mouseops.rightClick();
    await mouseops.searchBox(expectedText);
    expect(actualText).toBe("India, officially the Republic of India");


})
