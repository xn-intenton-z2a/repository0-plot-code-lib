// SPDX-License-Identifier: MIT
// Unit tests for Roman numeral conversions
import { describe, test, expect } from 'vitest';
import { toRoman, fromRoman } from '../../src/lib/main.js';

describe('Roman conversion', () => {
  test('toRoman: known values', () => {
    expect(toRoman(1994)).toBe('MCMXCIV');
    expect(toRoman(4)).toBe('IV');
    expect(toRoman(9)).toBe('IX');
    expect(toRoman(40)).toBe('XL');
    expect(toRoman(90)).toBe('XC');
    expect(toRoman(400)).toBe('CD');
    expect(toRoman(900)).toBe('CM');
    expect(toRoman(1)).toBe('I');
    expect(toRoman(3999)).toBe('MMMCMXCIX');
  });

  test('toRoman: validation and errors', () => {
    expect(() => toRoman(0)).toThrow(RangeError);
    expect(() => toRoman(4000)).toThrow(RangeError);
    expect(() => toRoman(4.5)).toThrow(TypeError);
    expect(() => toRoman(NaN)).toThrow(TypeError);
    expect(() => toRoman('5')).toThrow(TypeError);
  });

  test('fromRoman: known values and case-insensitive', () => {
    expect(fromRoman('MCMXCIV')).toBe(1994);
    expect(fromRoman('IV')).toBe(4);
    expect(fromRoman('ix')).toBe(9);
    expect(fromRoman('mmmcmxcix')).toBe(3999);
  });

  test('fromRoman: invalid inputs', () => {
    expect(() => fromRoman('IIII')).toThrow(TypeError);
    expect(() => fromRoman('VX')).toThrow(TypeError);
    expect(() => fromRoman('IC')).toThrow(TypeError);
    expect(() => fromRoman('')).toThrow(TypeError);
    expect(() => fromRoman(123)).toThrow(TypeError);
  });

  test('round-trip 1..3999', { timeout: 120000 }, () => {
    for (let n = 1; n <= 3999; n++) {
      const r = toRoman(n);
      const n2 = fromRoman(r);
      expect(n2).toBe(n);
    }
  });
});
