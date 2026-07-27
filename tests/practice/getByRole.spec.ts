import { test, expect, Locator } from '@playwright/test'

test('Registering user', async ({ page }) => {

    await page.goto("https://tutorialsninja.com/demo/index.php?route=account/register");
    await page.getByRole('textbox', { name: 'First Name' }).fill("Abdul");
    await page.getByRole('textbox', { name: 'Last Name' }).fill("Alom");
    await page.getByRole('textbox', { name: 'E-Mail' }).fill("abdul.walom-1@gmail.com");
    await page.getByRole('textbox', { name: 'Telephone' }).fill("987653421");
    await page.locator('#input-password').fill('Ab@123');
    await page.locator('#input-confirm').fill('Ab@123');
    await page.getByRole('radio', { name: 'No' }).check();
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Your Account Has Been Created!')).toBeVisible();
    await page.waitForTimeout(2000);

    await page.getByRole('link', { name: 'Continue' }).click();
    //DashBoard-Page -locate the product navigation bar

    const menuItems: Locator = await page.locator('.nav.navbar-nav > li');
    const getProduct: string = 'Desktops';
    const purchaseItem: string = 'Mac (1)';
    const count = await menuItems.count();
    for (let i = 0; i < count; i++) {
        const item: any = menuItems.nth(i);
        const menuName: any = (await menuItems.nth(i).locator('a').first().textContent())?.trim();
        if (menuName === getProduct) {
            await item.hover();
            await item.locator('.dropdown-menu').waitFor({ state: 'visible' });
            await item.getByRole('link', { name: purchaseItem }).click();
            break;
        }
    }

});