// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { parseRange, evaluateExpressionOverRange, parseExpression } from '../../src/lib/main.js';

describe('Range Evaluator', () => {
  test('parses range and returns expected number of points (~629)', () => {
    const { start, step, end } = parseRange('-3.14:0.01:3.14');
    const fn = parseExpression('y=x');
    const pts = evaluateExpressionOverRange(fn, start, step, end);
    // Expect 629 points: (end-start)/step + 1 => 6.28/0.01 + 1 = 629
    expect(pts.length).toBe(629);
  });
});
