// SPDX-License-Identifier: MIT
import { describe, test, expect, vi } from "vitest";
import fs from "fs";
import path from "path";
import {
  parseExpression,
  evaluateRange,
  renderSVG,
  renderPNG,
  main,
  usage,
  savePlot,
} from "../../src/lib/main.js";

describe("Expression parsing and range evaluation", () => {
  test("parsing 'y=Math.sin(x)' returns a callable function", () => {
    const fn = parseExpression("y=Math.sin(x)");
    expect(typeof fn).toBe("function");
    expect(fn(0)).toBeCloseTo(0);
  });

  test("evaluating -3.14:0.01:3.14 returns around 628 points", () => {
    const fn = parseExpression("y=Math.sin(x)");
    const pts = evaluateRange("-3.14:0.01:3.14", fn);
    // expected approximately (6.28 / 0.01) ~= 628
    expect(pts.length).toBeGreaterThan(600);
    expect(pts.length).toBeLessThan(660);
    expect(pts[0]).toHaveProperty("x");
    expect(pts[0]).toHaveProperty("y");
  });
});

describe("Rendering", () => {
  const simplePoints = [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 0 },
  ];

  test("SVG output contains a <polyline> and viewBox attribute", () => {
    const svg = renderSVG(simplePoints, { width: 200, height: 100 });
    expect(svg).toContain("<polyline");
    expect(svg).toContain("viewBox");
  });

  test("PNG output starts with PNG magic bytes", () => {
    const buf = renderPNG(simplePoints);
    expect(buf.slice(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))).toBe(true);
  });
});

describe("CLI behavior", () => {
  test("--help prints usage information", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--help"]);
    expect(log).toHaveBeenCalled();
    log.mockRestore();
  });

  test("CLI can write an SVG file when given --expression --range --file", () => {
    const outDir = path.join("tests", "tmp");
    fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, "test-output.svg");
    if (fs.existsSync(outFile)) fs.unlinkSync(outFile);
    // run main with args
    main(["--expression", "y=Math.sin(x)", "--range", "0:0.5:3.14", "--file", outFile]);
    expect(fs.existsSync(outFile)).toBe(true);
    const content = fs.readFileSync(outFile, "utf8");
    expect(content).toContain("<svg");
    // cleanup
    fs.unlinkSync(outFile);
  });

  test("savePlot writes PNG and SVG based on extension", () => {
    const outDir = path.join("tests", "tmp");
    fs.mkdirSync(outDir, { recursive: true });
    const svgFile = path.join(outDir, "save-test.svg");
    const pngFile = path.join(outDir, "save-test.png");
    const pts = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    if (fs.existsSync(svgFile)) fs.unlinkSync(svgFile);
    if (fs.existsSync(pngFile)) fs.unlinkSync(pngFile);
    savePlot(pts, svgFile);
    savePlot(pts, pngFile);
    expect(fs.existsSync(svgFile)).toBe(true);
    expect(fs.existsSync(pngFile)).toBe(true);
    const pngBuf = fs.readFileSync(pngFile);
    expect(pngBuf.slice(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))).toBe(true);
    fs.unlinkSync(svgFile);
    fs.unlinkSync(pngFile);
  });
});
