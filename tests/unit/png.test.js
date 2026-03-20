// SPDX-License-Identifier: MIT
import { test, expect } from 'vitest';
import { parseExpression, parseRange, evaluateRange, renderPNG } from '../../src/lib/main.js';

test('renderPNG produces PNG signature when sharp is available', async () => {
  let sharpAvailable = true;
  try {
    await import('sharp');
  } catch (err) {
    sharpAvailable = false;
  }
  if (!sharpAvailable) {
    // Skip assertion when sharp isn't installed on CI
    expect(true).toBe(true);
    return;
  }

  const fn = parseExpression('x');
  const r = parseRange('0:1:2');
  const series = evaluateRange(fn, r.start, r.step, r.end);
  const buf = await renderPNG(series, { width: 50, height: 20 });
  expect(buf instanceof Buffer).toBe(true);
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  expect(buf.slice(0, 8).equals(sig)).toBe(true);
});
