import { test, expect } from '@playwright/test';

const PAGE = '/events'

test('events page loads', async ({ page }) => {
  const response = await page.goto(PAGE, {
    waitUntil: 'networkidle',
  });

  expect(response?.status()).toBe(200);
});
