import { Page, Locator, expect } from "@playwright/test";

export class subMenu {
    page: Page
    category: Locator;
    /* beverage: Locator;
    Tea: Locator;
    GreenTea: Locator; */
    mainCategories: Locator;
    subCategories: Locator;
    teaCategories: Locator;

    constructor(page: Page) {
        this.page = page;
        this.category = page.getByRole("button", { name: "Shop by Category" });
        /* this.beverage = page.locator("//a[contains(@href,'/cl/beverages/')]").filter({ visible: true });
        this.Tea = this.beverage.locator("xpath=following::a[@href='/pc/beverages/tea/?nc=nb'][1]");
        this.GreenTea = page.locator("//a[contains(@href,'green-tea')]"); */
        //this.mainCategories = page.locator("//div[@role='menu']//ul[1]/li");
        this.mainCategories = this.page.locator("//div[@role='menu']//ul[1]//a").filter({ visible: true });
        this.subCategories=this.mainCategories.locator("xpath=following::a[starts-with(@href,'/pc/beverages/')]").filter({ visible: true });
        //this.subCategories = page.locator("//div[@role='menu']//ul[2]//a").filter({ visible: true });
        this.teaCategories = page.locator("//div[@role='menu']//ul[3]/li");


    }

    async goto() {
        await this.page.goto("https://www.bigbasket.com/");
        await this.category.nth(1).click();
        const count = await this.mainCategories.count();
        console.log(count);
        const MainMenu: string = "Beverages";
        for (let i = 0; i < count; i++) {

            const item = this.mainCategories.nth(i);
            const text = (await item.innerText()).trim();
            //console.log(text);
            if (text.includes(MainMenu)) {
                await item.hover();
                break;
            }

        }
    }
    async getsubCategories() {
            const count = await this.subCategories.count();
            console.log(count);
            /* const SubMenu: string = "Tea";
            for (let i = 0; i < count; i++) {

                const item = this.subCategories.nth(i);
                const text = (await item.innerText()).trim();
                console.log(text);
                if (text.includes(SubMenu)) {
                    await item.hover();
                    break;
                }

            } */


        }


}

export default subMenu;