import { test, expect } from '@playwright/test';

test.describe('Lab 1 - Authentication Module [AUTH]', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
    });

    test('[AUTH]-01: Verify Login Form Display', async ({ page }) => {
        await page.getByTestId('login-btn').click();
        const modal = page.getByTestId('login-modal');
        await expect(modal).toBeVisible();
        await expect(page.getByPlaceholder('Email')).toBeVisible();
        await expect(page.getByPlaceholder('Password')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Sign in', exact: true })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Sign up instead' })).toBeVisible();
    });

    test('[AUTH]-02: Login Success', async ({ page }) => {
        // Register new user first
        const randomEmail = `loginuser${Date.now()}@test.com`;
        const password = 'password123';

        await page.getByTestId('login-btn').click();
        await page.getByRole('button', { name: 'Sign up instead' }).click();
        await page.getByPlaceholder('Email').fill(randomEmail);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Sign up', exact: true }).click();

        // Logout to test login
        await expect(page.getByTestId('logout-btn')).toBeVisible();
        await page.getByTestId('logout-btn').click();
        await expect(page.getByTestId('login-btn')).toBeVisible();

        // Test Login
        await page.getByTestId('login-btn').click();
        await page.getByPlaceholder('Email').fill(randomEmail);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Sign in', exact: true }).click();

        // Verify Login Success
        await expect(page.getByPlaceholder('Email')).not.toBeVisible();
        await expect(page.getByTestId('logout-btn')).toBeVisible();
    });

    test('[AUTH]-03: Login Failure (Wrong Password)', async ({ page }) => {
        await page.getByTestId('login-btn').click();
        await page.getByPlaceholder('Email').fill('admin@cinemavision.com');
        await page.getByPlaceholder('Password').fill('wrongpassword123');
        await page.getByRole('button', { name: 'Sign in', exact: true }).click();
        const toast = page.getByText('Invalid email or password');
        await expect(toast).toBeVisible();
        await expect(page.getByPlaceholder('Email')).toBeVisible();
    });

    test('[AUTH]-04: Register Success', async ({ page }) => {
        await page.getByTestId('login-btn').click();
        await page.getByRole('button', { name: 'Sign up instead' }).click();

        const randomEmail = `newuser${Date.now()}@test.com`;
        await page.getByPlaceholder('Email').fill(randomEmail);
        await page.getByPlaceholder('Password').fill('password123');

        await page.getByRole('button', { name: 'Sign up', exact: true }).click();

        // Verify Registration Success
        await expect(page.getByPlaceholder('Email')).not.toBeVisible();
        await expect(page.getByTestId('logout-btn')).toBeVisible();
    });

    test('[AUTH]-05: Register Failure (Existing Email)', async ({ page }) => {
        await page.getByTestId('login-btn').click();
        await page.getByRole('button', { name: 'Sign up instead' }).click();

        // Use existing admin email
        await page.getByPlaceholder('Email').fill('admin@cinemavision.com');
        await page.getByPlaceholder('Password').fill('password123');
        await page.getByRole('button', { name: 'Sign up', exact: true }).click();

        // Verify Error
        const toast = page.getByText('User already exists');
        await expect(toast).toBeVisible();
        await expect(page.getByPlaceholder('Email')).toBeVisible();
    });

    test('[AUTH]-06: Logout', async ({ page }) => {
        // Register and login first
        const randomEmail = `logoutuser${Date.now()}@test.com`;
        const password = 'password123';

        await page.getByTestId('login-btn').click();
        await page.getByRole('button', { name: 'Sign up instead' }).click();
        await page.getByPlaceholder('Email').fill(randomEmail);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Sign up', exact: true }).click();

        // Verify logged in
        await expect(page.getByTestId('logout-btn')).toBeVisible();

        // Test Logout
        await page.getByTestId('logout-btn').click();

        // Verify Logout Success
        await expect(page.getByTestId('login-btn')).toBeVisible();
        await expect(page.getByTestId('logout-btn')).not.toBeVisible();
    });

});
