const {test,expect}= require('@playwright/test');
class placeOrder{

    constructor(page){
        this.page=page;
        this.selectCountry=page.locator("[placeholder='Select Country']");
        this.dropDown=page.locator(".ta-results");
        this.CVVCode=page.locator("div.field.small input.input.txt");
        this.nameonCard=page.locator("div.field.small input.input.txt");
        this.userEmail=page.locator('.user__name.mt-5 input');
        this.cardExpiryDate=page.locator("select.input.ddl");
        this.submitorder=page.locator(".action__submit");
        this.orders=page.locator(".hero-primary");



    }

    async getCountry(){
        await this.selectCountry.type("A",{delay:100});
        await this.dropDown.waitFor();

        const optionsCount=await this.dropDown.locator("button").count();

        for(let i=0;i<optionsCount;i++){
            const text=await this.dropDown.locator("button").nth(i).textContent();
                if(text===" Argentina"){
                    this.dropDown.locator("button").nth(i).click();
                    break;
                }
        }

    }

    getUserEmail(){

        return this.userEmail.first();
        
    }

    async fillCardDetails(){
        await this.cardExpiryDate.nth(0).selectOption('05');
        await this.cardExpiryDate.nth(1).selectOption('20')
        await this.CVVCode.nth(0).fill("366");
        await this.nameonCard.nth(1).fill("Rahul");
    }

    async submitOrder(){
        await this.submitorder.click();


    }

    async confirmOrders(){
        await  expect (this.orders).toHaveText("Thankyou for the order.");

    }

}

module.exports={placeOrder};
