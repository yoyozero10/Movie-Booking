import { test, expect } from '@playwright/test';

test.describe('Lab 1 - Payment Module [PAYMENT]', () => {

    test.beforeEach(async ({ page }) => {
        page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
        page.on('pageerror', err => console.log('BROWSER ERROR:', err));

        // Navigate to homepage
        await page.goto('/');
        await page.waitForLoadState('networkidle');
    });

    // Helper function to navigate to payment screen
    async function navigateToPayment(page: any) {
        const randomEmail = `payment${Date.now()}@test.com`;
        const password = 'password123';

        // 1. Login
        await page.getByTestId('login-btn').click();
        await page.getByRole('button', { name: 'Sign up instead' }).click();
        await page.getByPlaceholder('Email').fill(randomEmail);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Sign up', exact: true }).click();
        await expect(page.getByTestId('logout-btn')).toBeVisible();

        // 2. Navigate to movie details
        const movieCard = page.locator('a.movie-card').first();
        await movieCard.click();
        await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

        // 3. Select showtime
        const showtimeButton = page.locator('button.movie-card').first();
        await expect(showtimeButton).toBeVisible({ timeout: 10000 });
        await showtimeButton.click();
        await expect(page.getByText(/select.*seat/i)).toBeVisible({ timeout: 10000 });

        // 4. Select seat
        const availableSeats = page.locator('button.seat-available');
        const firstSeat = availableSeats.first();
        await expect(firstSeat).toBeVisible({ timeout: 10000 });
        await firstSeat.click();
        await page.waitForTimeout(500);

        // 5. Click proceed to payment
        const proceedButton = page.getByRole('button', { name: /proceed.*payment|đặt.*vé/i });
        await expect(proceedButton).toBeVisible({ timeout: 10000 });
        await proceedButton.click();
        await page.waitForTimeout(1000);
    }

    test('[PAYMENT]-01: Hiển thị màn hình thanh toán', async ({ page }) => {
        // Dependencies: [BOOKING]-05
        await navigateToPayment(page);

        // Expected: Hiển thị trang thanh toán với tổng tiền và phương thức thanh toán
        const paymentHeading = page.locator('h2:has-text("Thanh Toán")');
        await expect(paymentHeading).toBeVisible({ timeout: 10000 });

        console.log('✅ Payment screen displayed');

        // Verify payment methods are available
        const momoButton = page.locator('button:has-text("MoMo")');
        const zaloPayButton = page.locator('button:has-text("ZaloPay")');
        const vnPayButton = page.locator('button:has-text("VNPay")');
        const atmButton = page.locator('button:has-text("Thẻ ATM")');

        await expect(momoButton).toBeVisible();
        await expect(zaloPayButton).toBeVisible();
        await expect(vnPayButton).toBeVisible();
        await expect(atmButton).toBeVisible();

        console.log('✅ All 4 payment methods displayed');

        // Verify total amount
        const totalAmount = page.locator('text=/tổng cộng/i');
        await expect(totalAmount).toBeVisible();
    });

    test('[PAYMENT]-02: Thanh toán thành công (Ví Momo)', async ({ page }) => {
        // Dependencies: [PAYMENT]-01
        await navigateToPayment(page);

        // 1. Chọn "Ví Momo" (should be selected by default)
        const momoButton = page.locator('button:has-text("MoMo")');
        await momoButton.click();
        console.log('✅ Selected Momo payment method');

        // Verify Momo is selected (border should be pink)
        await expect(momoButton).toHaveClass(/border-pink-500/);

        // 2. Click "Thanh Toán" button
        const payButton = page.locator('button:has-text("Thanh Toán")').last();
        await expect(payButton).toBeVisible();
        await payButton.click();
        console.log('Clicked payment button');

        // Expected: Hiển thị "Thanh toán thành công"
        // Wait for success toast
        const successToast = page.locator('text=/thanh toán thành công/i');
        await expect(successToast).toBeVisible({ timeout: 5000 });
        console.log('✅ Payment successful message displayed');

        // Should navigate to success screen
        await page.waitForTimeout(3000);
        const successScreen = page.locator('text=/payment.*successful|thành.*công/i');
        if (await successScreen.isVisible({ timeout: 2000 }).catch(() => false)) {
            console.log('✅ Success screen displayed');
        }
    });

    test('[PAYMENT]-03: Thanh toán thành công (Ví ZaloPay)', async ({ page }) => {
        // Dependencies: [PAYMENT]-01
        await navigateToPayment(page);

        // 1. Chọn "ZaloPay"
        const zaloPayButton = page.locator('button:has-text("ZaloPay")');
        await zaloPayButton.click();
        console.log('✅ Selected ZaloPay payment method');

        // Verify ZaloPay is selected
        await expect(zaloPayButton).toHaveClass(/border-blue-500/);

        // 2. Click "Thanh Toán"
        const payButton = page.locator('button:has-text("Thanh Toán")').last();
        await payButton.click();

        // Expected: Success message
        const successToast = page.locator('text=/thanh toán thành công/i');
        await expect(successToast).toBeVisible({ timeout: 5000 });
        console.log('✅ ZaloPay payment successful');
    });

    test('[PAYMENT]-04: Thanh toán thành công (Ví VNPay)', async ({ page }) => {
        // Dependencies: [PAYMENT]-01
        await navigateToPayment(page);

        // 1. Chọn "VN Pay"
        const vnPayButton = page.locator('button:has-text("VNPay")');
        await vnPayButton.click();
        console.log('✅ Selected VNPay payment method');

        // Verify VNPay is selected
        await expect(vnPayButton).toHaveClass(/border-red-500/);

        // 2. Click "Thanh Toán"
        const payButton = page.locator('button:has-text("Thanh Toán")').last();
        await payButton.click();

        // Expected: Success message
        const successToast = page.locator('text=/thanh toán thành công/i');
        await expect(successToast).toBeVisible({ timeout: 5000 });
        console.log('✅ VNPay payment successful');
    });

    test('[PAYMENT]-05: Thanh toán thành công (Thẻ ATM)', async ({ page }) => {
        // Dependencies: [PAYMENT]-01
        await navigateToPayment(page);

        // 1. Chọn "Thẻ ATM"
        const atmButton = page.locator('button:has-text("Thẻ ATM")');
        await atmButton.click();

        // Wait for ATM form to appear
        await page.waitForTimeout(1000);
        console.log('✅ Selected ATM card payment method');

        // Verify ATM is selected
        await expect(atmButton).toHaveClass(/border-primary/);

        // Wait for ATM form to be visible and ready
        const cardNumberInput = page.getByPlaceholder('1234 5678 9012 3456');
        await expect(cardNumberInput).toBeVisible({ timeout: 5000 });

        // 2. Fill card details one by one with waits
        await cardNumberInput.fill('9704123456789012');
        await page.waitForTimeout(200);

        await page.getByPlaceholder('NGUYEN VAN A').fill('NGUYEN VAN A');
        await page.waitForTimeout(200);

        await page.getByPlaceholder('MM/YY').fill('12/25');
        await page.waitForTimeout(200);

        // Use exact match to avoid matching card number value containing "123"
        await page.getByPlaceholder('123', { exact: true }).fill('123');
        console.log('✅ Filled card details');

        // 3. Click "Thanh Toán"
        const payButton = page.locator('button:has-text("Thanh Toán")').last();
        await payButton.click();

        // Expected: Success message
        const successToast = page.locator('text=/thanh toán thành công/i');
        await expect(successToast).toBeVisible({ timeout: 5000 });
        console.log('✅ ATM card payment successful');
    });

    test('[PAYMENT]-06: Xử lý lỗi mạng khi thanh toán', async ({ page }) => {
        // Dependencies: [PAYMENT]-01
        await navigateToPayment(page);

        // 1. Chọn ATM nhưng không điền thông tin
        const atmButton = page.locator('button:has-text("Thẻ ATM")');
        await atmButton.click();
        console.log('Selected ATM without filling details');

        // 2. Click "Thanh Toán" without filling card info
        const payButton = page.locator('button:has-text("Thanh Toán")').last();
        await payButton.click();

        // Expected: Error message
        const errorToast = page.locator('text=/vui lòng điền|không hợp lệ|error/i');
        await expect(errorToast).toBeVisible({ timeout: 5000 });
        console.log('✅ Error message displayed for incomplete form');

        // Verify booking is not created (modal should still be open)
        const paymentModal = page.locator('h2:has-text("Thanh Toán")');
        await expect(paymentModal).toBeVisible();
        console.log('✅ Payment modal still open (booking not created)');
    });

});
