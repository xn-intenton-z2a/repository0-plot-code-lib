// SPDX-License-Identifier: MIT
// Behaviour test: verify SVG polyline and points count are present and correct
import { test, expect } from '@playwright/test';

// Expected point count is 629 for range -3.14:0.01:3.14 (inclusive arithmetic: (3.14-(-3.14))/0.01 + 1 = 629)
test('renders polyline and shows expected points count for sine example', async ({ page }) => {
  await page.goto('./', { waitUntil: 'networkidle' });
  await expect(page.locator('#lib-name')).toBeVisible();

  // Ensure inputs are set and trigger plotting
  await page.fill('#expr-input', 'y=Math.sin(x)');
  await page.fill('#range-input', '-3.14:0.01:3.14');
  await page.click('#plot-btn');

  // Wait for points count and assert it contains the expected number
  await expect(page.locator('#points-count')).toHaveText(/629/, { timeout: 5000 });

  // Assert there is an SVG polyline element
  const poly = page.locator('svg polyline');
  await expect(poly).toHaveCount(1);

  // Check that the polyline has multiple point coordinates
  const pointsAttr = await poly.getAttribute('points');
  expect(pointsAttr).toBeTruthy();
  const parts = pointsAttr.trim().split(/\s+/);
  expect(parts.length).toBeGreaterThan(1);
});
