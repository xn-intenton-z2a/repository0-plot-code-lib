// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { main, getIdentity, name, version, description, parseExpression, evaluateRange, loadCsvTimeSeries, renderSVG, svgToPng, savePlot } from "../../src/lib/main.js";
import { existsSync, readFileSync } from "fs";
import { execSync } from "child_process";

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

describe("Plotting API", () => {
  test("parseExpression returns a function and evaluates Math.sin", () => {
    const fn = parseExpression("y=Math.sin(x)");
    expect(typeof fn).toBe("function");
    expect(fn(0)).toBeCloseTo(0);
    expect(fn(Math.PI / 2)).toBeCloseTo(1);
  });

  test("evaluateRange produces many points (~628) for -3.14:0.01:3.14", () => {
    const fn = parseExpression("y=Math.sin(x)");
    const pts = evaluateRange("-3.14:0.01:3.14", fn);
    expect(pts.length).toBeGreaterThan(600);
    expect(pts[0]).toHaveProperty("x");
    expect(pts[0]).toHaveProperty("y");
  });

  test("loadCsvTimeSeries reads a CSV file", async () => {
    const rows = await loadCsvTimeSeries("tests/tmp/sample.csv");
    expect(rows.length).toBe(3);
    expect(rows[0]).toHaveProperty("time");
    expect(rows[0]).toHaveProperty("value");
    expect(typeof rows[0].value).toBe("number");
  });

  test("renderSVG returns valid SVG with viewBox and polyline", () => {
    const fn = parseExpression("y=x*x");
    const pts = evaluateRange("0:1:10", fn);
    const svg = renderSVG(pts, { width: 200, height: 100 });
    expect(typeof svg).toBe("string");
    expect(svg).toContain("viewBox");
    expect(svg).toContain("<polyline");
  });

  test("svgToPng returns a Buffer that starts with PNG magic bytes", () => {
    const fn = parseExpression("y=x");
    const pts = evaluateRange("0:1:2", fn);
    const svg = renderSVG(pts);
    const png = svgToPng(svg);
    expect(Buffer.isBuffer(png)).toBe(true);
    const header = png.slice(0, 8).toString('hex');
    expect(header).toBe('89504e470d0a1a0a');
  });

  test("savePlot writes files and CLI produces output file", async () => {
    const fn = parseExpression("y=x");
    const pts = evaluateRange("0:1:10", fn);
    const svg = renderSVG(pts);
    await savePlot("tests/tmp/out_generated.svg", svg);
    expect(existsSync("tests/tmp/out_generated.svg")).toBe(true);

    const help = execSync("node src/lib/main.js --help", { encoding: 'utf8' });
    expect(help).toContain('Usage');

    execSync("node src/lib/main.js --expression \"y=Math.sin(x)\" --range \"-3.14:0.01:3.14\" --file tests/tmp/cli_output.svg");
    expect(existsSync("tests/tmp/cli_output.svg")).toBe(true);
  });
});
