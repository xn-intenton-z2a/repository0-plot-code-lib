// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { existsSync, readFileSync, unlinkSync } from "fs";
import { parseExpression, evaluateRange, renderSVG, svgToPng, main } from "../../src/lib/main.js";

const OUT_SVG = "tests/unit/out.svg";
const OUT_PNG = "tests/unit/out.png";
const SAMPLE_CSV = "tests/unit/sample.csv";

describe("Plotting core", () => {
  afterEach(() => {
    try { if (existsSync(OUT_SVG)) unlinkSync(OUT_SVG); } catch (e) {}
    try { if (existsSync(OUT_PNG)) unlinkSync(OUT_PNG); } catch (e) {}
  });

  test("parseExpression returns a callable function", () => {
    const f = parseExpression('y=Math.sin(x)');
    expect(typeof f).toBe('function');
    expect(Math.abs(f(0) - 0)).toBeLessThan(1e-9);
  });

  test("evaluateRange produces ~628 points for -3.14:0.01:3.14", () => {
    const f = parseExpression('y=Math.sin(x)');
    const pts = evaluateRange(f, '-3.14:0.01:3.14');
    // Accept a small tolerance around 628
    expect(pts.length).toBeGreaterThan(600);
    expect(pts.length).toBeLessThan(660);
    // sample a couple values
    expect(typeof pts[0].x).toBe('number');
    expect(typeof pts[0].y).toBe('number');
  });

  test("renderSVG returns SVG string with polyline and viewBox", () => {
    const data = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    const svg = renderSVG(data);
    expect(svg).toContain('<polyline');
    expect(svg).toContain('viewBox=');
  });

  test("svgToPng returns PNG bytes starting with PNG magic bytes", async () => {
    const svg = '<svg></svg>';
    const png = await svgToPng(svg);
    const sig = Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]);
    expect(Buffer.isBuffer(png)).toBe(true);
    expect(png.slice(0,8)).toEqual(sig);
  });

  test("CLI --help prints usage", async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['--help']);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("CLI expression+range writes an SVG file", async () => {
    await main(['--expression', 'y=Math.sin(x)', '--range', '-3.14:0.01:3.14', '--file', OUT_SVG]);
    expect(existsSync(OUT_SVG)).toBe(true);
    const content = readFileSync(OUT_SVG, 'utf8');
    expect(content).toContain('<polyline');
  });

  test("CLI csv -> png writes a PNG file", async () => {
    // create sample CSV file if not present
    expect(existsSync(SAMPLE_CSV)).toBe(true);
    await main(['--csv', SAMPLE_CSV, '--file', OUT_PNG]);
    expect(existsSync(OUT_PNG)).toBe(true);
    const buf = readFileSync(OUT_PNG);
    const sig = Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]);
    expect(buf.slice(0,8)).toEqual(sig);
  });
});
