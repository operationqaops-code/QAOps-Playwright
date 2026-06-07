const {test,expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('First Playwright Test',async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const userName = page.locator('#userEmail');
    const userPassword= page.locator('#userPassword');
    const signIn = page.locator('input#login');
    const cardDetails=page.locator('.card-body b');
    //const docLink=page.locator([href='https://techsmarthire.com/']);
    const docLink = page.locator("a.blinkingText[href='https://techsmarthire.com/']");
    await userName.fill("awalom.official@gmail.com");
    await userPassword.fill("Abdul@786");
    await signIn.click();

    // 4. Validate error message (toast)
    /*
    await expect(page.locator('[role="alert"]'))
  .toContainText('Incorrect email or password.');

    await page.locator('#userPassword').fill("");
    await page.locator('#userPassword').fill("Abdul@786");
    await page.locator('input#login').click(); 
    const text = await page.locator('.card-body b:has-text("ADIDAS ORIGINAL")').textContent();
    console.log(text); */

    //await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    const allTitles=await cardDetails.allTextContents();
    console.log(allTitles);
    
    //Assertion on blinking text

    await expect(docLink).toHaveAttribute("class","blinkingText");
    
    const [newPage]= await Promise.all(
    [context.waitForEvent('page'),
        docLink.click()]
    );
     
    //await newPage.pause();
   await newPage.waitForLoadState();
   const text= newPage.locator('h1:has-text("Hire by Real Skills")');
   await expect(text).toBeVisible();
   const finalText = await text.textContent();
   console.log(finalText);
});

test('Register in ecommerce website',async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/register");
    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const userEmail = page.locator('#userEmail');
    const userPhone = page.locator('#userMobile');
    const createPass = page.locator('#userPassword');
    const confirmPass = page.locator('#confirmPassword');
    const selOccupation = page.locator('[formcontrolname="occupation"]');
    const userGen = page.locator('input[value="Male"]');
    const signIn = page.locator('#login');

    await firstName.fill("Abira");
    await lastName.fill("Alom");
    await userEmail.fill("abdul.walom@gmail.com");
    await userPhone.fill("8972466743abc")
    await createPass.fill("Abdul@786");
    await confirmPass.fill("Abdul@786");
    await selOccupation.selectOption({label: 'Engineer'});
    //await page.pause();
    await userGen.check();
    //await page.pause();
    await page.locator("input[type='checkbox']").check();
    await expect(page.locator("input[type='checkbox']")).toBeChecked();
    await signIn.click();

});

test('Second Test Case',async({page})=>{
    await page.goto("https://www.google.com/");
    await page.title();
    await expect(page).toHaveTitle("Google");
})