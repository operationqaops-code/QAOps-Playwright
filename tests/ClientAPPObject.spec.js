//create a test case to sign in the the online shopping site and add a product to cart and verify that the correct product added in the cart then place order and verify order placed successfully.
const {test,expect,request}= require('@playwright/test');
const {POManager}=require('../pageObjects/POManager');
const{customtest}=require('../utils/test-base');
//JSON->String->JS Objects

const dataSet=JSON.parse(JSON.stringify(require("../test-data/placeOrderTestData.json")));

for(const data of dataSet){
    test(`Client app Login for  ${data.productName}`,async({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();

    const poManager=new POManager(page);

    const loginPage=poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.userName,data.userPassword);

    const dashboardpage=poManager.getdashBoardPage();
    await dashboardpage.searchProductAddCart(data.productName);
    await dashboardpage.navigateToCart();

    const cartpage=poManager.getcartPage();
    await cartpage.verifyProductIsDisplayed(data.productName);
    await cartpage.Checkout();

    const placeorder=poManager.getplaceOrderPage();
    await placeorder.getCountry();
    await placeorder.getUserEmail();
    expect(placeorder.getUserEmail()).toHaveValue(data.userName);
    await placeorder.fillCardDetails();
    await placeorder.submitOrder();
    await placeorder.confirmOrders();
    
    const searchorders=poManager.getSearchOrderPage();
    await searchorders.getOrderId();
    await searchorders.getOrderDetails();

});

}

 customtest(`Client app Login`,async({browser,testDataForOrder})=>{

    const context=await browser.newContext();
    const page=await context.newPage();

    const poManager=new POManager(page);

    const loginPage=poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.userName,testDataForOrder.userPassword);

    const dashboardpage=poManager.getdashBoardPage();
    await dashboardpage.searchProductAddCart(testDataForOrder.productName);
    await dashboardpage.navigateToCart();

    const cartpage=poManager.getcartPage();
    await cartpage.verifyProductIsDisplayed(testDataForOrder.productName);
    await cartpage.Checkout();

 });
