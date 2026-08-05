import{Page, test} from '@playwright/test';

test('Handle Switching Window',async({page})=>{

await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  
  let ParentPage:Page=page;
  let [childPage]=await Promise.all([
    page.context().waitForEvent('page'),
    page.locator('//a[text()="OrangeHRM, Inc"]').click()

  ])

  await childPage.waitForLoadState();
  await childPage.locator('//button[text()="Contact Sales"]').click();
  console.log("Title of the child page:"+ await childPage.title());
  await childPage.close();


  await ParentPage.bringToFront();
  await ParentPage.waitForLoadState();
  console.log("Title of ParentPage is:"+ await ParentPage.title());
  await ParentPage.locator('input[name="username"]').fill('Admin');

  await ParentPage.close();

});