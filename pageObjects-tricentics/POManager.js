const { cartPage } = require('./cartPage');
const { DashboardPage } = require('./DashboardPage');
const {LoginPage} = require('./LoginPage');
const{checkoutPage}=require('./checkoutPage');

class POManager{

    constructor(page){
        this.page=page;
        this.loginPage=new LoginPage(this.page);
        this.dashBoardPage=new DashboardPage(this.page);
        this.cartpage=new cartPage(this.page);
        this.checkOutPage=new checkoutPage(this.page);
    }


    getLoginPage(){
        return this.loginPage;
    }
   
    getDashBoardPage(){
        return this.dashBoardPage;
    }
    getcartPage(){
        return this.cartpage;
    }
   getcheckOutPage(){
    return this.checkOutPage;
   }

   
}

module.exports={POManager};
