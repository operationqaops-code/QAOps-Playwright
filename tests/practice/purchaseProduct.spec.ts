import{test,expect} from '@playwright/test'
import {POManager} from '../../Practice-POM-ecom/POManager';
import testData from '../../practice-ecom-testData/test-base.json';

test('Purchase Product', async ({ page}) => {
    const userName = testData.userName;
    const passWord = testData.userPassword;
    const getProduct = testData.getProduct;
    const purchaseItem = testData.purchaseItem;
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.signUpUser(userName, passWord);
    await page.getByText('My Account').nth(0).highlight();
    let myAccountVisible = await page.getByText('My Account').nth(0).isVisible();
    expect(myAccountVisible).toBeTruthy();

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.navigateToProduct(getProduct, purchaseItem);

   await dashboardPage.addToCart();

   await dashboardPage.selectDate('2023', 'Jan', '15');
   await dashboardPage.selectTime(24,30);

   
  


});