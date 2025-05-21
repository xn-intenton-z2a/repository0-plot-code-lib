import { describe, test, expect } from "vitest";
import { main } from "@src/lib/main.js";

describe("Main Module", () => {
  test("should be defined", () => {
    expect(main).toBeDefined();
  });

  test("should return undefined when called without args", () => {
    expect(main()).toBeUndefined();
  });
});

describe("Time Series Generation", () => {
  test("default steps should be 100 and default y=x", () => {
    const result = main(["-e", "x", "-r", "x=0:1"]);
    expect(Array.isArray(result.points)).toBe(true);
    expect(result.points).toHaveLength(101);
    expect(result.points[0]).toEqual({ x: 0, y: 0 });
    expect(result.points[100]).toEqual({ x: 1, y: 1 });
  });

  test("custom steps should match x^2 series", () => {
    const result = main(["--expression", "x^2", "--range", "x=0:3:3"]);
    const pts = result.points;
    expect(pts).toHaveLength(4);
    expect(pts[0]).toEqual({ x: 0, y: 0 });
    expect(pts[1]).toEqual({ x: 1, y: 1 });
    expect(pts[2]).toEqual({ x: 2, y: 4 });
    expect(pts[3]).toEqual({ x: 3, y: 9 });
  });

  test("sin(x) values approximate correctly", () => {
    const result = main(["-e", "sin(x)", "-r", "x=0:3:3"]);
    const pts = result.points;
    expect(pts).toHaveLength(4);
    expect(pts[0].y).toBeCloseTo(Math.sin(0), 12);
    expect(pts[1].y).toBeCloseTo(Math.sin(1), 12);
    expect(pts[2].y).toBeCloseTo(Math.sin(2), 12);
    expect(pts[3].y).toBeCloseTo(Math.sin(3), 12);
  });
});