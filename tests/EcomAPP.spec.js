const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageObjects-ecom/POManager');

test.describe('Ecom App Login', () => {

    test('Login with valid credentials', async ({page}) => {
        const poManager = new POManager(page);
        const productName="ZARA COAT 3";
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.signUpUser('awalom.official@gmail.com', 'Abdul@786');

        const dashboardPage = poManager.searchProductAddCart();
        await dashboardPage.searchProductAddCart(productName);
        await dashboardPage.navigateAndValidateCart(productName);
    });
});