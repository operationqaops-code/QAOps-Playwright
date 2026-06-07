const {test,expect}= require('@playwright/test');
class searchOrders{

    constructor(page){

        this.page=page;
        this.orderId=page.locator("label[class='ng-star-inserted']");
        this.myOrders=page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']");
        this.rows=page.locator("tbody tr");
        this.loadTable=page.locator("tbody");
        this.orderIdDetails=page.locator(".col-text.-main");


    }

    async getOrderId(){

        this.orderIds=await this.orderId.textContent();
        await this.myOrders.click();
        await this.loadTable.waitFor();

        for(let i=0;i< await this.rows.count();i++){
            const roworderId= await this.rows.nth(i).locator("th").textContent();
                if(this.orderIds.includes(roworderId)){
                    await this.rows.nth(i).locator("button").first().click();
                    break;
                }
        }

    }

    async getOrderDetails(){

        const orderidDetls= await this.orderIdDetails.textContent();
        expect (this.orderIds.includes(orderidDetls)).toBeTruthy();
        

    }


}

module.exports={searchOrders};