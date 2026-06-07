const {test,expect} = require('@playwright/test');
const { loginAndGoToBooking } = require('../utils/loginHelper');
test(' @Web Book Slot',async({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();

    const email = 'awalom.official4@gmail.com';
    const password = 'Abdul@7866';
    
    await loginAndGoToBooking(page, email, password);

    // Book event with 1 ticket via UI
    const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
    await page.goto(`${BASE_URL}/events`);
    await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
    await page.getByLabel('Full Name').fill('Test User');
    await page.locator('#customer-email').fill(email);
    await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
    await page.locator('.confirm-booking-btn').click();

    //Navigate to Booking

    await page.locator("#nav-bookings").click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.getByRole('link',{name:'View Details'}).first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();
    const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
    console.log(bookingRef);
    const eventTitle = await page.locator('h1').innerText();
    console.log(eventTitle);
    await expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));
    await page.locator('#check-refund-btn').click();
    //Step 5 — Check refund eligibility
   
    await expect(page.locator("#refund-spinner")).toBeVisible();
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

    //Step 6

    const RefundResult=await page.locator("#refund-result");
    await expect(RefundResult).toBeVisible();
    await expect(RefundResult).toContainText('Eligible for refund');
    await expect(RefundResult).toContainText('Single-ticket bookings qualify for a full refund');


  

});


test('Refunds are not eligible for group ticket booking', async ({ page }) => {

    const email = 'awalom.official4@gmail.com';
    const password = 'Abdul@7866';
    
  await loginAndGoToBooking(page, email, password);

   const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
   await page.goto(`${BASE_URL}/events`);
   await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
     //Book event with 3 tickets via UI
   await page.locator('button:has-text("+")').click();
   await page.locator('button:has-text("+")').click();
   await page.getByLabel('Full Name').fill('Test User');
   await page.locator('#customer-email').fill(email);
   await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
   await page.locator('.confirm-booking-btn').click();

    await page.locator("#nav-bookings").click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.getByRole('link',{name:'View Details'}).first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();
    const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
    console.log(bookingRef);
    const eventTitle = await page.locator('h1').innerText();
    console.log(eventTitle);
    await expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));
    await page.locator('#check-refund-btn').click();
    //Step 5 — Check refund eligibility
   
    await expect(page.locator("#refund-spinner")).toBeVisible();
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

    //Step 6

    const RefundResult=await page.locator("#refund-result");
    await expect(RefundResult).toBeVisible();
    await expect(RefundResult).toContainText('Not eligible for refund');
    await expect(RefundResult).toContainText('Group bookings (3 tickets) are non-refundable');

});