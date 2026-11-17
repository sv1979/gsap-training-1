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

test.describe('Hero video', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders scroll-pinned background video with expected attributes', async ({
    page,
  }) => {
    const wrapper = page.locator('.video');
    const video = wrapper.locator('video');

    await expect(wrapper).toBeVisible();
    await expect(video).toHaveAttribute('src', /\/videos\/output\.mp4$/);
    await expect(video).toHaveAttribute('preload', 'auto');
    await expect(video).toHaveJSProperty('muted', true);
    await expect(video).toHaveJSProperty('playsInline', true);
  });

  test('loads video metadata for scroll scrubbing', async ({ page }) => {
    const video = page.locator('.video video');
    await expect(video).toBeVisible();

    await expect
      .poll(
        async () =>
          video.evaluate((el) => el.readyState >= HTMLMediaElement.HAVE_METADATA),
        { timeout: 15_000 },
      )
      .toBe(true);

    const duration = await video.evaluate((el) => el.duration);
    expect(duration).toBeGreaterThan(0);
  });
});