import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {mouseAction} from './mouseAction';
import{paginationWebTable} from './paginationWebTable';
import {Page} from '@playwright/test';

export class POManager{
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    mouseaction: mouseAction;
    paginationtable:paginationWebTable;

    constructor(page: Page){
        this.page=page;
        this.loginPage=new LoginPage(this.page);
        this.dashboardPage=new DashboardPage(this.page);
        this.mouseaction=new mouseAction(this.page);
        this.paginationtable=new paginationWebTable(this.page);

    }


    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }
    gotoPage(){
        return this.mouseaction;
    }
    getWebTable(){
        return this.paginationtable;
    }

}

export default POManager;
