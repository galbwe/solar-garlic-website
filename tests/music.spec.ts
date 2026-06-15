import { test, expect } from '@playwright/test';

const SITE_URL = 'https://solargarlicband.com'

const PAGE = '/music'

test('music page loads', async ({ page }) => {
  const response = await page.goto(SITE_URL + PAGE, {
    waitUntil: 'networkidle',
  });

  expect(response?.status()).toBe(200);
});
