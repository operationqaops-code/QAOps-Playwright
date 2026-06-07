import{LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {cartPage} from './cartPage';
import {placeOrder} from './placeOrder';
import {searchOrders} from './searchOrders';
import {Page} from '@playwright/test';

export class POManager{

    loginPage:LoginPage;
    dashboardPage : DashboardPage;
    CartPage : cartPage;
    PlaceOrder : placeOrder;
    SearchOrder : searchOrders;
    page :Page;

    constructor(page:Page){
        this.page=page;
        this.loginPage=new LoginPage(this.page);
        this.dashboardPage=new DashboardPage(this.page);
        this.CartPage=new cartPage(this.page);
        this.PlaceOrder=new placeOrder(this.page);
        this.SearchOrder=new searchOrders(this.page);
    }


    getLoginPage(){
        return this.loginPage;
    }

    getdashBoardPage(){
        return this.dashboardPage;
    }

    getcartPage(){
        return this.CartPage;

    }

    getplaceOrderPage(){
        return this.PlaceOrder;
    }

    getSearchOrderPage(){
        return this.SearchOrder;
    }
}

module.exports={POManager};
