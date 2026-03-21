// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { fizzBuzz, fizzBuzzSingle } from "../../src/lib/main.js";

describe("FizzBuzz Core", () => {
  test("fizzBuzzSingle(3) returns 'Fizz'", () => {
    expect(fizzBuzzSingle(3)).toBe("Fizz");
  });

  test("fizzBuzzSingle(5) returns 'Buzz'", () => {
    expect(fizzBuzzSingle(5)).toBe("Buzz");
  });

  test("fizzBuzzSingle(15) returns 'FizzBuzz'", () => {
    expect(fizzBuzzSingle(15)).toBe("FizzBuzz");
  });

  test("fizzBuzzSingle(7) returns '7'", () => {
    expect(fizzBuzzSingle(7)).toBe("7");
  });

  test("fizzBuzz(15) returns correct 15-element array ending with 'FizzBuzz'", () => {
    const expected = [
      "1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"
    ];
    expect(fizzBuzz(15)).toEqual(expected);
  });

  test("fizzBuzz(0) returns []", () => {
    expect(fizzBuzz(0)).toEqual([]);
  });

  test("fizzBuzz negative throws RangeError", () => {
    expect(() => fizzBuzz(-1)).toThrow(RangeError);
  });

  test("fizzBuzz non-integer throws TypeError", () => {
    expect(() => fizzBuzz(2.5)).toThrow(TypeError);
  });

  test("fizzBuzzSingle non-integer throws TypeError", () => {
    expect(() => fizzBuzzSingle(3.1)).toThrow(TypeError);
  });

  test("fizzBuzzSingle negative throws RangeError", () => {
    expect(() => fizzBuzzSingle(-3)).toThrow(RangeError);
  });
});
