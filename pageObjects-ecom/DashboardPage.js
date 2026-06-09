const {expect}=require('@playwright/test');
class DashboardPage{

    constructor(page){
        this.page=page;
        this.verifySuccess=page.locator("div[aria-label='Login Successfully']");
        this.products=page.locator('.card-body');
        this.productName=page.locator('.card-body b');
        this.cart=page.locator("[routerlink *='cart']");

    }

    async searchProductAddCart(productName){
        await this.productName.first().waitFor();
        const productCard = await this.products.filter({ hasText: productName });
        await productCard.locator('text= Add To Cart').click();

    }

    async navigateAndValidateCart(productName){
        await this.cart.click();
        //put assertion to productName
        await expect(this.page.getByText(productName)).toBeVisible();
    }

}
module.exports={DashboardPage};