// SPDX-License-Identifier: MIT
// tests/unit/plot.pipeline.test.js
import { describe, test, expect } from "vitest";
import { execSync } from "child_process";
import { existsSync, readFileSync, mkdirSync } from "fs";
import path from "path";

import { parseExpression, evaluateRange, renderSeriesToSvg, renderPng, runCli } from "../../src/lib/main.js";

describe("Plot pipeline", () => {
  test("parseExpression returns a callable function for 'y=Math.sin(x)'", () => {
    const fn = parseExpression("y=Math.sin(x)");
    expect(typeof fn).toBe("function");
    const v = fn(0);
    expect(Math.abs(v)).toBeLessThan(1e-12);
  });

  test("evaluateRange over -3.14:0.01:3.14 returns ~629 points", () => {
    const fn = parseExpression("y=Math.sin(x)");
    const series = evaluateRange(fn, -3.14, 0.01, 3.14);
    // Expect roughly 628-630 points (inclusive)
    expect(series.length).toBeGreaterThan(600);
    expect(series.length).toBeLessThan(700);
  });

  test("renderSeriesToSvg contains <polyline> and viewBox", () => {
    const fn = parseExpression("y=Math.sin(x)");
    const series = evaluateRange(fn, -1, 0.5, 1);
    const svg = renderSeriesToSvg(series);
    expect(svg).toContain("<polyline");
    expect(svg).toContain("viewBox=");
  });

  test("renderPng produces bytes starting with PNG magic", () => {
    const fn = parseExpression("y=Math.sin(x)");
    const series = evaluateRange(fn, -1, 0.5, 1);
    const svg = renderSeriesToSvg(series);
    const png = renderPng(svg);
    expect(png).toBeInstanceOf(Buffer);
    expect(png[0]).toBe(0x89);
    expect(png[1]).toBe(0x50);
    expect(png[2]).toBe(0x4E);
    expect(png[3]).toBe(0x47);
  });

  test("CLI --expression --range --file writes an SVG file and --help prints usage", () => {
    const tmpDir = path.join("tests", "tmp");
    try { mkdirSync(tmpDir, { recursive: true }); } catch (e) {}
    const out = path.join(tmpDir, "out.svg");
    // Run CLI as a child process to produce a file
    execSync(`node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file ${out}`);
    expect(existsSync(out)).toBe(true);
    const content = readFileSync(out, "utf8");
    expect(content).toContain("<svg");

    // Help
    const help = execSync("node src/lib/main.js --help", { encoding: "utf8" });
    expect(help).toContain("--expression");
    expect(help).toContain("--range");
  });
});
