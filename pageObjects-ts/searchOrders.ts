import {test,expect,Page,Locator} from '@playwright/test';
export class searchOrders{
    page : Page;
    orderId : Locator;
    myOrders : Locator;
    rows : Locator;
    loadTable : Locator;
    orderIdDetails : Locator;
    

    constructor(page:Page){

        this.page=page;
        this.orderId=page.locator("label[class='ng-star-inserted']");
        this.myOrders=page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']");
        this.rows=page.locator("tbody tr");
        this.loadTable=page.locator("tbody");
        this.orderIdDetails=page.locator(".col-text.-main");


    }

    async getOrderId(){
        const orderIds : any=await this.orderId.textContent();
        await this.myOrders.click();
        await this.loadTable.waitFor();

        for(let i=0;i< await this.rows.count();i++){
            const roworderId= await this.rows.nth(i).locator("th").textContent();
                if(orderIds.includes(roworderId)){
                    await this.rows.nth(i).locator("button").first().click();
                    break;
                }
        }

         const orderidDetls= await this.orderIdDetails.textContent();
         expect (orderIds.includes(orderidDetls)).toBeTruthy();

    }

   /* async getOrderDetails(){

        const orderidDetls= await this.orderIdDetails.textContent();
        expect (orderIds.includes(orderidDetls)).toBeTruthy();
        

    }
    */


}

module.exports={searchOrders};