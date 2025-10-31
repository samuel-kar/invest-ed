import { test, expect } from '@playwright/test'

test('loads home and navigates to calculators and back', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/invest|vite/i)

  // Basic nav via header or sidebar links (selectors may vary; use text)
  await page.getByRole('link', { name: /calculators/i }).click()
  await expect(page).toHaveURL(/calculators/)

  // Back to home
  await page.getByRole('link', { name: /home/i }).click()
  await expect(page).toHaveURL('/')
})

test('settings theme toggle persists on reload', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /settings/i }).click()
  const before = await page.evaluate(() =>
    document.documentElement.getAttribute('data-theme'),
  )
  // Disambiguate: click the settings page toggle (in main), not the header toggle
  const main = page.getByRole('main')
  await main.getByRole('button', { name: /switch to/i }).click()

  // Wait for theme change on <html>
  await expect(page.locator('html')).toHaveAttribute(
    'data-theme',
    /(dark|light)/,
  )
  const after = await page.evaluate(() =>
    document.documentElement.getAttribute('data-theme'),
  )
  expect(after).not.toBe(before)
  await page.reload()
  // After reload, wait until the app sets theme from localStorage
  await expect(page.locator('html')).toHaveAttribute('data-theme', after!)
})
