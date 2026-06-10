const {test,expect}= require('@playwright/test');

class PlaceOrderPage{
    constructor(page){

        this.page=page;
        this.cardExpiry=page.locator("select.input.ddl");
        this.CVV=page.locator("(//input[@type='text'])[2]");
        this.nameOnCard=page.locator("(//input[@type='text'])[3]");
        this.userEmail=page.locator('.user__name.mt-5 input');
        this.selectCountry=page.locator("[placeholder='Select Country']");
        this.dropDown=page.locator(".ta-results");
        this.submitorder=page.locator(".action__submit");

    }
    async fillCardDetails(){
        await this.CVV.nth(0).fill("367");
        await this.nameOnCard.fill("Abdul");
        await this.cardExpiry.nth(0).selectOption('05');
        await this.cardExpiry.nth(1).selectOption('20');

    }

    async getCountryForShipping(){
        await this.selectCountry.pressSequentially("A",{delay:100});
        await this.dropDown.waitFor();
        const optionsCount=await this.dropDown.locator("button").count();

        for (let i=0;i<optionsCount;i++){
            const text= await this.dropDown.locator("button").nth(i).textContent();
            if(text===" Argentina"){
                this.dropDown.locator("button").nth(i).click();
                break;
            }

        }
    }

    async submitOrder(){
        await this.submitorder.click();
    }

    async validateOrderDeatails(productName){

        await expect(this.page.getByText(productName)).toBeVisible();
        await expect(this.page.getByText("Thankyou for the order.")).toBeVisible();


    }

}

module.exports={PlaceOrderPage};