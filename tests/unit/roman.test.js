// SPDX-License-Identifier: MIT
// Unit tests for Roman numeral conversion
import { describe, test, expect } from "vitest";
import { toRoman, fromRoman } from "../../src/lib/main.js";

describe("Roman numerals", () => {
  test("1994 -> MCMXCIV", () => {
    expect(toRoman(1994)).toBe("MCMXCIV");
  });

  test("MCMXCIV -> 1994", () => {
    expect(fromRoman("MCMXCIV")).toBe(1994);
  });

  test("4 -> IV", () => {
    expect(toRoman(4)).toBe("IV");
  });

  test("boundaries 1 and 3999", () => {
    expect(toRoman(1)).toBe("I");
    expect(toRoman(3999)).toBe("MMMCMXCIX");
  });

  test("subtractive cases", () => {
    const cases = [[4, "IV"], [9, "IX"], [40, "XL"], [90, "XC"], [400, "CD"], [900, "CM"]];
    for (const [n, s] of cases) {
      expect(toRoman(n)).toBe(s);
      expect(fromRoman(s)).toBe(n);
    }
  });

  test("invalid Roman strings throw TypeError", () => {
    expect(() => fromRoman("IIII")).toThrow(TypeError);
    expect(() => fromRoman("VV")).toThrow(TypeError);
    expect(() => fromRoman("IL")).toThrow(TypeError);
    expect(() => fromRoman("IC")).toThrow(TypeError);
    expect(() => fromRoman("XM")).toThrow(TypeError);
  });

  test("non-string inputs for fromRoman throw TypeError", () => {
    expect(() => fromRoman(123)).toThrow(TypeError);
    expect(() => fromRoman(null)).toThrow(TypeError);
  });

  test("out of range numbers throw RangeError", () => {
    expect(() => toRoman(0)).toThrow(RangeError);
    expect(() => toRoman(4000)).toThrow(RangeError);
  });

  test("non-integer numbers throw TypeError", () => {
    expect(() => toRoman(3.14)).toThrow(TypeError);
    expect(() => toRoman(Number.NaN)).toThrow(TypeError);
  });

  test("round-trip property holds for 1..3999", () => {
    for (let n = 1; n <= 3999; n++) {
      expect(fromRoman(toRoman(n))).toBe(n);
    }
  });
});
