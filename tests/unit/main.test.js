// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { main, getIdentity, name, version, description, parseExpression, evaluateExpressionOverRange, renderSVG, renderPNGFromSVG } from "../../src/lib/main.js";

describe("Main Output", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("Library Identity", () => {
  test("exports name, version, and description", () => {
    expect(typeof name).toBe("string");
    expect(typeof version).toBe("string");
    expect(typeof description).toBe("string");
    expect(name.length).toBeGreaterThan(0);
    expect(version).toMatch(/^\d+\.\d+\.\d+/);
  });

  test("getIdentity returns correct structure", () => {
    const identity = getIdentity();
    expect(identity).toEqual({ name, version, description });
  });
});

describe("Expression Parsing & Evaluation", () => {
  test("parseExpression returns a callable for 'y=Math.sin(x)'", () => {
    const fn = parseExpression('y=Math.sin(x)');
    expect(typeof fn).toBe('function');
    const val = fn(Math.PI);
    expect(Math.abs(val)).toBeLessThan(1e-10);
  });

  test("evaluateExpressionOverRange returns ~628 data points for -3.14:0.01:3.14", () => {
    const pts = evaluateExpressionOverRange('y=Math.sin(x)', '-3.14:0.01:3.14');
    expect(Array.isArray(pts)).toBe(true);
    expect(pts.length).toBeGreaterThan(600);
    expect(pts.length).toBeLessThan(700);
  });
});

describe("Rendering", () => {
  test("renderSVG produces svg with polyline and viewBox", () => {
    const series = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    const svg = renderSVG(series, { width: 200, height: 100 });
    expect(typeof svg).toBe('string');
    expect(svg).toContain('<polyline');
    expect(svg).toContain('viewBox');
  });

  test("renderPNGFromSVG returns PNG bytes (starts with PNG signature)", () => {
    const svg = renderSVG([{ x: 0, y: 0 }, { x: 1, y: 1 }]);
    const png = renderPNGFromSVG(svg);
    // In Node this should be a Buffer
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(png)) {
      expect(png.slice(0,8).toString('hex')).toBe('89504e470d0a1a0a');
    } else if (typeof png === 'string') {
      // base64 string starts with PNG signature when decoded
      const buf = Buffer.from(png, 'base64');
      expect(buf.slice(0,8).toString('hex')).toBe('89504e470d0a1a0a');
    } else {
      throw new Error('Unexpected PNG output type');
    }
  });
});
