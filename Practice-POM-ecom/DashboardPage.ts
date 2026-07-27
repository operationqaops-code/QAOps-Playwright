import { Locator, Page, expect } from '@playwright/test';
export class DashboardPage {
    menuItems: Locator;
    iMac: Locator;
    page: Page;
    productPrice: Locator;
    Quantity: Locator;
    productBand: Locator;
    availableOptions: Locator;
    text: Locator;
    selectOption: Locator;
    addDescription: Locator;
    uploadFile: Locator;
    clickCalender: Locator;
    datePicker: Locator;
    monthPicker: Locator;
    year: Locator;
    yearPickerNext: Locator;
    actualYear: Locator;
    clickTime: Locator;
    hour:Locator;
    decrementHours: Locator;
    incrementHours: Locator;
    min:Locator;
    decrementMins: Locator;
    incrementMins: Locator;
    addToCartBtn:Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuItems = page.locator('.nav.navbar-nav > li');
        this.iMac = page.getByRole('img', { name: 'Apple Cinema 30"' });
        this.productPrice = page.getByRole('heading', { name: '$110.00' });
        this.Quantity = page.getByRole('textbox', { name: 'Qty' });
        this.productBand = page.getByText('Apple', { exact: true });
        this.availableOptions = page.getByRole('checkbox', { name: 'Checkbox 3 (+$36.00)' });
        this.text = page.getByPlaceholder('Text', { exact: true });
        this.selectOption = page.getByRole('combobox', { name: '* Select' });
        this.addDescription = page.getByRole('textbox', { name: '* Textarea' });
        this.uploadFile = page.getByRole('button', { name: 'Upload File' });
        this.clickCalender = page.locator(`//div[@class='input-group date']//i[@class='fa fa-calendar']`);
        this.datePicker = page.locator('.datepicker-days th.picker-switch');
        this.monthPicker = page.locator('.datepicker-months th.picker-switch');
        this.year = page.locator(`.datepicker-years td[colspan="7"] span.year`);
        this.yearPickerNext = page.locator('.datepicker-years th.next');
        this.actualYear = page.locator('.datepicker-years span.year');
        this.clickTime=page.locator(`//div[@class='input-group time']//i[@class='fa fa-calendar']`);
        this.hour = page.locator('.timepicker-hour');
        this.decrementHours=page.locator('//a[@data-action="decrementHours"]');
        this.incrementHours=page.locator('//a[@data-action="incrementHours"]');
        this.min = page.locator('.timepicker-minute');
        this.decrementMins=page.locator('//a[@data-action="decrementMinutes"]');
        this.incrementMins=page.locator('//a[@data-action="incrementMinutes"]');
        this.addToCartBtn=page.getByRole('button',{name:'Add to Cart'});
    }

    async navigateToProduct(getProduct: string, purchaseItem: string) {
        const count = await this.menuItems.count();
        for (let i = 0; i < count; i++) {
            const item: any = this.menuItems.nth(i);
            const menuName: any = (await this.menuItems.nth(i).locator('a').first().textContent())?.trim();
            if (menuName === getProduct) {
                await item.hover();
                await item.locator('.dropdown-menu').waitFor({ state: 'visible' });
                await item.getByRole('link', { name: purchaseItem }).click();
                break;
            }
        }
    }

    async addToCart() {
        await this.iMac.waitFor({ state: 'visible' });
        const iMacVisible = await this.iMac.isVisible();
        console.log(iMacVisible);
        await this.iMac.click();
        const price = await this.productPrice.textContent();
        console.log("Product Price is : " + price);
        const quantity = await this.Quantity.inputValue();
        console.log("Product Quantity is : " + quantity);
        expect(quantity).toBe("2");
        const productBrand = await this.productBand.isVisible();
        console.log("Product Brand is : " + productBrand);
        await this.availableOptions.check();
        await this.availableOptions.isChecked();
        await this.text.fill("This is a test message");
        await this.selectOption.selectOption("4");
        await this.addDescription.fill("This is a test description");

        /*    const fileChooserPromise = this.page.waitForEvent('filechooser');
           await this.uploadFile.click();
           const fileChooser = await fileChooserPromise;
           await fileChooser.setFiles('D:\PlayWrightAutomation\practice-ecom-testData\Resume.pdf'); */

    }

    async selectDate(expectedYear: string, expectedMonth: string, expectedDay: string) {

        await this.clickCalender.click();
        await this.datePicker.first().click();
        await this.monthPicker.first().click();

        while (!(await this.actualYear.getByText(expectedYear, { exact: true }).isVisible())) {
            await this.yearPickerNext.first().click();
        }

        await this.actualYear.getByText(expectedYear, { exact: true }).click();

        // Select Month
        await this.page.locator('.datepicker-months span.month', {
            hasText: expectedMonth
        }).first().click();

        // Select Day
        await this.page.locator('.datepicker-days td.day:not(.old):not(.new)', {
            hasText: expectedDay
        }).first().click();
    }

    async selectTime(hours:number,mins:number){

        await this.clickTime.click();
        const actualHour:number= Number((await this.hour.first().textContent())?.trim());
        console.log(actualHour);
        console.log(typeof(actualHour));
        console.log(typeof hours);
        console.log(hours);
        if(actualHour===hours){
            console.log("equal to expected hour");
        }else if(actualHour > hours){
            console.log("current hour is greater than expected hour");
            const diff = actualHour - hours;
            for(let i=0;i<diff;i++){
               await this.decrementHours.nth(1).click();
            }
            
        }else{
            console.log("current hour is less than expected hour");
            const lessDiff=hours - actualHour;
            for(let i=0;i<lessDiff;i++){
                await this.incrementHours.nth(1).click();
            }

        }

        const actualMin:number= Number((await this.min.first().textContent())?.trim());
        console.log(actualMin);

         if(actualMin===mins){
            console.log("equal to expected hour");
        }else if(actualMin > mins){
            console.log("current hour is greater than expected hour");
            const diff = actualMin - mins;
            for(let i=0;i<diff;i++){
               await this.decrementMins.nth(1).click();
            }
            
        }else{
            console.log("current hour is less than expected hour");
            const lessDiff=mins - actualMin;
            for(let i=0;i<lessDiff;i++){
                await this.incrementMins.nth(1).click();
            }

        }

       // await this.addToCartBtn.first().click();


    }



}

export default DashboardPage;