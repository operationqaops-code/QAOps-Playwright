# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: assignment2.spec.js >>  @Web Book Slot
- Location: tests\assignment2.spec.js:3:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#refund-result')
Expected substring: "Eligible for refund"
Received string:    "Not eligible for refund. Group bookings (3 tickets) are non-refundable."
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('#refund-result')
    14 × locator resolved to <div id="refund-result" data-testid="refund-result" class="flex items-start gap-2.5 text-sm text-red-800 bg-red-50 border border-red-200 rounded-xl px-4 py-3">…</div>
       - unexpected value "Not eligible for refund. Group bookings (3 tickets) are non-refundable."

```

```yaml
- img
- strong: Not eligible for refund.
- text: Group bookings (3 tickets) are non-refundable.
```

# Test source

```ts
  1  | const {test,expect} = require('@playwright/test');
  2  | const { loginAndGoToBooking } = require('../utils/loginHelper');
  3  | test(' @Web Book Slot',async({browser})=>{
  4  | 
  5  |     const context=await browser.newContext();
  6  |     const page=await context.newPage();
  7  | 
  8  |     const email = 'awalom.official4@gmail.com';
  9  |     const password = 'Abdul@7866';
  10 |     
  11 |     await loginAndGoToBooking(page, email, password);
  12 | 
  13 |     // Book event with 1 ticket via UI
  14 |     const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
  15 |     await page.goto(`${BASE_URL}/events`);
  16 |     await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
  17 |     await page.getByLabel('Full Name').fill('Test User');
  18 |     await page.locator('#customer-email').fill(email);
  19 |     await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
  20 |     await page.locator('.confirm-booking-btn').click();
  21 | 
  22 |     //Navigate to Booking
  23 | 
  24 |     await page.locator("#nav-bookings").click();
  25 |     await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  26 |     await page.getByRole('link',{name:'View Details'}).first().click();
  27 |     await expect(page.getByText('Booking Information')).toBeVisible();
  28 |     const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  29 |     console.log(bookingRef);
  30 |     const eventTitle = await page.locator('h1').innerText();
  31 |     console.log(eventTitle);
  32 |     await expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));
  33 |     await page.locator('#check-refund-btn').click();
  34 |     //Step 5 — Check refund eligibility
  35 |    
  36 |     await expect(page.locator("#refund-spinner")).toBeVisible();
  37 |     await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });
  38 | 
  39 |     //Step 6
  40 | 
  41 |     const RefundResult=await page.locator("#refund-result");
  42 |     await expect(RefundResult).toBeVisible();
> 43 |     await expect(RefundResult).toContainText('Eligible for refund');
     |                                ^ Error: expect(locator).toContainText(expected) failed
  44 |     await expect(RefundResult).toContainText('Single-ticket bookings qualify for a full refund');
  45 | 
  46 | 
  47 |   
  48 | 
  49 | });
  50 | 
  51 | 
  52 | test('Refunds are not eligible for group ticket booking', async ({ page }) => {
  53 | 
  54 |     const email = 'awalom.official4@gmail.com';
  55 |     const password = 'Abdul@7866';
  56 |     
  57 |   await loginAndGoToBooking(page, email, password);
  58 | 
  59 |    const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
  60 |    await page.goto(`${BASE_URL}/events`);
  61 |    await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
  62 |      //Book event with 3 tickets via UI
  63 |    await page.locator('button:has-text("+")').click();
  64 |    await page.locator('button:has-text("+")').click();
  65 |    await page.getByLabel('Full Name').fill('Test User');
  66 |    await page.locator('#customer-email').fill(email);
  67 |    await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
  68 |    await page.locator('.confirm-booking-btn').click();
  69 | 
  70 |     await page.locator("#nav-bookings").click();
  71 |     await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  72 |     await page.getByRole('link',{name:'View Details'}).first().click();
  73 |     await expect(page.getByText('Booking Information')).toBeVisible();
  74 |     const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  75 |     console.log(bookingRef);
  76 |     const eventTitle = await page.locator('h1').innerText();
  77 |     console.log(eventTitle);
  78 |     await expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));
  79 |     await page.locator('#check-refund-btn').click();
  80 |     //Step 5 — Check refund eligibility
  81 |    
  82 |     await expect(page.locator("#refund-spinner")).toBeVisible();
  83 |     await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });
  84 | 
  85 |     //Step 6
  86 | 
  87 |     const RefundResult=await page.locator("#refund-result");
  88 |     await expect(RefundResult).toBeVisible();
  89 |     await expect(RefundResult).toContainText('Not eligible for refund');
  90 |     await expect(RefundResult).toContainText('Group bookings (3 tickets) are non-refundable');
  91 | 
  92 | });
```