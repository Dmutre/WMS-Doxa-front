import { test, expect } from '@playwright/test';

const MAIN_URL = 'http://localhost:3500/';

test('correct UI test', async ({ page }) => {
  await page.goto(MAIN_URL);
  await expect(page.getByText('Welcome Back')).toBeVisible();
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('WMS Doxa')).toBeVisible();
  await page.getByRole('button', { name: 'Add Warehouse' }).click();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill(`test Warehouse`);
  await page.getByLabel('Name').press('Tab');
  await page.getByLabel('Address').fill(`test Address`);
  await page.getByRole('button', { name: 'Add' }).click();
  await page.waitForTimeout(1000);
  await expect(
    page.getByRole('checkbox', { name: 'test Warehouse test Address' })
  ).toBeVisible();
});
