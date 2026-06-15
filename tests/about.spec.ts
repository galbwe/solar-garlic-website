import { test, expect } from '@playwright/test';

const SITE_URL = 'https://solargarlicband.com'

const PAGE = '/about'

test('about page loads', async ({ page }) => {
  const response = await page.goto(SITE_URL + PAGE, {
    waitUntil: 'networkidle',
  });

  expect(response?.status()).toBe(200);
});
