import {parentHRM} from './parentHRM';
import {ContactSalesPage} from './ContactSalesPage';
import {Page} from '@playwright/test';

export class POManager{
    page: Page;
    parenthrm: parentHRM;
    Contactsalespage: ContactSalesPage;

    constructor(page: Page){
        this.page=page;
        this.parenthrm=new parentHRM(this.page);
        this.Contactsalespage=new ContactSalesPage(this.page);
    }


    getHrmLoginPage(){
        return this.parenthrm;
    }

    getSalesPage(){
        return this.Contactsalespage;
    }

}

export default POManager;