// SPDX-License-Identifier: MIT
import { test, expect } from 'vitest';
import { parseExpression, parseRange, evaluateRange, savePlotToFile } from '../../src/lib/main.js';
import { existsSync, readFileSync, unlinkSync } from 'fs';

test('savePlotToFile writes SVG file', async () => {
  const fn = parseExpression('x');
  const r = parseRange('0:1:2');
  const series = evaluateRange(fn, r.start, r.step, r.end);
  const out = 'tests/unit/tmp_out.svg';
  try {
    await savePlotToFile(out, series, { width: 120, height: 40 });
    expect(existsSync(out)).toBe(true);
    const content = readFileSync(out, 'utf8');
    expect(content).toContain('<polyline');
  } finally {
    try { unlinkSync(out); } catch (e) {}
  }
});

test('savePlotToFile writes PNG when sharp available', async () => {
  let sharpAvailable = true;
  try { await import('sharp'); } catch (err) { sharpAvailable = false; }
  if (!sharpAvailable) {
    expect(true).toBe(true);
    return;
  }
  const fn = parseExpression('x');
  const r = parseRange('0:1:2');
  const series = evaluateRange(fn, r.start, r.step, r.end);
  const out = 'tests/unit/tmp_out.png';
  try {
    await savePlotToFile(out, series, { width: 80, height: 40 });
    expect(existsSync(out)).toBe(true);
    const buf = readFileSync(out);
    const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(buf.slice(0, 8).equals(sig)).toBe(true);
  } finally {
    try { unlinkSync(out); } catch (e) {}
  }
});
