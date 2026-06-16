const{expect,test}=require('@playwright/test');

class addComputersToCartPage{

    constructor(page,processor,ram,hdd,softwares){
        this.page=page;
        this.quantity=page.locator("#addtocart_72_EnteredQuantity");
        this.AddToCart=page.locator('#add-to-cart-button-72');
        this.content=page.locator(".content");

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
    

}

module.exports={addComputersToCartPage};