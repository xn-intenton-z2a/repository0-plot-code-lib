import { describe, test, expect } from "vitest";
import {
  parseArgs,
  parseRange,
  generateData,
  generateSVG,
  main,
} from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect({ parseArgs, parseRange, generateData, generateSVG, main }).not.toBeNull();
  });
});

describe("parseArgs", () => {
  test("should parse valid CLI args", () => {
    const args = [
      "--expression",
      "x*2",
      "--range",
      "x=0:5:2",
      "--output",
      "out.svg",
    ];
    const parsed = parseArgs(args);
    expect(parsed).toEqual({
      expression: "x*2",
      range: "x=0:5:2",
      output: "out.svg",
    });
  });
});

describe("parseRange", () => {
  test("should parse range string", () => {
    const range = "x=0:5:2";
    const result = parseRange(range);
    expect(result).toEqual({ varName: "x", min: 0, max: 5, step: 2 });
  });
  test("should default step to 1", () => {
    const range = "x=1:3";
    const result = parseRange(range);
    expect(result).toEqual({ varName: "x", min: 1, max: 3, step: 1 });
  });
});

describe("generateData", () => {
  test("should generate data points", () => {
    const exp = "x*2";
    const rangeObj = { varName: "x", min: 0, max: 4, step: 2 };
    const data = generateData(exp, rangeObj);
    expect(data.xValues).toEqual([0, 2, 4]);
    expect(data.yValues).toEqual([0, 4, 8]);
  });
});

describe("generateSVG", () => {
  test("should generate SVG with expected tags and points", () => {
    const data = { xValues: [0, 1], yValues: [0, 2] };
    const svg = generateSVG(data, { width: 100, height: 50, margin: 5 });
    expect(svg).toContain('<svg');
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain('<polyline');
    expect(svg).toMatch(/points="[^"]+"/);
  });
});

describe("Default main", () => {
  test("should terminate without error on no args", () => {
    process.argv = ["node", "src/lib/main.js"];
    expect(() => main()).not.toThrow();
  });
});
