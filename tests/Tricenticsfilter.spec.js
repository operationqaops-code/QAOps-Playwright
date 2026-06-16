const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageObjects-tricentics/POManager');

test.describe('Tricentics Ecom App Login', () => {

    test('Login with valid credentials Filter product', async ({page}) => {
        const testData = require('../test-data-tricentics/confirmOrder.json');
        const userName = testData.loginCredentials.userName;
        const passWord = testData.loginCredentials.passWord;
        const productName = testData.productDetails.productName;
        const purchaseItem = testData.productDetails.purchaseItem;
        const filterName=testData.filterDetails.filterName;
        const DisplayItem=testData.filterDetails.DisplayItem;
        const ViewType=testData.filterDetails.ViewType;
        const ExpectedPrice=testData.filterDetails.ExpectedPrice;
        const processor=testData.ComputerConfig.processor;
        const ram=testData.ComputerConfig.ram;
        const hdd=testData.ComputerConfig.hdd;
        const softwares=testData.ComputerConfig.softwares;

        const poManager=new POManager(page);
        const loginPage=poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.loginWithValidCred(userName,passWord);
        await expect(page.getByText(userName)).toBeVisible();

        const dashBoardPage=poManager.getDashBoardPage();
        await dashBoardPage.searchProductAddCart(productName,purchaseItem);

        const filterPage=poManager.getfilterPage();
        await filterPage.applyFilter(filterName,DisplayItem,ViewType,ExpectedPrice);

        const addcomputerpage=poManager.getComputerdetails();
        await addcomputerpage.addConfigDetails(processor,ram,hdd,softwares);
        await addcomputerpage.addProductToCart();


        
        
    });
});