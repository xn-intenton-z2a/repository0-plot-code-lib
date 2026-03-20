// SPDX-License-Identifier: MIT
import { test, expect } from 'vitest';
import { parseExpression, parseRange, evaluateRange, renderSVG } from '../../src/lib/main.js';

test('renderSVG contains svg, viewBox and polyline', () => {
  const fn = parseExpression('x');
  const r = parseRange('0:1:2');
  const series = evaluateRange(fn, r.start, r.step, r.end);
  const svg = renderSVG(series, { width: 300, height: 100 });
  expect(svg).toContain('<svg');
  expect(svg).toContain('viewBox="0 0');
  expect(svg).toContain('<polyline');
  expect(svg).toContain('points="');
});
