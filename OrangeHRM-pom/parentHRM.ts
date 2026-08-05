import { Locator, Page } from '@playwright/test';
//import{ContactSalesPage} from '../OrangeHRM-pom/ContactSalesPage';
export class parentHRM {

    page: Page;
    orangeHRMLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orangeHRMLink = page.locator('//a[text()="OrangeHRM, Inc"]');

    }

    async goto() {
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    }

    async openChildPage(): Promise<Page> {

        const [childPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.orangeHRMLink.click()
        ]);

        await childPage.waitForLoadState();

        return childPage;
    }

}

export default parentHRM;