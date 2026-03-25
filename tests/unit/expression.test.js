// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { parseExpression } from '../../src/lib/main.js';

describe('Expression Parser', () => {
  test('parses y=Math.sin(x) into a callable function', () => {
    const fn = parseExpression('y=Math.sin(x)');
    expect(typeof fn).toBe('function');
    expect(fn(0)).toBeCloseTo(0);
    expect(fn(Math.PI / 2)).toBeCloseTo(1);
  });

  test('parses simple polynomial', () => {
    const fn = parseExpression('y=x*x+2*x-1');
    expect(fn(2)).toBe(2 * 2 + 2 * 2 - 1);
  });
});
