const{expect,test} = require('@playwright/test');
const {POManager} = require('../pageObjects-tricentics/POManager');

test.describe('Tricentics Ecom App - Last Product View', () => {

    test('Verify last product view functionality', async ({page}) => {
        const testData = require('../test-data-tricentics/confirmOrder.json');
        const userName = testData.loginCredentials.userName;
        const passWord = testData.loginCredentials.passWord;
        const purchaseItem = testData.productDetails.purchaseItem;
        const productName = testData.productDetails.productName;

        const poManager=new POManager(page);

        const loginPage=poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.loginWithValidCred(userName,passWord);
        await expect(page.getByText(userName)).toBeVisible();

        const dashBoardPage=poManager.getDashBoardPage();
        await dashBoardPage.searchProductAddCart(productName);
        await dashBoardPage.addToCart(purchaseItem);

        const lastProductViewed = poManager.getLastProductViewPage();
        await lastProductViewed.verifyLastProductView(purchaseItem);

    });
});