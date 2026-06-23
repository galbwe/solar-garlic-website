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

    // Verify it opens in a new tab (target="_blank")
    await expect(instagramLink).toHaveAttribute('target', '_blank');

    // Create a promise to listen for new page
    const newPagePromise = context.waitForEvent('page');

    // Click the Instagram link
    await instagramLink.click();

    // Get the new page
    const newPage = await newPagePromise;
    await newPage.waitForLoadState('load');

    // Verify the new page navigated to the correct URL
    expect(newPage.url()).toContain('instagram.com/solar_garlic_band');

    // Clean up
    await newPage.close();
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

    // Verify it opens in a new tab (target="_blank")
    await expect(facebookLink).toHaveAttribute('target', '_blank');

    // Create a promise to listen for new page
    const newPagePromise = context.waitForEvent('page');

    // Click the Facebook link
    await facebookLink.click();

    // Get the new page
    const newPage = await newPagePromise;
    await newPage.waitForLoadState('load');

    // Verify the new page navigated to the correct URL
    expect(newPage.url()).toContain('facebook.com');

    // Clean up
    await newPage.close();
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
