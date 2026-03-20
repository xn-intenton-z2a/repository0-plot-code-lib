// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { parseRange, evaluateRange, parseExpression } from '../../src/lib/main.js';

describe('Range parsing and evaluation', () => {
  test('parseRange returns numeric components', () => {
    const r = parseRange('-3.14:0.01:3.14');
    expect(r).toEqual({ start: -3.14, step: 0.01, end: 3.14 });
  });

  test('evaluateRange produces expected count and endpoints', () => {
    const fn = parseExpression('y=Math.sin(x)');
    const r = parseRange('-3.14:0.01:3.14');
    const pts = evaluateRange(fn, r.start, r.step, r.end);
    expect(pts.length).toBe(629);
    expect(Math.abs(pts[0].x - (-3.14)) < 1e-12).toBe(true);
    expect(Math.abs(pts[pts.length - 1].x - 3.14) < 1e-12).toBe(true);
  });

  test('zero step throws RangeError', () => {
    expect(() => parseRange('1:0:2')).toThrow(RangeError);
  });

  test('malformed range throws TypeError', () => {
    expect(() => parseRange('not:a:range')).toThrow(TypeError);
  });
});
