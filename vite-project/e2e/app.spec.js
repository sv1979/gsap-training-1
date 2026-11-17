import { test, expect } from '@playwright/test';

test.describe('App shell', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows brand and navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Velvet Pour' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cocktails' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About Us' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'The Art' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('shows hero headline and primary CTA', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    await expect(hero.getByRole('heading', { name: 'MOJITO' })).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'View Coctails' }),
    ).toHaveAttribute('href', '#cocktails');
  });
});