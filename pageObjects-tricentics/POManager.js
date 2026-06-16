const { cartPage } = require('./cartPage');
const { DashboardPage } = require('./DashboardPage');
const {LoginPage} = require('./LoginPage');
const{checkoutPage}=require('./checkoutPage');
const{lastProductViewPage}=require('./lastProductViewPage');
const{filterProductPage}=require('./filterProductPage');
const{addComputersToCartPage}=require('./addComputersToCartPage');

class POManager{

    constructor(page){
        this.page=page;
        this.loginPage=new LoginPage(this.page);
        this.dashBoardPage=new DashboardPage(this.page);
        this.cartpage=new cartPage(this.page);
        this.checkOutPage=new checkoutPage(this.page);
        this.lastproduct=new lastProductViewPage(this.page);
        this.filterPage=new filterProductPage(this.page);
        this.addComputer=new addComputersToCartPage(this.page);
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
   getfilterPage(){
    return this.filterPage;
   }
   getComputerdetails(){
    return this.addComputer;
   }

}

module.exports={POManager};
