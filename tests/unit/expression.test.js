// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { parseExpression } from '../../src/lib/main.js';

describe('Expression parser', () => {
  test('parses Math.sin expression', () => {
    const f = parseExpression('y=Math.sin(x)');
    expect(typeof f).toBe('function');
    expect(Math.abs(f(0) - 0) < 1e-12).toBe(true);
    expect(Math.abs(f(Math.PI / 2) - 1) < 1e-6).toBe(true);
  });

  test('parses simple arithmetic', () => {
    const f = parseExpression('x*2+1');
    expect(f(1)).toBe(3);
  });

  test('forbids dangerous tokens', () => {
    expect(() => parseExpression('y=process.exit()')).toThrow(SyntaxError);
    expect(() => parseExpression('y=this.constructor')).toThrow(SyntaxError);
  });
});
