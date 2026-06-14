const{expect}=require('@playwright/test');

class lastProductViewPage{    

    constructor(page){
        this.page=page;
        this.lastProductViewLink=page.locator("a:has-text('Recently viewed products')");
        this.productName=page.locator(".product-name a");
        this.homePageLink=page.locator("//img[@alt='Tricentis Demo Web Shop']");

    }

    async verifyLastProductView(purchaseItem){
        await this.page.waitForLoadState('networkidle');
        await this.homePageLink.click();
        await expect(this.lastProductViewLink).toBeVisible();
        const productNameText=await this.productName.textContent();
        console.log(productNameText);
        await expect(productNameText).toBe(purchaseItem);
    }

}

module.exports={lastProductViewPage};
