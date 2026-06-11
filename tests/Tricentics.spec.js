const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageObjects-tricentics/POManager');

test.describe('Tricentics Ecom App Login', () => {

    test('Login with valid credentials & make a order', async ({page}) => {
        const userName="qaops.azure@gmail.com";
        const passWord="Abdul@786";
        const productName="Electronics";
        const purchaseItem="Smartphone";
        const countryName="India";
        const pinCode="73616";
        const city="Kolkata";
        const address1="NewTown Sector 5";
        const phoneNumber="9876543210";
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
        

        
    });
});