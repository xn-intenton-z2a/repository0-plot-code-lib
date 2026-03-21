// SPDX-License-Identifier: MIT
// Playwright behaviour test to assert FizzBuzz demo output
import { test, expect } from "@playwright/test";

test("demo page renders FizzBuzz sequence for n=15", async ({ page }) => {
  const response = await page.goto("./", { waitUntil: "networkidle" });
  expect(response.status()).toBe(200);

  await expect(page.locator('#demo-output')).toBeVisible({ timeout: 10000 });
  const demoText = await page.locator('#demo-output').textContent();
  expect(demoText).toContain('FizzBuzz');
  expect(demoText?.trim()).toBe('1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz');
});
