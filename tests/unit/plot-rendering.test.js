// SPDX-License-Identifier: MIT
import { test, expect } from 'vitest';
import { parseExpression, evaluateRange, renderSVG, svgToPng } from '../../src/lib/main.js';
import { execSync } from 'child_process';

test('Generated SVG contains <polyline> and viewBox', () => {
  const fn = parseExpression('y=x');
  const pts = evaluateRange('0:1:10', fn);
  const svg = renderSVG(pts);
  expect(svg).toContain('<polyline');
  expect(svg).toContain('viewBox');
});

test('svgToPng output begins with PNG magic bytes', async () => {
  const fn = parseExpression('y=x');
  const pts = evaluateRange('0:1:10', fn);
  const svg = renderSVG(pts);
  const png = await svgToPng(svg);
  expect(Buffer.isBuffer(png)).toBe(true);
  const header = png.slice(0, 8).toString('hex');
  expect(header).toBe('89504e470d0a1a0a');
});

test('Evaluating -3.14:0.01:3.14 yields many points (~628)', () => {
  const fn = parseExpression('y=Math.sin(x)');
  const pts = evaluateRange('-3.14:0.01:3.14', fn);
  expect(pts.length).toBeGreaterThan(600);
});

test('--help prints usage examples', () => {
  const out = execSync('node src/lib/main.js --help', { encoding: 'utf8' });
  expect(out).toContain('Usage');
  expect(out).toContain('Examples');
});
