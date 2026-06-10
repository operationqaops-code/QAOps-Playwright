const{test,expect}=require('@playwright/test');
class DashboardPage {

    constructor(page) {

        this.menuItems = page.locator('ul.top-menu > li');
        this.products = page.locator('.product-item');
        this.content=page.locator(".content");


    }

    async searchProductAddCart(productName) {
        const count = await this.menuItems.count();
        for (let i = 0; i < count; i++) {
            const item = this.menuItems.nth(i);
            const menuName = (await this.menuItems.nth(i).locator('a').first().textContent())?.trim();
            //console.log(menuName);
            if (menuName === productName) {
                console.log(productName);
                await item.hover();
                await item.locator('ul.sublist').waitFor({ state: 'visible' });
                //console.log('Clicking Cell phones');
                await item.getByRole('link', { name: 'Cell phones' }).click();
                break;
            }
        }

    }

    async addToCart(purchaseItem) {
        await this.products.first().waitFor();
        const productsCount = await this.products.count();
        console.log(productsCount);

        for (let i = 0; i < productsCount; i++) {
            const product = this.products.nth(i);
            const title = await product.locator('.product-title a').textContent();
            console.log(title);
            if (title?.trim() === purchaseItem) {
                await product.locator('input[value="Add to cart"]').click();
                break;
            }

        }
        await expect(this.content).toBeVisible();

    }

}

module.exports = { DashboardPage };
