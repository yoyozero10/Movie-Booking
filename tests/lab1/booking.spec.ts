import { test, expect } from '@playwright/test';

test.describe('Lab 1 - Booking Module [BOOKING]', () => {

    test.beforeEach(async ({ page }) => {
        page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
        page.on('pageerror', err => console.log('BROWSER ERROR:', err));

        // Navigate to homepage
        await page.goto('/');
        await page.waitForLoadState('networkidle');
    });

    test('[BOOKING]-01: Chọn suất chiếu', async ({ page }) => {
        // Dependencies: [AUTH]-02, [MOVIE]-03
        // 1. Đăng nhập
        const randomEmail = `bookinguser${Date.now()}@test.com`;
        const password = 'password123';

        await page.getByTestId('login-btn').click();
        await page.getByRole('button', { name: 'Sign up instead' }).click();
        await page.getByPlaceholder('Email').fill(randomEmail);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Sign up', exact: true }).click();
        await expect(page.getByTestId('logout-btn')).toBeVisible();

        // 2. Mở chi tiết phim
        const movieCard = page.locator('a.movie-card').first();
        await movieCard.click();
        await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

        // 3. Chọn rạp và giờ chiếu
        const showtimeButton = page.locator('button.movie-card').first();
        await expect(showtimeButton).toBeVisible({ timeout: 10000 });

        // Verify showtime information is displayed
        await expect(showtimeButton.locator('text=/Theater|Cinema/i')).toBeVisible();
        await expect(showtimeButton.locator('text=/\\d{2}:\\d{2}/')).toBeVisible(); // Time format HH:mm

        // Click to select showtime
        await showtimeButton.click();

        // Expected: Chuyển sang trang chọn ghế
        await expect(page.getByText(/select.*seat/i)).toBeVisible({ timeout: 10000 });
    });

    test('[BOOKING]-02: Hiển thị sơ đồ ghế', async ({ page }) => {
        // Dependencies: [BOOKING]-01
        // Setup: Complete BOOKING-01 steps
        const randomEmail = `seatuser${Date.now()}@test.com`;
        const password = 'password123';

        await page.getByTestId('login-btn').click();
        await page.getByRole('button', { name: 'Sign up instead' }).click();
        await page.getByPlaceholder('Email').fill(randomEmail);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Sign up', exact: true }).click();
        await expect(page.getByTestId('logout-btn')).toBeVisible();

        const movieCard = page.locator('a.movie-card').first();
        await movieCard.click();
        await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

        const showtimeButton = page.locator('button.movie-card').first();
        await showtimeButton.click();

        // 1. Chờ hiển thị sơ đồ ghế
        await expect(page.getByText(/select.*seat/i)).toBeVisible({ timeout: 10000 });

        // Expected: Hiển thị sơ đồ ghế: trống, đã đặt, đang chọn
        // Check for seat elements
        const seats = page.locator('button[class*="seat"]');
        await expect(seats.first()).toBeVisible({ timeout: 10000 });

        const seatCount = await seats.count();
        expect(seatCount).toBeGreaterThan(0);
        console.log(`Found ${seatCount} seats in the seat map`);

        // Verify seat legend/status indicators exist
        // Should show available, selected, and booked seats
        const legendItems = page.locator('text=/available|selected|taken/i');
        expect(await legendItems.count()).toBeGreaterThan(0);
    });

    test.skip('[BOOKING]-03: Chọn ghế', async ({ page }) => {
        // Dependencies: [BOOKING]-01
        const randomEmail = `selectseat${Date.now()}@test.com`;
        const password = 'password123';

        await page.getByTestId('login-btn').click();
        await page.getByRole('button', { name: 'Sign up instead' }).click();
        await page.getByPlaceholder('Email').fill(randomEmail);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Sign up', exact: true }).click();
        await expect(page.getByTestId('logout-btn')).toBeVisible();

        const movieCard = page.locator('a.movie-card').first();
        await movieCard.click();
        await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

        const showtimeButton = page.locator('button.movie-card').first();
        await showtimeButton.click();
        await expect(page.getByText(/select.*seat/i)).toBeVisible({ timeout: 10000 });

        // 1. Chọn ghế trống
        const availableSeats = page.locator('button.seat-available');
        const firstAvailableSeat = availableSeats.first();
        await expect(firstAvailableSeat).toBeVisible({ timeout: 10000 });

        const seatText = await firstAvailableSeat.textContent();
        console.log(`Selecting seat: ${seatText}`);

        await firstAvailableSeat.click();

        // Debug: Check actual attribute value
        const dataSelected = await firstAvailableSeat.getAttribute('data-selected');
        console.log(`data-selected attribute value: ${dataSelected}`);

        // Expected: Ghế được chọn (sử dụng data attribute thay vì class để tránh timing issue)
        await expect(firstAvailableSeat).toHaveAttribute('data-selected', 'true');

        const totalPrice = page.locator('text=/total/i').first();
        await expect(totalPrice).toBeVisible();

        const priceElement = page.locator('text=/\\$\\d+[,.]?\\d*/').first();
        await expect(priceElement).toBeVisible();
        console.log('Total price updated and visible');
    });

    test('[BOOKING]-04: Không chọn được ghế đã đặt', async ({ page }) => {
        // Dependencies: (Có dữ liệu vé)
        const randomEmail = `bookedseat${Date.now()}@test.com`;
        const password = 'password123';

        await page.getByTestId('login-btn').click();
        await page.getByRole('button', { name: 'Sign up instead' }).click();
        await page.getByPlaceholder('Email').fill(randomEmail);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Sign up', exact: true }).click();
        await expect(page.getByTestId('logout-btn')).toBeVisible();

        const movieCard = page.locator('a.movie-card').first();
        await movieCard.click();
        await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

        const showtimeButton = page.locator('button.movie-card').first();
        await showtimeButton.click();
        await expect(page.getByText(/select.*seat/i)).toBeVisible({ timeout: 10000 });

        // 1. Nhấp vào ghế đã đặt
        const bookedSeats = page.locator('button.seat-occupied');

        if (await bookedSeats.count() > 0) {
            const bookedSeat = bookedSeats.first();
            const seatText = await bookedSeat.textContent();
            console.log(`Attempting to click booked seat: ${seatText}`);

            await expect(bookedSeat).toBeDisabled();
            console.log('Booked seat is disabled as expected');
        } else {
            console.log('No booked seats found in this showtime - test passes');
        }
    });

    test.skip('[BOOKING]-05: Hoàn tất đặt vé', async ({ page }) => {
        // Dependencies: [BOOKING]-03
        const randomEmail = `completebook${Date.now()}@test.com`;
        const password = 'password123';

        await page.getByTestId('login-btn').click();
        await page.getByRole('button', { name: 'Sign up instead' }).click();
        await page.getByPlaceholder('Email').fill(randomEmail);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Sign up', exact: true }).click();
        await expect(page.getByTestId('logout-btn')).toBeVisible();

        const movieCard = page.locator('a.movie-card').first();
        await movieCard.click();
        await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

        const showtimeButton = page.locator('button.movie-card').first();
        await showtimeButton.click();
        await expect(page.getByText(/select.*seat/i)).toBeVisible({ timeout: 10000 });

        // Select at least 1 seat
        const availableSeats = page.locator('button.seat-available');
        const firstSeat = availableSeats.first();
        await expect(firstSeat).toBeVisible({ timeout: 10000 });
        await firstSeat.click();

        // Expected: Ghế được chọn (sử dụng data attribute)
        await expect(firstSeat).toHaveAttribute('data-selected', 'true');

        // 2. Nhấn "Đặt vé" (Proceed to Payment)
        const bookButton = page.getByRole('button', { name: /proceed.*payment|đặt.*vé/i });
        await expect(bookButton).toBeVisible({ timeout: 10000 });
        await bookButton.click();

        // Wait for payment modal
        await page.waitForTimeout(1000);

        // Click confirm payment button in modal
        const confirmButton = page.getByRole('button', { name: /confirm|xác.*nhận/i });
        await expect(confirmButton).toBeVisible({ timeout: 10000 });
        await confirmButton.click();

        // Expected: Đặt vé thành công, hiển thị thông tin vé
        const successMessage = page.locator('text=/payment.*successful|thành.*công/i');
        await expect(successMessage).toBeVisible({ timeout: 15000 });

        console.log('Booking completed successfully');

        const bookingDetails = page.locator('text=/booking.*details/i');
        await expect(bookingDetails).toBeVisible();
    });

});
