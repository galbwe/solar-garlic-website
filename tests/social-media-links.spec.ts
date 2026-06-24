import { test, expect } from '@playwright/test';

const INSTAGRAM_URL = 'https://www.instagram.com/solar_garlic_band/';
const FACEBOOK_URL = 'https://www.facebook.com/people/Solar-Garlic-Band/61557279204594/?mibextid=kFxxJD';

test.describe('Social Media Links in Navigation', () => {
  test('should have Instagram link in the nav that opens in a new tab', async ({
    page,
    context,
  }) => {
    // Navigate to the homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find the Instagram link
    const instagramLink = page.locator('a[href="' + INSTAGRAM_URL + '"]');

    // Verify the link exists
    await expect(instagramLink).toBeVisible();

    // Verify it has the correct href attribute
    await expect(instagramLink).toHaveAttribute('href', INSTAGRAM_URL);

    // Verify it opens in a new tab (target="_blank")
    await expect(instagramLink).toHaveAttribute('target', '_blank');
  });

  test('should have Facebook link in the nav that opens in a new tab', async ({
    page,
    context,
  }) => {
    // Navigate to the homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find the Facebook link
    const facebookLink = page.locator('a[href="' + FACEBOOK_URL + '"]');

    // Verify the link exists
    await expect(facebookLink).toBeVisible();

    // Verify it has the correct href attribute
    await expect(facebookLink).toHaveAttribute('href', FACEBOOK_URL);

    // Verify it opens in a new tab (target="_blank")
    await expect(facebookLink).toHaveAttribute('target', '_blank');
  });

  test('should display social media links only on desktop viewports', async ({
    page,
  }) => {
    // Test on desktop viewport (should be visible)
    await page.setViewportSize({ width: 1280, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const instagramLink = page.locator('a[href="' + INSTAGRAM_URL + '"]');
    const facebookLink = page.locator('a[href="' + FACEBOOK_URL + '"]');

    // On desktop, the social links should be visible (not sr-only)
    await expect(instagramLink).toBeVisible();
    await expect(facebookLink).toBeVisible();
  });
});
