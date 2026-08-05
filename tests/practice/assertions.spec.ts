import { test, expect } from '@playwright/test';

test('data validation using Hard assertion', async ({ page }) => {

    await page.goto("https://tutorialsninja.com/demo/index.php?route=account/register");

    //Basis on test behaviour assertion can be of two types-Hard Assertion,soft Assertion
    //Hard Assertion-test gets failed immediately if an assertion  gets failed,it will restrict to execute the further code.
    //Hard assertion auto retried, default time for it is 5 sec.

    await expect(page,'should be logged in').toHaveTitle('Register'); //assertion applied on a page.
    //here line 11, testt gets failed, then playwright will keep on retrying for 5 seconds, if within 5 seconds, the title gets changed to 'Login', then test will pass, otherwise it will fail

    /*  Error: expect(page).toHaveTitle(expected) failed
        Expected: "Register"
        Received: "Register Account"
        Timeout:  5000ms
 
        Call log:
        - Expect "toHaveTitle" with timeout 5000ms
        14 × unexpected value "Register Account" */

    let logo = page.locator('//a[text()="Qafox.com"]');
    await expect(logo,'should be logged in').toBeVisible();//assertion applied on a element/locator



});

test.skip('data validation using soft assertion', async ({ page }) => {

    await page.goto("https://tutorialsninja.com/demo/index.php?route=account/register");

    //Basis on test behaviour assertion can be of two types-Hard Assertion,soft Assertion
    //Soft Assertion-test execute even if the assertion failed, next code will execute
    //Soft assertion auto retried, default time for it is 5 sec.

    await expect.soft(page).toHaveTitle('Register'); //assertion applied on a page.
    //line no 38 gets failed, then following lines will be executed, this is called soft assertion
    let logo = page.locator('//a[text()="Qafox.com"]');
    await expect(logo).toBeVisible();//assertion applied on a element/locator

});

test.skip('data validation using non retry assertion', async ({ page }) => {

    await page.goto("https://tutorialsninja.com/demo/index.php?route=account/register");
    //In non retry we apply assertion on values, here default time is not applicable
    // non retry assertion performed on static element where as auto retry/hard assertion performed on dynamic element.
    await expect.soft(page).toHaveTitle('Register'); //assertion applied on a page.
    
    let pageTitle:string=await page.title();
    expect(pageTitle).toBe('Login');


});



