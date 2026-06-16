const{expect,test}=require('@playwright/test');

class addComputersToCartPage{

    constructor(page,processor,ram,hdd,softwares){
        this.page=page;
        this.quantity=page.locator("#addtocart_72_EnteredQuantity");
        this.AddToCart=page.locator('#add-to-cart-button-72');
        this.content=page.locator(".content");
        this.productUnitPrice=page.locator('.product-unit-price');
        this.productSelected=page.locator(".product-name");
        this.quantity=page.locator('.qty-input');
        this.cart=page.locator("a[class='ico-cart'] span[class='cart-label']");
        this.productSubTotal=page.locator(".product-subtotal");
        //this.prices=null;

    }

    async addConfigDetails(processor,ram,hdd,softwares){
        // const labels = await this.page.locator("label").allTextContents();
        // console.log(labels.map(label => label.trim()));
        await this.page.getByLabel(processor).check();
        await this.page.getByLabel(ram).check();
        await this.page.getByLabel(hdd).check();
        await this.page.getByLabel(softwares).check();


    }

    async addProductToCart(){
        await this.quantity.clear();
        await this.quantity.fill("2");
        await this.AddToCart.click();
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
        let prices=await this.productUnitPrice.textContent();
        ExpectedtotalAmount=countQuantity * prices;
        ActualtotalAmount=Number(await this.productSubTotal.textContent());
        await expect(ExpectedtotalAmount).toBe(ActualtotalAmount);

    }
    

}

module.exports={addComputersToCartPage};