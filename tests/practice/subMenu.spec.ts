import { test, expect } from '@playwright/test';

test("Submenu Handling", async ({ page }) => {
    await page.goto("https://www.bigbasket.com/");

    await page.getByRole("button", { name: "Shop by Category" }).nth(1).click();
    await page.waitForTimeout(2000);

    const beverages = page.locator("//a[contains(@href,'/cl/beverages/')]").filter({ visible: true });
    await beverages.hover();

    const tea = beverages.locator("xpath=following::a[@href='/pc/beverages/tea/?nc=nb'][1]");
    await tea.hover();

    const greenTea = page.locator("//a[contains(@href,'green-tea')]");
    await greenTea.waitFor({ state: "visible" });
    await greenTea.click();

    await page.waitForTimeout(2000);

    const verifyGreenTea = page.locator(`//div[text()="Choose from a variety of green tea with different mixes and green tea bags online."]`);
    await expect(verifyGreenTea).toHaveText("Choose from a variety of green tea with different mixes and green tea bags online.");

});