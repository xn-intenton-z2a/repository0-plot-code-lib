// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { toRoman, fromRoman } from "../../src/lib/main.js";

describe("Roman numerals", () => {
  test("toRoman(1994) === 'MCMXCIV'", () => {
    expect(toRoman(1994)).toBe("MCMXCIV");
  });

  test("fromRoman('MCMXCIV') === 1994", () => {
    expect(fromRoman('MCMXCIV')).toBe(1994);
  });

  test("toRoman(4) === 'IV'", () => {
    expect(toRoman(4)).toBe('IV');
  });

  test("toRoman(0) throws RangeError", () => {
    expect(() => toRoman(0)).toThrow(RangeError);
  });

  test("toRoman(4000) throws RangeError", () => {
    expect(() => toRoman(4000)).toThrow(RangeError);
  });

  test("fromRoman('IIII') throws TypeError", () => {
    expect(() => fromRoman('IIII')).toThrow(TypeError);
  });

  test("round-trip holds for all n in 1..3999", () => {
    for (let n = 1; n <= 3999; n++) {
      expect(fromRoman(toRoman(n))).toBe(n);
    }
  });
});
