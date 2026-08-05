import { test, expect } from '@playwright/test';
import { POManager } from '../../Practice-POM-ecom/POManager';

test("Submenu Handling", async ({ page }) => {
    const poManager = new POManager(page);
    const MainCat = poManager.getMainCategory();
    await MainCat.goto();
    //await MainCat.getsubCategories();



    /* const verifyGreenTea = page.locator(`//div[text()="Choose from a variety of green tea with different mixes and green tea bags online."]`);
    await expect(verifyGreenTea).toHaveText("Choose from a variety of green tea with different mixes and green tea bags online."); */

});