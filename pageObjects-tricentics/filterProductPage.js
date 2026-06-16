const{expect,test}=require('@playwright/test');
class filterProductPage{

    constructor(page){
        this.page=page;
        this.sortBy=page.locator('select#products-orderby');
        this.pageSize=page.locator('select#products-pagesize');
        this.viewType=page.locator('select#products-viewmode');
        this.productList=page.locator('.product-item');
        this.filterByPrice=page.locator(".price-range-selector li a");
        this.productTitle=page.locator(".product-title a");
        this.filteredProductList=page.locator(".product-item");
        this.productPrice = page.locator(".price.actual-price");



    }


    async applyFilter(filterName,DisplayItem,ViewType,ExpectedPrice){
        await expect(this.sortBy).toBeVisible();
        await this.sortBy.selectOption(filterName);
        await this.page.waitForLoadState('networkidle');
        await this.pageSize.selectOption(DisplayItem);
        await this.page.waitForLoadState('networkidle');
        await this.viewType.selectOption(ViewType);
        await this.page.waitForLoadState('networkidle');
        await expect(this.productList.first()).toBeVisible();
        await expect(this.productList).toHaveCount(Number(DisplayItem));
        await this.filterByPrice.filter({ hasText: "Under" }).click();
        await this.filteredProductList
    .filter({
        has: this.productPrice.filter({ hasText: ExpectedPrice })
    })
    .locator(".product-title a").first()
    .click();


}


}

module.exports={filterProductPage};
