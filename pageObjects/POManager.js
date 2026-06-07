const {LoginPage} =require('./LoginPage');
const {DashboardPage}=require('./DashboardPage');
const {cartPage}=require('./cartPage');
const {placeOrder}=require('./placeOrder');
const {searchOrders}=require('./searchOrders');

class POManager{

    constructor(page){
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
