const{test,expect}=require('@playwright/test');
class DashboardPage {

    constructor(page) {

        this.menuItems = page.locator('ul.top-menu > li');
        this.products = page.locator('.product-item');
        this.content=page.locator(".content");
        this.price=page.locator('.prices .actual-price');
        this.productSelected=page.locator(".product-name");
        this.quantity=page.locator('.qty-input');
        this.cart=page.locator("a[class='ico-cart'] span[class='cart-label']");
        this.productSubTotal=page.locator(".product-subtotal");
        this.prices=null;

    }

    async searchProductAddCart(productName) {
        const count = await this.menuItems.count();
        for (let i = 0; i < count; i++) {
            const item = this.menuItems.nth(i);
            const menuName = (await this.menuItems.nth(i).locator('a').first().textContent())?.trim();
            if (menuName === productName) {
                await item.hover();
                await item.locator('ul.sublist').waitFor({ state: 'visible' });
                await item.getByRole('link', { name: 'Cell phones' }).click();
                break;
            }
        }

    }

    async addToCart(purchaseItem) {
        await this.products.first().waitFor();
        const productsCount = await this.products.count();
        for (let i = 0; i < productsCount; i++) {
            const product = this.products.nth(i);
            const title = await product.locator('.product-title a').textContent();
            if (title?.trim() === purchaseItem) {
                this.prices=await this.price.nth(i).textContent();
                await product.locator('input[value="Add to cart"]').click();
                break;
            }

        }
        await expect(this.content).toBeVisible();

    }

      async fillCartDetails(){
        
        let countQuantity;
        let ExpectedtotalAmount;
        let ActualtotalAmount;
        await this.cart.click();
        await this.cart.first().waitFor();
        await expect(this.productSelected).toBeVisible();
        await this.productSelected.waitFor();
        countQuantity=await this.quantity.getAttribute('value');
        ExpectedtotalAmount=countQuantity * this.prices;
        ActualtotalAmount=Number(await this.productSubTotal.textContent());
        await expect(ExpectedtotalAmount).toBe(ActualtotalAmount);

    }

}

module.exports = { DashboardPage };
