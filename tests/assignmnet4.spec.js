const{test,expect}=require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';
const timestamp = Date.now();

const yahooUser = {email: `test_user_${timestamp}@yahoo.com`,password: 'Secret@123'};

const gmailUser = {email: `test_user_${timestamp}@gmail.com`,password: 'Secret@123'};

async function loginAs(page, user) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder('you@email.com').fill(user.email);
  await page.getByLabel('Password').fill(user.password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}


test('Cross-User Booking Access Denied', async ({ page, request }) => {


   const yahooResponse = await request.post(
   `${API_URL}/auth/register`,
  {
    data: {email:yahooUser.email,password:yahooUser.password}
  }
);

expect(yahooResponse.status()).toBe(201);

    const gmailResponse = await request.post(
        `${API_URL}/auth/register`,
        {
            data: {email:gmailUser.email,password:gmailUser.password}
        }
    );

expect(yahooResponse.status()).toBe(201);

 // ── Step 1: Login as Yahoo user via API and get token ─────────────────────

    const loginResponse = await request.post(
        `${API_URL}/auth/login`,
        {
            data: {email:yahooUser.email,password:yahooUser.password}
        }
    );

    expect(loginResponse.ok()).toBeTruthy();
    const { token } = await loginResponse.json();

    // ── Step 2: Fetch events via API to get a valid event ID ──────────────────

    const eventResponse=await request.get(`${API_URL}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  expect(eventResponse.ok()).toBeTruthy();
  const eventsData = await eventResponse.json();
  const eventId = eventsData.data[0].id;
  console.log(eventId);

    // ── Step 3: Create a booking via API as Yahoo user ────────────────────────
    const bookingRes = await request.post(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      eventId,
      customerName:  'Yahoo User',
      customerEmail: yahooUser.email,
      customerPhone: '9999999999',
      quantity:      1,
    },
  });
  expect(bookingRes.ok()).toBeTruthy();
  const yahooBookingId = (await bookingRes.json()).data.id;

  console.log(`Yahoo booking created via API. ID: ${yahooBookingId}`);

      // ── Step 4: Login as Gmail user via browser UI ────────────────────────

     await loginAs(page,gmailUser);

      //Step 5 — Navigate to Yahoo's booking URL as Gmail user

      await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });


      // ── Step 6: Validate Access Denied ───────────────────────────────────────
  await expect(page.getByText('Access Denied')).toBeVisible();
  await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();

  await page.pause();


});