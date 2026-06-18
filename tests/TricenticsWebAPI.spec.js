const { expect, test, request } = require('@playwright/test');
const loginPayLoad = { userEmail: "awalom.official@gmail.com", userPassword: "Abdul@786" };
const createOrderPayLoad = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let token;
let orderId;

test.beforeAll(async () => {

    //Login API
    const APIContext = await request.newContext();
    const loginResponse = await APIContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayLoad
        }
    );

    expect((await loginResponse).ok).toBeTruthy();
    const loginResponseJSON = await loginResponse.json()
    token = loginResponseJSON.token;
    console.log(token);

    //Order API
    const orderResponse = await APIContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",

        {
            data: createOrderPayLoad,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },

        })

    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = await orderResponseJson.orders[0];

});

test.beforeEach(() => {

});

test("API Testting", async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i =0; i<await rows.count(); ++i)
    {
       const rowOrderId =await rows.nth(i).locator("th").textContent();
       if (orderId.includes(rowOrderId))
       {
           await rows.nth(i).locator("button").first().click();
           break;
       }
    }
    const orderIdDetails =await page.locator(".col-text").textContent();
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();



});