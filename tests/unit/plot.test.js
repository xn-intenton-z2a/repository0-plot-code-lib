// SPDX-License-Identifier: MIT
// Tests for plotting library
import { describe, test, expect } from "vitest";
import { execFileSync } from "child_process";
import { readFileSync, existsSync, unlinkSync } from "fs";
import { parseExpression, evaluateRange, renderSvg, renderPng, getUsage } from "../../src/lib/main.js";

describe("Expression parsing and evaluation", () => {
  test("parseExpression returns a callable function for 'y=Math.sin(x)'", () => {
    const fn = parseExpression("y=Math.sin(x)");
    expect(typeof fn).toBe("function");
    expect(fn(0)).toBeCloseTo(0);
    expect(fn(Math.PI / 2)).toBeCloseTo(1, 5);
  });

  test("evaluateRange returns approximately 628 points for -3.14:0.01:3.14", () => {
    const pts = evaluateRange("y=Math.sin(x)", "-3.14:0.01:3.14");
    expect(Array.isArray(pts)).toBe(true);
    expect(pts.length).toBeGreaterThan(600);
    expect(pts.length).toBeLessThan(650);
    expect(pts[0]).toHaveProperty("x");
    expect(pts[0]).toHaveProperty("y");
  });
});

describe("Rendering", () => {
  test("renderSvg produces SVG containing <polyline> and viewBox", () => {
    const pts = evaluateRange("y=x", "0:1:10");
    const svg = renderSvg(pts, { width: 200, height: 100 });
    expect(typeof svg).toBe("string");
    expect(svg).toContain("<polyline");
    expect(svg).toContain("viewBox");
  });

  test("renderPng returns bytes that start with PNG magic bytes", () => {
    const buf = renderPng([]);
    expect(Buffer.isBuffer(buf)).toBe(true);
    const magic = buf.slice(0, 8);
    expect(magic.equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe(true);
  });
});

describe("CLI", () => {
  test("--help prints usage information", () => {
    const out = execFileSync(process.execPath, ["src/lib/main.js", "--help"], { encoding: "utf8" });
    expect(out).toContain("Usage:");
  });

  test("CLI --expression --range --file creates an SVG file", () => {
    const outfile = "test-output.svg";
    try {
      execFileSync(process.execPath, ["src/lib/main.js", "--expression", "y=Math.sin(x)", "--range", "-3.14:0.1:3.14", "--file", outfile], { encoding: "utf8" });
      expect(existsSync(outfile)).toBe(true);
      const content = readFileSync(outfile, "utf8");
      expect(content).toContain("<svg");
    } finally {
      if (existsSync(outfile)) unlinkSync(outfile);
    }
  });
});
