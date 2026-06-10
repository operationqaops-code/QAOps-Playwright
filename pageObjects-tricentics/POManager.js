const { DashboardPage } = require('./DashboardPage');
const {LoginPage} = require('./LoginPage');
class POManager{

    constructor(page){
        this.page=page;
        this.loginPage=new LoginPage(this.page);
        this.dashBoardPage=new DashboardPage(this.page);
    }


    getLoginPage(){
        return this.loginPage;
    }
   
    getDashBoardPage(){
        return this.dashBoardPage;
    }
   
}

module.exports={POManager};
