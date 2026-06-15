const{expect}=require('@playwright/test');

class lastProductViewPage{    

    constructor(page){
        this.page=page;
        this.lastProductViewLink=page.locator("a:has-text('Recently viewed products')");
        this.productName=page.locator(".product-name a");
        this.homePageLink=page.locator("//img[@alt='Tricentis Demo Web Shop']");

    }

 async verifyLastProductView(purchaseItem) {
    await this.homePageLink.click();
    await expect(this.lastProductViewLink).toBeVisible();

    await this.lastProductViewLink.click();
    await expect(this.productName.first()).toBeVisible();

    const productNameText = await this.productName.first().textContent();
    console.log(productNameText);
    await expect(productNameText).toBe(purchaseItem);
}

}

module.exports={lastProductViewPage};
