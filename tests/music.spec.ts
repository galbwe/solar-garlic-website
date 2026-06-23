import { test, expect } from '@playwright/test';

const PAGE = '/music'

test('music page loads', async ({ page }) => {
  const response = await page.goto(PAGE, {
    waitUntil: 'networkidle',
  });

  expect(response?.status()).toBe(200);
});
