// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { parseExpression, evaluateRange, renderSvg, svgToPng, loadCsvTimeSeries } from "../../src/lib/main.js";
import { writeFileSync, unlinkSync, existsSync } from "fs";

describe("Plotting library", () => {
  test("parseExpression returns a callable function", () => {
    const fn = parseExpression("y=Math.sin(x)");
    expect(typeof fn).toBe("function");
    expect(fn(0)).toBeCloseTo(0);
    expect(fn(Math.PI / 2)).toBeCloseTo(1);
  });

  test("evaluateRange returns a sampled series (~628 points)", () => {
    const fn = parseExpression("y=Math.sin(x)");
    const series = evaluateRange("-3.14:0.01:3.14", fn);
    expect(series.length).toBeGreaterThan(600);
    expect(series.length).toBeLessThan(700);
  });

  test("renderSvg outputs SVG with polyline and viewBox", () => {
    const fn = parseExpression("y=x");
    const series = evaluateRange("0:1:10", fn);
    const svg = renderSvg(series);
    expect(typeof svg).toBe("string");
    expect(svg).toContain("<polyline");
    expect(svg).toContain("viewBox");
  });

  test("svgToPng produces a buffer starting with PNG magic bytes", () => {
    const png = svgToPng('<svg></svg>');
    expect(Buffer.isBuffer(png)).toBe(true);
    const sig = png.slice(0, 8);
    expect(sig).toEqual(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  });

  test("loadCsvTimeSeries parses CSV files", () => {
    const tmp = "tests/tmp/test_series.csv";
    const csv = "time,value\n1,10\n2,20\n3,30\n";
    writeFileSync(tmp, csv, "utf8");
    const series = loadCsvTimeSeries(tmp);
    try {
      expect(series.length).toBe(3);
      expect(series[0]).toEqual({ time: 1, value: 10 });
    } finally {
      try { unlinkSync(tmp); } catch {};
    }
  });
});
