const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (userName, userPassword) {
    this.userName = userName;
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(userName, userPassword);
});

When('Add {string} to the cart', async function (productName) {
    const dashboardpage = this.poManager.getdashBoardPage();
    await dashboardpage.searchProductAddCart(productName);
    await dashboardpage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    const cartpage = this.poManager.getcartPage();
    await cartpage.verifyProductIsDisplayed(productName);
    await cartpage.Checkout();
});

When('Enter Valid details and place the Order', async function () {
    const placeorder = this.poManager.getplaceOrderPage();
    await placeorder.getCountry();
    await placeorder.getUserEmail();
    expect(placeorder.getUserEmail()).toHaveValue(this.userName);
    await placeorder.fillCardDetails();
    await placeorder.submitOrder();
    await placeorder.confirmOrders();
});

Then('Verify Order is present in the OrderHistory', async function () {
    const searchorders = this.poManager.getSearchOrderPage();
    await searchorders.getOrderId();
    //await searchorders.getOrderDetails();
});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const userName = this.page.locator('#username');
    const signIn = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userName.type(username);
    await this.page.locator("[type='password']").type(password);
    await signIn.click();
});

Then('Verify Error message is displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});
