import fetch from 'node-fetch';

const BASE = 'http://localhost:5000/api';

async function run() {
  try {
    console.log('Logging in test user...');
    const loginRes = await fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'qa_test_user@example.com', password: 'Password123!' })
    });

    const loginJson = await loginRes.json();
    if (!loginRes.ok) {
      console.error('Login failed:', loginJson);
      return;
    }

    const token = loginJson.token;
    console.log('Got token, attempting booking...');

    const bookingRes = await fetch(`${BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ showtimeId: '68f75b8852f3465b23fb326b', seats: ['A1','A2'] })
    });

    const bookingJson = await bookingRes.json();
    console.log('Booking response status:', bookingRes.status);
    console.log('Booking response body:', bookingJson);
  } catch (err) {
    console.error('Test booking failed:', err);
  }
}

void run();
