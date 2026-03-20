// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { parseExpression, evaluateRange } from "../../src/lib/main.js";

describe("Range evaluator", () => {
  test("evaluating range -3.14:0.01:3.14 returns ~628 points", () => {
    const fn = parseExpression("y=Math.sin(x)");
    const points = evaluateRange("-3.14:0.01:3.14", fn);
    expect(points.length).toBeGreaterThanOrEqual(628);
    expect(points[0]).toHaveProperty("x");
    expect(points[0]).toHaveProperty("y");
  });
});
