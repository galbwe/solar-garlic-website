import { test, expect } from '@playwright/test';

const NAV_ITEMS = [
  { title: 'Home', href: '/' },
  { title: 'Music', href: '/music' },
  { title: 'Events', href: '/events' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

test.describe('Desktop navigation', () => {
  // Desktop nav renders at xl breakpoint (≥1024px)
  test.use({ viewport: { width: 1280, height: 768 } });

  test('nav bar contains links to all pages', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    for (const { title, href } of NAV_ITEMS) {
      const link = page.getByRole('link', { name: title, exact: true }).first();
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', href);
    }
  });

  for (const { title, href } of NAV_ITEMS) {
    test(`clicking "${title}" navigates to ${href}`, async ({ page }) => {
      // Start from a page that isn't the destination (use /about as a neutral start,
      // except when the destination is /about — then start from /)
      const startPage = href === '/about' ? '/' : '/about';
      await page.goto(startPage, { waitUntil: 'networkidle' });

      const link = page.getByRole('link', { name: title, exact: true }).first();
      await expect(link).toBeVisible();
      await link.click();

      // Verify the URL changed to the expected path
      await expect(page).toHaveURL(
        href === '/' ? /\/$/ : new RegExp(`${href}(/|$)`)
      );
    });
  }
});

test.describe('Mobile navigation', () => {
  // Mobile nav renders below xl breakpoint (<1024px)
  test.use({ viewport: { width: 375, height: 667 } });

  test('hamburger menu opens and shows all nav links', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Desktop nav links should not be visible; hamburger should be
    const hamburger = page.getByAltText('Hamburger icon');
    await expect(hamburger).toBeVisible();

    // Open the mobile menu
    await hamburger.click();

    // All nav links should now be visible in the drawer
    for (const { title, href } of NAV_ITEMS) {
      const link = page.getByRole('link', { name: title, exact: true }).first();
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', href);
    }
  });

  for (const { title, href } of NAV_ITEMS) {
    test(`clicking "${title}" in mobile menu navigates to ${href}`, async ({ page }) => {
      const startPage = href === '/about' ? '/' : '/about';
      await page.goto(startPage, { waitUntil: 'networkidle' });

      // Open the hamburger menu
      const hamburger = page.getByAltText('Hamburger icon');
      await expect(hamburger).toBeVisible();
      await hamburger.click();

      // Click the nav link
      const link = page.getByRole('link', { name: title, exact: true }).first();
      await expect(link).toBeVisible();
      await link.click();

      // Verify navigation succeeded
      await expect(page).toHaveURL(
        href === '/' ? /\/$/ : new RegExp(`${href}(/|$)`)
      );
    });
  }
});
