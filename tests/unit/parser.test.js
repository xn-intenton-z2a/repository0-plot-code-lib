// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { parseExpression } from "../../src/lib/main.js";

describe("Expression parser", () => {
  test("parsing 'y=Math.sin(x)' returns a callable function", () => {
    const fn = parseExpression("y=Math.sin(x)");
    expect(typeof fn).toBe("function");
    expect(Math.abs(fn(0))).toBeLessThan(1e-9);
    expect(Math.abs(fn(Math.PI / 2) - 1)).toBeLessThan(1e-9);
  });
});
