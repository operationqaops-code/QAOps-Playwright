const { cartPage } = require('./cartPage');
const { DashboardPage } = require('./DashboardPage');
const {LoginPage} = require('./LoginPage');
const{checkoutPage}=require('./checkoutPage');
const{lastProductViewPage}=require('./lastProductViewPage');

class POManager{

    constructor(page){
        this.page=page;
        this.loginPage=new LoginPage(this.page);
        this.dashBoardPage=new DashboardPage(this.page);
        this.cartpage=new cartPage(this.page);
        this.checkOutPage=new checkoutPage(this.page);
        this.lastproduct=new lastProductViewPage(this.page);
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

   getLastProductViewPage(){
    return this.lastproduct;
   }

}

module.exports={POManager};
