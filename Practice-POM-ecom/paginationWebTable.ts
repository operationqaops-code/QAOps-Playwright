import { Page, Expect, Locator } from "@playwright/test";

export class paginationWebTable {
    page: Page;
    tableLoc: Locator;
    column: Locator;
    rows: Locator;
    Pages: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tableLoc = page.locator("#productTable");
        this.column = this.tableLoc.locator('thead tr th');
        this.rows = this.tableLoc.locator('tbody tr');
        this.Pages = page.locator('#pagination a');


    }

    async goto() {
        await this.page.goto("https://testautomationpractice.blogspot.com/");
    }

    async getTableRowClmn(selectItem: string) {
        const countClmn = await this.column.count();
        //console.log(countClmn);

        const countRow = await this.rows.count();
        //console.log(countRow);
         const matchedRows = this.rows.filter({
            has: this.page.locator('td'),
            hasText: selectItem
        })
        matchedRows.locator('input').check();
        await this.page.waitForTimeout(4000);

        //print all product details from pages

        for (let p = 0; p < await this.Pages.count(); p++) {
            if (p > 0) {
                await this.Pages.nth(p).click();
            }
            for (let i = 0; i < countRow; i++) {
                const row = await this.rows.nth(i);
                const tds = row.locator('td');

                for (let j = 0; j < await tds.count() - 1; j++) {
                    const tdata = await tds.nth(j).textContent();
                    //console.log(tdata);
                }

            }
        }

    }
}

export default paginationWebTable;