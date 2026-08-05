import { test } from '@playwright/test';
import { POManager } from '../../OrangeHRM-pom/POManager';
import ContactSalesPage from '../../OrangeHRM-pom/ContactSalesPage';

test('Handle Switching of page', async ({ page }) => {

    const pomanager = new POManager(page);

    const salesP = pomanager.getHrmLoginPage();
    await salesP.goto();

    const childPage = await salesP.openChildPage();
    const salesC = new ContactSalesPage(childPage);
    await salesC.getTitle();
    await salesC.clickContactSales();
    await salesC.fillFormToTalkToExpert();
    await salesC.selectNavigationLink("Book a Free Demo");
    //await page.waitForTimeout(3000);

});