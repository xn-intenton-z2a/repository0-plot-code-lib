// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { toRoman, fromRoman } from "../../src/lib/main.js";

describe("Roman numeral conversions", () => {
  test("1 -> I", () => {
    expect(toRoman(1)).toBe("I");
  });

  test("3999 -> MMMCMXCIX", () => {
    expect(toRoman(3999)).toBe("MMMCMXCIX");
  });

  test("1994 -> MCMXCIV and back", () => {
    expect(toRoman(1994)).toBe("MCMXCIV");
    expect(fromRoman("MCMXCIV")).toBe(1994);
  });

  test("subtractive cases", () => {
    expect(toRoman(4)).toBe("IV");
    expect(toRoman(9)).toBe("IX");
    expect(toRoman(40)).toBe("XL");
    expect(toRoman(90)).toBe("XC");
    expect(toRoman(400)).toBe("CD");
    expect(toRoman(900)).toBe("CM");
  });

  test("invalid numbers throw RangeError", () => {
    expect(() => toRoman(0)).toThrow(RangeError);
    expect(() => toRoman(4000)).toThrow(RangeError);
  });

  test("malformed strings throw TypeError", () => {
    expect(() => fromRoman("IIII")).toThrow(TypeError);
    expect(() => fromRoman("IC")).toThrow(TypeError);
    expect(() => fromRoman("")).toThrow(TypeError);
  });

  test("round-trip property for 1..3999", () => {
    for (let n = 1; n <= 3999; n++) {
      expect(fromRoman(toRoman(n))).toBe(n);
    }
  });
});
