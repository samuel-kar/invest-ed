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
  await page.getByRole('button', { name: /switch to/i }).click()
  const after = await page.evaluate(() =>
    document.documentElement.getAttribute('data-theme'),
  )
  expect(after).not.toBe(before)
  await page.reload()
  const persisted = await page.evaluate(() =>
    document.documentElement.getAttribute('data-theme'),
  )
  expect(persisted).toBe(after)
})

