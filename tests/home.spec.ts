import { test, expect } from '@playwright/test';

const SITE_URL = 'https://solargarlicband.com'

test('home page loads', async ({ page }) => {
  const response = await page.goto(SITE_URL, {
    waitUntil: 'networkidle',
  });

  expect(response?.status()).toBe(200);
  
  await expect(page).toHaveTitle(/Solar Garlic/);
});
