import { test, expect } from '@playwright/test';

test.describe('Lab 1 - Movie Module [MOVIE]', () => {

    test.beforeEach(async ({ page }) => {
        page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
        page.on('pageerror', err => console.log('BROWSER ERROR:', err));
        await page.goto('/');
        await page.waitForLoadState('networkidle');
    });

    test('[MOVIE]-01: Verify Movie List Display', async ({ page }) => {
        const movieCards = page.locator('a.movie-card');
        await expect(movieCards.first()).toBeVisible({ timeout: 10000 });
        const count = await movieCards.count();
        expect(count).toBeGreaterThan(0);
        console.log(`Found ${count} movies on homepage.`);
    });

    test('[MOVIE]-02: Search Movie Functionality', async ({ page }) => {
        const firstMovieCard = page.locator('a.movie-card').first();
        await expect(firstMovieCard).toBeVisible();

        const movieTitle = await firstMovieCard.locator('h4').innerText();
        console.log(`Testing search for movie: ${movieTitle}`);

        await page.getByTestId('search-toggle').click();

        const searchInput = page.getByTestId('search-input');
        await searchInput.fill(movieTitle);

        await page.waitForTimeout(3000);

        const resultTitle = page.locator('h4', { hasText: movieTitle }).first();
        await expect(resultTitle).toBeVisible();
    });

    test('[MOVIE]-03: View Movie Details', async ({ page }) => {
        const movieCard = page.locator('a.movie-card').first();
        const href = await movieCard.getAttribute('href');
        console.log(`Navigating to: ${href}`);

        if (!href) throw new Error('Movie card has no href');

        await page.goto(href);

        console.log('Current URL after goto:', page.url());

        try {
            await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
        } catch (e) {
            console.log('ERROR: h1 not found. Current URL:', page.url());
            if (await page.getByText('Movie not found').isVisible()) {
                console.log('ERROR: Movie not found message displayed');
            }
            throw e;
        }

        await expect(page.getByText('Storyline')).toBeVisible();
        await expect(page.getByRole('button', { name: /book tickets/i })).toBeVisible();
    });

});
