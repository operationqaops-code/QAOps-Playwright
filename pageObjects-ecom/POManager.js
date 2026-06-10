const {LoginPage} =require('./LoginPage');
const {DashboardPage} =require('./DashboardPage');
const {PlaceOrderPage} =require('./PlaceOrderPage');

class POManager{

    constructor(page){
        this.page=page;
        this.loginPage=new LoginPage(this.page);
        this.dashboardPage= new DashboardPage(this.page);
        this.placeOrderPage=new PlaceOrderPage(this.page);
    }


    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getPlaceOrderPage(){
        return this.placeOrderPage;
    }
}

module.exports={POManager};
