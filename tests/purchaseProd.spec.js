//create a test case to sign in the the online shopping site and add a product to cart and verify that the correct product added in the cart then place order and verify order placed successfully.

const {test,expect,request}= require('@playwright/test');
test("purchase product",async({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const userName ="awalom.official@gmail.com";
    const userPassword= page.locator('#userPassword');
    const signIn = page.locator('input#login');
    const allProduct=page.locator('.card-body');
    const cardDetails=page.locator('.card-body b');
    const productName='ZARA COAT 3';
    
    await page.locator('#userEmail').fill(userName);
    await userPassword.fill("Abdul@786");
    await signIn.click();
    //await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    const allTitles=await cardDetails.allTextContents();
    console.log(allTitles);
   
    //const allTitles=await cardDetails.allTextContents();
    //console.log(allTitles);

    const count=await allProduct.count();
    for(let i=0;i<count;i++){

        if(await allProduct.nth(i).locator("b").textContent()===productName){
            //add product to card
            await allProduct.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }

    //await page.pause();

    await page.locator("[routerlink *='cart']").click();
    await page.locator("div li").first().waitFor();
    const isPresent=page.locator("h3:has-text('productName')").isVisible();
    expect(isPresent).toBeTruthy();

    await page.locator("text=Checkout").click();

   /* const input = page.locator('input.input.txt.text-validated');
   await input.clear();   // clears existing value
   await input.fill('1234 5678 9012 3457'); */
   await page.locator("[placeholder='Select Country']").type("A",{delay:100});

   const dropDown=await page.locator(".ta-results");
   await dropDown.waitFor();
   const optionsCount=await dropDown.locator("button").count();

   for(let i=0;i<optionsCount;i++){
    const text=await dropDown.locator("button").nth(i).textContent();
    if(text===" Argentina"){
            dropDown.locator("button").nth(i).click();
            break;
        }
    }
    const getUserEmail= await page.locator('.user__name.mt-5 input').first();

    expect(getUserEmail).toHaveValue(userName);

    const dropdowns= await page.locator("select.input.ddl");
    await dropdowns.nth(0).selectOption('05');
    await dropdowns.nth(1).selectOption('20')
    await page.locator("div.field.small input.input.txt").nth(0).fill("366");
    await page.locator("div.field.small input.input.txt").nth(1).fill("Rahul");
    await page.locator(".action__submit").click();    
    await  expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");

    const orderId=await page.locator("label[class='ng-star-inserted']").textContent();
    //const newOrderId=orderId.replace(/\|/g, '').trim();
    console.log(orderId);

    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();
   // Search Order from order Table and click on View Button and put a assertion on the header.

   const rows=await page.locator("tbody tr");
   for(let i=0;i< await rows.count();i++){

    const roworderId= await rows.nth(i).locator("th").textContent();
    if(orderId.includes(roworderId)){

        await rows.nth(i).locator("button").first().click();
        break;

    }
   }

    
    const orderIdDetails= await page.locator(".col-text.-main").textContent();
    expect (orderId.includes(orderIdDetails)).toBeTruthy();

    

    //await page.pause();

                                     
});