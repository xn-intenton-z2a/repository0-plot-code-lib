import { describe, test, expect } from "vitest";
import { parseRange, generateTimeSeries } from "@src/lib/main.js";

describe("parseRange", () => {
  test("parses range without step", () => {
    const { start, end, step } = parseRange("x=0:5");
    expect(start).toBe(0);
    expect(end).toBe(5);
    expect(step).toBe(1);
  });

  test("parses range with step", () => {
    const { start, end, step } = parseRange("x=-1:1:0.5");
    expect(start).toBe(-1);
    expect(end).toBe(1);
    expect(step).toBe(0.5);
  });

  test("throws on invalid format", () => {
    expect(() => parseRange("0:1:2")).toThrow(/Invalid range specification/);
    expect(() => parseRange("x=0:one:2")).toThrow(/non-numeric/);
    expect(() => parseRange("x=0:5:0")).toThrow(/Step cannot be zero/);
  });
});

describe("generateTimeSeries - linear expression", () => {
  test("x*2+1 over x=0:3", () => {
    const series = generateTimeSeries("x*2+1", "x=0:3");
    expect(series).toHaveLength(4);
    expect(series[0]).toEqual({ x: 0, y: 1 });
    expect(series[3]).toEqual({ x: 3, y: 7 });
  });
});

describe("generateTimeSeries - trigonometric expression", () => {
  test("sin(x) over x=0:3.14:1", () => {
    const series = generateTimeSeries("sin(x)", "x=0:3.14:1");
    expect(series).toHaveLength(4);
    expect(series[0].y).toBeCloseTo(0, 5);
    expect(series[1].y).toBeCloseTo(Math.sin(1), 5);
  });
});

describe("generateTimeSeries - error cases", () => {
  test("empty expression", () => {
    expect(() => generateTimeSeries("", "x=0:1")).toThrow(/Expression must be a non-empty string/);
  });

  test("malformed range", () => {
    expect(() => generateTimeSeries("x", "0--1")).toThrow(/Range must match/);
  });
});
