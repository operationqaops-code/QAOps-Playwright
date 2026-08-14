import { test, expect, Locator, request } from '@playwright/test';
import { customTest } from '../../utils/customFixture';


/* const loginPayload = { email: "awalom.official4@gmail.com", password: "Abdul@7866" };
let token: any;
 */

/* test.beforeAll(async () => {

    let apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
        {
            data: loginPayload
        })
    console.log(loginResponse.status());
    //console.log(await loginResponse.text());
    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJSON: any = await loginResponse.json();
    console.log(loginResponseJSON);
    token = loginResponseJSON.token;
    console.log(token);


}); */

customTest('Booking an event', async ({ page,token }) => {

   await page.addInitScript(value => {
        window.localStorage.setItem('eventhub_token', value);
    }, token);

    const baseURL: string = "https://eventhub.rahulshettyacademy.com"
    await page.goto(baseURL);
    /*

    //step-1
    await page.getByPlaceholder('you@email.com').fill(userEmail);
    await page.getByLabel('password').fill(userPass);
    await page.locator('#login-btn').click(); */
    await expect(page.locator('h1').first()).toHaveText('Discover & BookAmazing Events');

      const userEmail: string = "awalom.official4@gmail.com";
    //const userPass: string = "Abdul@7866";

    //Step-2
    await page.getByRole('button', { name: 'Admin' }).click();
    await page.getByRole('link', { name: 'Manage Events' }).first().click();

    //create event
    const eventTitle = "Playwright Automation QA Summit";
    await page.getByPlaceholder('Event title').fill(eventTitle);
    await page.locator('#admin-event-form textarea').fill("Live Telecast on Playwright Automation Framework building");
    const selectCategory: Locator = page.getByRole('combobox', { name: 'Category' });
    await selectCategory.click();
    await selectCategory.selectOption("Conference");
    await page.getByRole('textbox', { name: 'City' }).type("Kolkata");
    await page.getByRole('textbox', { name: 'Venue' }).fill("Netaji Subhas Memorial Hall");
    await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');

    await page.getByLabel('Price ($)').fill('300');
    await page.locator('#total-seats').fill('200');
    await page.getByLabel('Image URL (optional)').fill('https://images.unsplash.com/photo-1552664730-d307ca884978');
    await page.getByRole('button', { name: '+ Add Event' }).click();

    await expect(page.getByText('Event created!')).toBeVisible();

    //Step 3 — Find the event card and capture seats
    await page.getByRole('link', { name: 'Events' }).first().click();

    const eventCard: Locator = page.locator('#event-card');
    await page.waitForLoadState();
    await expect(eventCard.first()).toBeVisible();
    const expectedCard = eventCard.filter({ hasText: eventTitle }).first();
    await expect(expectedCard).toBeVisible({ timeout: 5000 });
    const seatText: string | null = await expectedCard.locator('text=/seats/i').textContent();

    console.log(seatText);
    const seatsBeforeBooking = parseInt(seatText!.match(/\d+/)![0], 10);
    console.log(seatsBeforeBooking);

    //Step 4 — Start booking
    await expectedCard.getByTestId('book-now-btn').click();

    //Step 5- Fill booking form
    await expect(page.locator('#ticket-count')).toHaveText('1');

    let TotalTicketLoc: Locator = page.locator('#ticket-count + button');
    let expectedTicket: number = 3;
    let pricePerTicketLoc: Locator = page.locator('//p[text()="$300"]');
    let pricePerTicket = await pricePerTicketLoc.textContent();

    for (let i = 1; i <= expectedTicket - 1; i++) {
        await TotalTicketLoc.click();

    }

    let price = parseInt(pricePerTicket?.match(/\d+/)?.[0] ?? "0", 10);
    let ticketFare = expectedTicket * price;

    await page.locator('#customerName').fill("Abdul");
    await page.getByPlaceholder('you@email.com').fill(userEmail);
    await page.locator('#phone').type("8973562721")
    await page.locator('#confirm-booking').click();

    await expect(page.getByText('Booking Confirmed! 🎉')).toBeVisible();


    //Step-6 :

    const bookingRefLocator: Locator = page.locator('.booking-ref');
    await expect(bookingRefLocator).toBeVisible();
    let bookingRefId = await bookingRefLocator.textContent();
    console.log(bookingRefId);

    //Step-7

    await page.getByRole('button', { name: 'View My Bookings' }).click();

    await expect(page).toHaveURL(`${baseURL}/bookings`);
    const bookingCard: Locator = page.getByTestId('booking-card');
    await expect(bookingCard.first()).toBeVisible();
    const matchedCard = bookingCard.filter({
        has: page.locator('.booking-ref', { hasText: bookingRefId ?? "" })
    }).first();
    await expect(matchedCard).toBeVisible();
    await expect(matchedCard).toContainText(eventTitle);

    //Step 8 — Verify seat reduction
    await page.locator('#nav-events').click();
    await page.waitForLoadState();
    await expect(eventCard.first()).toBeVisible();
    const visibleCard = eventCard.filter({ hasText: eventTitle }).first();
    await expect(visibleCard).toBeVisible({ timeout: 5000 });
    await page.waitForLoadState();
    const remainingSeats: string | null = await visibleCard.locator('text=/seats/i').textContent();

    console.log(remainingSeats);
    const seatsAfterBooking = parseInt(seatText!.match(/\d+/)![0], 10);
    console.log(seatsAfterBooking);

    await expect(seatsAfterBooking).toBe(seatsBeforeBooking - 3);

    await page.pause();


});