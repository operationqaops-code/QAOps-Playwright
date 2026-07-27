import { Page,Locator, expect } from "@playwright/test";

export class mouseAction{
page:Page
mouseHov:Locator;
dropDown:Locator;
dragItem:Locator;
dropItem:Locator;
firstName:Locator;
copyText:Locator;
searchText:Locator;
searchResult:Locator;
searchMore:Locator;

    constructor(page:Page){
        this.page=page;
        this.mouseHov=page.locator('//button[text()="Point Me"]');
        this.dropDown=page.locator('//div[@class="dropdown-content"]/a');
        this.dragItem=page.locator("#draggable");
        this.dropItem=page.locator("#droppable");
        this.firstName=page.locator("#name");
        this.copyText=page.getByRole('heading',{name:'Dynamic Button'});
        this.searchText=page.locator("#Wikipedia1_wikipedia-search-input");
        this.searchResult=page.locator(`//div[@id="wikipedia-search-result-link"]/a`);
        this.searchMore=page.locator(`//div[@id="Wikipedia1_wikipedia-search-more"]/a`);
    }

    async goto(){
        await this.page.goto("https://testautomationpractice.blogspot.com/");


    }

    async mouseHover(){
        const expectedItem = "Laptops";
        await this.mouseHov.hover();
        const count=await this.dropDown.count();
        //console.log(count);
        for(let i=0;i<count;i++){
            const item: any = this.dropDown.nth(i);
            const text = await item.textContent();
            console.log(text);
            if(text=== expectedItem){
                await item.click();
                
                break;

            }
     
       }
}

    async dragnDrop(){

        const source=this.dragItem;
        const target=this.dropItem;
        await source.dragTo(target);
        await this.page.waitForTimeout(4000);
        const dropped:boolean=await this.page.getByText("Dropped!").isVisible();
        console.log(dropped);
    }

    async rightClick(){
        await this.copyText.click();
        await this.copyText.selectText();
        await this.copyText.press('Control+C');
        await this.firstName.click();
        await this.firstName.press('Control+V');
        await this.page.waitForTimeout(2000);
    }

    async searchBox(expectedText:string){
        await this.searchText.type("Ind");
        this.searchText.press("Enter");
        await this.page.waitForTimeout(2000);
        const count=await this.searchResult.count();
        for(let i=0;i<count;i++){
            const item:any=this.searchResult.nth(i);
            const text = await item.textContent();
            if(text===expectedText){
                await item.isVisible();
                await item.click();
                await this.page.waitForTimeout(2000);
                break;

            }

        }
        await this.page.waitForTimeout(2000);
        await this.searchMore.click();

    }
}

export default mouseAction;