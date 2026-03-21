// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { intToRoman, romanToInt } from "../../src/lib/main.js";

describe("Roman numeral conversions", () => {
  test("1994 -> MCMXCIV", () => {
    expect(intToRoman(1994)).toBe("MCMXCIV");
  });

  test("MCMXCIV -> 1994", () => {
    expect(romanToInt("MCMXCIV")).toBe(1994);
  });

  test("4 -> IV", () => {
    expect(intToRoman(4)).toBe("IV");
  });

  test("subtractive cases", () => {
    expect(intToRoman(9)).toBe("IX");
    expect(intToRoman(40)).toBe("XL");
    expect(intToRoman(90)).toBe("XC");
    expect(intToRoman(400)).toBe("CD");
    expect(intToRoman(900)).toBe("CM");
  });

  test("round-trip for 1..3999", () => {
    for (let i = 1; i <= 3999; i++) {
      const r = intToRoman(i);
      expect(romanToInt(r)).toBe(i);
    }
  }, 20000);

  test("out of range throws RangeError", () => {
    expect(() => intToRoman(0)).toThrow(RangeError);
    expect(() => intToRoman(4000)).toThrow(RangeError);
  });

  test("invalid roman throws TypeError", () => {
    expect(() => romanToInt("IIII")).toThrow(TypeError);
    expect(() => romanToInt("A")).toThrow(TypeError);
    expect(() => romanToInt("mcmxcivish")).toThrow(TypeError);
  });

  test("non-integer input throws TypeError", () => {
    expect(() => intToRoman(3.14)).toThrow(TypeError);
    expect(() => intToRoman("1000")).toThrow(TypeError);
  });
});
