const {test,expect} = require('@playwright/test');
test('Book Slot',async({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
    const BASE_URL="https://eventhub.rahulshettyacademy.com";
    await page.goto(BASE_URL);
    const userEmail= "awalom.official@gmail.com";
    const userPass ="Abdul@786";
    const cards = page.getByTestId('event-card');
    const events=page.locator("#nav-events");

    /* await page.locator('a[href="/register"]').click();
    await page.locator("#register-email").fill(userEmail);
    await page.locator("#register-password").fill(userPass);
    await page.locator("//input[@placeholder='Repeat your password']").fill(userPass);
    await page.getByRole("button",{name:"Create Account"}).click(); */

    //await page.locator('a[href="/login"]').click();
    await page.locator("#email").fill(userEmail);
    await page.locator("#password").fill(userPass);
    await page.locator("#login-btn").click();
    //await page.getByText("Discover & Book Amazing Events").isVisible();
    await expect(page.locator('h1')).toHaveText('Discover & BookAmazing Events');
    await page.getByRole('button', { name: 'Admin' }).click();
    await page.getByRole('link', { name: 'Manage Events' }).first().click();

    //Generate a unique event title using Test Event ${Date.now()} — store this in a variable, you will need it throughout the test
    const eventTitle = `Tech Event ${Date.now()}`;
    //console.log(eventTitle);
    await page.getByPlaceholder("Event title").fill(eventTitle);
    await page.locator('#admin-event-form textarea').fill("Live Telecast on CI/CD build");
    await page.getByPlaceholder("e.g. Bangalore").fill("Kolkata");
    await page.locator('#category').selectOption('Workshop');
    await page.getByPlaceholder("Venue name & address").fill("Jadavpur University");

    //future date
    function futureDateValue() {

       const date=new Date();
       date.setDate(date.getDate() + 1);
       const yyyy=date.getFullYear();
       const mm=String (date.getMonth() + 1).padStart(2,'0');
       const dd = String(date.getDate()).padStart(2, '0');
       const hh = String(date.getHours()).padStart(2, '0');
       const min = String(date.getMinutes()).padStart(2, '0');
       
       return `${yyyy}-${mm}-${dd}T${hh}:${min}`;

    }

    await page.getByLabel('Event Date & Time').fill(futureDateValue());
    await page.locator('input[type="number"]').nth(0).fill("100");
    await page.locator('input[type="number"]').nth(1).fill("50");
    await page.locator('input[type="url"]').fill("https://images.unsplash.com/photo-1552664730-d307ca884978");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText('Event created!')).toBeVisible();
    
    //click on events and search the created event from the event list and fetch the seats available

    await events.click();
    await expect(page.getByText('Upcoming Events')).toBeVisible();

    const eventsCard= await cards.filter({ hasText: eventTitle }).first();
    await expect(eventsCard).toBeVisible({ timeout: 10000 });
    // locate element that contains "seat"
  
    const seatText = await eventsCard.locator('text=/seat/i').textContent();

// extract number
    const seatsBeforeBooking = parseInt(seatText.match(/\d+/)[0], 10);
    //console.log('Seats before booking:', seatsBeforeBooking);
    await eventsCard.getByTestId('book-now-btn').click();

    await expect(page.locator("#ticket-count")).toHaveText('1');

    await page.locator("#customerName").fill("Abira");
    await page.locator("#customer-email").fill(userEmail);
    await page.getByPlaceholder("+91 98765 43210").fill("+91 89744 3333");
    await page.getByRole("button",{name:"Confirm Booking"}).click();

    await expect(page.getByText('Booking Confirmed!')).toBeVisible();
    const bookingRef= await page.locator(".booking-ref, take").textContent();
    //console.log(bookingRef);
    await expect (page.locator(".booking-ref, take")).toHaveText(bookingRef);

    const bookingRefId = bookingRef.match(/[A-Z0-9]+$/)[0];
    //console.log(bookingRefId);

    await page.getByRole("button",{name:"View My Bookings"}).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

    const bookingCards = page.getByTestId('booking-card');

    await expect(bookingCards.first()).toBeVisible();

    const matchedCard = bookingCards.filter({has: page.locator('.booking-ref', { hasText: bookingRefId })
}).first();

await expect(matchedCard).toBeVisible();
await expect(matchedCard).toContainText(eventTitle);

//Step-8 verify seat reduction

await page.reload();
await events.click();
const eventsCardAfter= await cards.filter({ hasText: eventTitle }).first();
await expect(eventsCardAfter).toBeVisible({ timeout: 10000 });
    // locate element that contains "seat"
const seatTextAfter = await eventsCardAfter.locator('text=/seat/i').textContent();
await expect(eventsCardAfter).toBeVisible({ timeout: 10000 });
const seatAfterBooking = await parseInt(seatTextAfter.match(/\d+/)[0], 10);

await expect(seatAfterBooking).toBe(seatsBeforeBooking - 1);


});
