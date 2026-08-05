import { Locator, Page, } from '@playwright/test';

export class ContactSalesPage {

    page: Page;
    cntSales: Locator;
    FullName: Locator;
    Email: Locator;
    PhoneNumber: Locator;
    country: Locator;
    companyName: Locator;
    JobTitle: Locator;
    NumberOfEmp: Locator;
    comment: Locator;
    check_Box: Locator;
    navLink: Locator;
    aboutUs:Locator;
    recruitment:Locator;
    bookDemoFName:Locator;

    constructor(childPage: Page) {
        this.page = childPage;
        this.cntSales = this.page.locator(`//button[text()="Contact Sales"]`);
        this.FullName = this.page.locator('input#Form_getForm_FullName');
        this.Email = this.page.locator(`input#Form_getForm_Email`);
        this.PhoneNumber = this.page.locator(`input#Form_getForm_Contact`);
        this.country = this.page.locator(`select#Form_getForm_Country`);
        this.companyName = this.page.locator(`input#Form_getForm_CompanyName`);
        this.JobTitle = this.page.locator(`input#Form_getForm_JobTitle`);
        this.NumberOfEmp = this.page.locator(`select#Form_getForm_NoOfEmployees`);
        this.comment = this.page.locator(`textarea#Form_getForm_Comment`);
        this.check_Box = this.page.locator(`span#recaptcha-anchor`);
        //this.navLink = this.page.locator('ul.web-menu > li.nav-item:has(> a.nav-link)');
        this.navLink = this.page.locator('.nav-link');
        this.bookDemoFName=this.page.locator('//input[@name="FullName"]');
        this.aboutUs=this.page.locator(`//a[text()="About Us"]`);
        this.recruitment=this.page.locator(`//a[text()="Recruitment"]`);
    }

    async clickContactSales() {
        await this.cntSales.click();
        //await this.page.waitForTimeout(2000);
    }

    async getTitle() {
        console.log("Title of the child page is:" + await this.page.title());
    }

    async fillFormToTalkToExpert() {
        await this.FullName.fill("Harry");
        await this.Email.fill("xyz123@gmail.com");
        await this.PhoneNumber.fill(`input#Form_getForm_Contact`);
        await this.country.selectOption('India');
        await this.companyName.fill("XYZ");
        await this.JobTitle.fill("QA Engineer");
        await this.NumberOfEmp.selectOption("11 - 50");
        await this.comment.fill("I need support for the hrm");
        //await this.check_Box.click();

    }

    async selectNavigationLink(getMenuName: string) {

        const count = await this.navLink.count();
        console.log(count);//9

        for (let i = 0; i < count; i++) {
            const item: any = this.navLink.nth(i);
            //console.log(item);
            const menuName = (await item.textContent())?.trim();
            //const menuName:any=(await item.textContent())?.trim(); 
            console.log(menuName); //5 

            if (menuName === getMenuName) {
                //await item.hover();
                await item.click();
                break;

            }
        }

       /*  //await this.aboutUs.first().click();
       // await this.recruitment.first().click(); */
       await this.bookDemoFName.fill("allll");
       
    }

    async closePage() {
        await this.page.close();
    }


}

export default ContactSalesPage;