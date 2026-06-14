const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageObjects-tricentics/POManager');

test.describe('Tricentics Ecom App Login', () => {

    test('Login with valid credentials & make a order', async ({page}) => {
        const testData = require('../test-data-tricentics/confirmOrder.json');
        const userName = testData.loginCredentials.userName;
        const passWord = testData.loginCredentials.passWord;
        const productName = testData.productDetails.productName;
        const purchaseItem = testData.productDetails.purchaseItem;
        const countryName = testData.shippingDetails.countryName;
        const pinCode = testData.shippingDetails.pinCode;
        const city = testData.shippingDetails.city;
        const address1 = testData.shippingDetails.address1;
        const phoneNumber = testData.shippingDetails.phoneNumber;
        const ExpectedShippingMethod = testData.orderDetails.ExpectedShippingMethod;
        const PaymentMethod = testData.orderDetails.PaymentMethod;
        const cardType = testData.cardDetails.cardType;
        const cardholderName = testData.cardDetails.cardholderName;
        const cardNumber = testData.cardDetails.cardNumber;
        const expireMonth = testData.cardDetails.expireMonth;
        const expireYear = testData.cardDetails.expireYear;
        const cardCode = testData.cardDetails.cardCode;

        const poManager=new POManager(page);
        const loginPage=poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.loginWithValidCred(userName,passWord);
        await expect(page.getByText(userName)).toBeVisible();

        const dashBoardPage=poManager.getDashBoardPage();
        await dashBoardPage.searchProductAddCart(productName);
        await dashBoardPage.addToCart(purchaseItem);
        await dashBoardPage.fillCartDetails();

        const cartpage=poManager.getcartPage();
        await cartpage.getCountry(countryName);
        await cartpage.fillPostalCode(pinCode);

        const checkoutpage=poManager.getcheckOutPage();
        await checkoutpage.checkOutProduct(userName,countryName,city,address1,pinCode,phoneNumber);
        await checkoutpage.getShippingMethod(ExpectedShippingMethod);
        await checkoutpage.getPaymentMethod(PaymentMethod);
        await checkoutpage.getCardDetails(cardType, cardholderName, cardNumber, expireMonth, expireYear, cardCode);
        await checkoutpage.confirmOrderr();
        //await expect(page.getByText('Your order has been successfully processed!')).toBeVisible();

        
        
    });
});