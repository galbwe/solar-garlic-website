import { test, expect } from '@playwright/test';

const PAGE = '/about'

test('about page loads', async ({ page }) => {
  const response = await page.goto(PAGE, {
    waitUntil: 'networkidle',
  });

  expect(response?.status()).toBe(200);
});
