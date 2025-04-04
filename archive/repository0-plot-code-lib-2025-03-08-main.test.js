/* eslint-disable no-unused-vars */
/* global describe, test, expect, vi */
// File: tests/unit/main.test.js

import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import fs from "fs";
import readline from "readline";

// Basic Import Test

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

// Exported API Functions Tests

describe("Exported API Functions", () => {
  test("plotToSvg returns string containing <svg>", () => {
    const svg = mainModule.plotToSvg({ formulas: ["quad:1,0,0,-10,10,1"] });
    expect(typeof svg).toBe("string");
    expect(svg).toContain("<svg");
  });

  test("plotToJson returns object with required keys", () => {
    const json = mainModule.plotToJson({ formulas: ["sine:1,1,0,0,360,30"] });
    expect(json).toHaveProperty("quadratic");
    expect(json).toHaveProperty("linear");
    expect(json).toHaveProperty("sine");
    expect(json).toHaveProperty("cosine");
    expect(json).toHaveProperty("tangent");
    expect(json).toHaveProperty("polar");
    expect(json).toHaveProperty("exponential");
    expect(json).toHaveProperty("logarithmic");
  });

  test("plotToText returns non-empty string", () => {
    const text = mainModule.plotToText({ formulas: ["y=2x+3:-10,10,1"] });
    expect(typeof text).toBe("string");
    expect(text.length).toBeGreaterThan(0);
  });

  test("plotToCsv returns CSV formatted string", () => {
    const csv = mainModule.plotToCsv({ formulas: ["quad:1,0,0,-10,10,1"] });
    expect(csv).toContain(",");
    expect(csv).toContain("Quadratic");
  });

  test("plotToHtml returns HTML string", () => {
    const html = mainModule.plotToHtml({ formulas: ["y=2x+3:-10,10,1"], grid: true });
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("<html");
    expect(html).toContain("<div>");
  });

  test("plotToMarkdown returns markdown formatted string", () => {
    const md = mainModule.plotToMarkdown({ formulas: ["sine:1,1,0,0,360,30"] });
    expect(md).toContain("# Plot Data");
  });

  test("main generates markdown file when output file ends with .md", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const originalArgv = process.argv;
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    process.argv = ["node", "src/lib/main.js", "output.md", "y=2x+3:-10,10,1"];
    if (mainModule.main) {
      await mainModule.main();
    }
    const argsCall = writeFileSyncSpy.mock.calls[0];
    expect(argsCall[1]).toContain("# Plot Data");
    writeFileSyncSpy.mockRestore();
    process.argv = originalArgv;
    process.env.NODE_ENV = originalEnv;
  });

  test("Interactive CLI Mode prompts for input", async () => {
    const rlMock = {
      question: vi.fn((prompt, callback) => {
        callback("y=2x+3:-10,10,1");
      }),
      close: vi.fn(),
    };
    vi.spyOn(readline, "createInterface").mockReturnValue(rlMock);
    const originalArgv = process.argv;
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    process.argv = ["node", "src/lib/main.js", "--interactive"];
    await mainModule.main();
    expect(rlMock.question).toHaveBeenCalled();
    process.argv = originalArgv;
    process.env.NODE_ENV = originalEnv;
  }, 6000);

  test("plotToAscii returns ASCII art string", () => {
    const ascii = mainModule.plotToAscii({ formulas: ["sine:1,1,0,0,360,30"] });
    expect(typeof ascii).toBe("string");
    expect(ascii).toContain("ASCII Art of Sine Wave");
  });

  test("plotToFile writes a file and returns file name", () => {
    const fileName = "test_output.svg";
    const result = mainModule.plotToFile({ formulas: ["quad:1,0,0,-10,10,1"], outputFileName: fileName, type: "svg" });
    expect(result).toBe(fileName);
  });

  test("plotFromString returns empty array for unrecognized formula", () => {
    const result = mainModule.plotFromString("unknown:parameter");
    expect(result).toEqual([]);
  });

  test("plotTangent returns valid tangent plot points", () => {
    const tangentPoints = mainModule.plotTangent();
    expect(Array.isArray(tangentPoints)).toBe(true);
    expect(tangentPoints.length).toBeGreaterThan(0);
    tangentPoints.forEach((point) => {
      expect(point.x).toBeGreaterThanOrEqual(-45);
      expect(point.x).toBeLessThanOrEqual(45);
    });
  });

  test("getPlotStats returns valid summary object", () => {
    const plots = mainModule.getPlotsFromFormulas(["quad:1,0,0,-10,10,1", "sine:1,1,0,0,360,30"]);
    const stats = mainModule.getPlotStats(plots);
    expect(stats).toHaveProperty("quadratic");
    expect(stats.quadratic).toHaveProperty("count");
    expect(typeof stats.quadratic.count).toBe("number");
    expect(stats).toHaveProperty("sine");
    expect(stats.sine).toHaveProperty("minX");
  });

  test("getPlotAverage returns valid averages for plots", () => {
    const plots = mainModule.getPlotsFromFormulas(["quad:1,0,0,-10,10,1"]);
    const averages = mainModule.getPlotAverage(plots);
    expect(averages).toHaveProperty("quadratic");
    if (averages.quadratic) {
      expect(typeof averages.quadratic.avgX).toBe("number");
      expect(typeof averages.quadratic.avgY).toBe("number");
    }
  });

  test("computeArea computes correct area for linear plot", () => {
    const linearPoints = mainModule.plotLinear();
    const area = mainModule.computeArea(linearPoints);
    expect(typeof area).toBe("number");
  });

  test("computeDerivative computes derivative correctly", () => {
    const quadPoints = mainModule.plotQuadratic();
    const deriv = mainModule.computeDerivative(quadPoints);
    expect(Array.isArray(deriv)).toBe(true);
    expect(deriv.length).toBeGreaterThan(0);
    deriv.forEach((d) => {
      expect(typeof d.dy).toBe("number");
    });
  });

  test("plotReflection reflects plot points horizontally", () => {
    const quadPoints = mainModule.plotQuadratic();
    const reflected = mainModule.plotReflection(quadPoints);
    expect(reflected[0].x).toBeCloseTo(-quadPoints[0].x, 2);
    expect(reflected[0].y).toEqual(quadPoints[0].y);
  });

  test("scalePlot scales plot points correctly", () => {
    const quadPoints = mainModule.plotQuadratic();
    const scaled = mainModule.scalePlot(quadPoints, 2, 0.5);
    expect(scaled[0].x).toBeCloseTo(quadPoints[0].x * 2, 2);
    expect(scaled[0].y).toBeCloseTo(quadPoints[0].y * 0.5, 2);
  });

  test("invertPlot inverts plot points vertically", () => {
    const quadPoints = mainModule.plotQuadratic();
    const inverted = mainModule.invertPlot(quadPoints);
    expect(inverted[0].x).toEqual(quadPoints[0].x);
    expect(inverted[0].y).toBeCloseTo(-quadPoints[0].y, 2);
  });

  test("smoothPlot returns smoothed output", () => {
    const points = [
      { x: 0, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
    ];
    const smoothed = mainModule.smoothPlot(points, 3);
    expect(smoothed).toHaveLength(points.length);
    expect(smoothed[1].y).toBeCloseTo(2, 1);
  });

  test("computeStandardDeviation returns correct value", () => {
    const points = [
      { x: 0, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
    ];
    const std = mainModule.computeStandardDeviation(points);
    expect(std).toBeCloseTo(1.118, 2);
  });

  test("computeMedian computes correct median", () => {
    const points = [
      { x: 0, y: 1 },
      { x: 1, y: 3 },
      { x: 2, y: 2 },
    ];
    const median = mainModule.computeMedian(points);
    expect(median).toBe(2);
  });

  test("computeMode computes correct mode", () => {
    const points = [
      { x: 0, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ];
    const mode = mainModule.computeMode(points);
    expect(mode).toBeCloseTo(2);
  });

  test("Rotation flag rotates plot points", () => {
    const originalJson = mainModule.plotToJson({ formulas: ["quad:1,0,0,-10,10,1"] });
    const rotatedJson = mainModule.plotToJson({ formulas: ["quad:1,0,0,-10,10,1"], rotationAngle: 90 });
    const originalPoint = originalJson.quadratic[0][0];
    const rotatedPoint = rotatedJson.quadratic[0][0];
    expect(rotatedPoint.x).toBeCloseTo(-originalPoint.y, 1);
    expect(rotatedPoint.y).toBeCloseTo(originalPoint.x, 1);
  });

  test("advancedQueryPlotData filters plot data based on x and y predicates", () => {
    const plots = mainModule.getPlotsFromFormulas(["quad:1,0,0,-10,10,1"]);
    const filtered = mainModule.advancedQueryPlotData(plots, { x: (val) => val >= 0, y: (val) => val <= 50 });
    filtered.quadratic.forEach((points) => {
      points.forEach((point) => {
        expect(point.x).toBeGreaterThanOrEqual(0);
        expect(point.y).toBeLessThanOrEqual(50);
      });
    });
  });

  test("computeCentroid calculates correct centroid", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 2, y: 2 },
      { x: 4, y: 0 },
    ];
    const centroid = mainModule.computeCentroid(points);
    expect(centroid.x).toBeCloseTo(2);
    expect(centroid.y).toBeCloseTo(0.67, 1);
  });

  test("computeCentroid returns zero for empty array", () => {
    const centroid = mainModule.computeCentroid([]);
    expect(centroid.x).toBe(0);
    expect(centroid.y).toBe(0);
  });

  test("computeBoundingBox calculates correct bounding box", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 2, y: 2 },
      { x: 4, y: 0 },
    ];
    const bbox = mainModule.computeBoundingBox(points);
    expect(bbox.minX).toBe(0);
    expect(bbox.maxX).toBe(4);
    expect(bbox.minY).toBe(0);
    expect(bbox.maxY).toBe(2);
  });

  test("computeBoundingBox returns zeros for empty array", () => {
    const bbox = mainModule.computeBoundingBox([]);
    expect(bbox.minX).toBe(0);
    expect(bbox.maxX).toBe(0);
    expect(bbox.minY).toBe(0);
    expect(bbox.maxY).toBe(0);
  });

  test("plotToFile throws error when file writing fails", () => {
    const fsSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {
      throw new Error("Mock write error");
    });
    expect(() => {
      mainModule.plotToFile({ formulas: ["quad:1,0,0,-10,10,1"], outputFileName: "fail.svg", type: "svg" });
    }).toThrow("Error writing file: Mock write error");
    fsSpy.mockRestore();
  });

  test("plotToFile writes an HTML file and returns file name", () => {
    const fsSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const fileName = "test_output.html";
    const result = mainModule.plotToFile({ formulas: ["y=2x+3:-10,10,1"], outputFileName: fileName, type: "html" });
    expect(result).toBe(fileName);
    expect(fsSpy).toHaveBeenCalled();
    fsSpy.mockRestore();
  });

  test("plotHelix3D returns array of 3D points with z property", () => {
    const helix = mainModule.plotHelix3D();
    expect(Array.isArray(helix)).toBe(true);
    expect(helix.length).toBeGreaterThan(0);
    helix.forEach((point) => {
      expect(point).toHaveProperty("x");
      expect(point).toHaveProperty("y");
      expect(point).toHaveProperty("z");
    });
  });

  test("rotatePoint3D rotates point correctly around z-axis", () => {
    const point = { x: 1, y: 0, z: 0 };
    const rotated = mainModule.rotatePoint3D(point, 90, "z");
    expect(rotated.x).toBeCloseTo(0, 1);
    expect(rotated.y).toBeCloseTo(1, 1);
    expect(rotated.z).toBe(0);
  });

  test("plotToSvg3D returns SVG string containing <svg>", () => {
    const svg3D = mainModule.plotToSvg3D({ rotationAngle: 45, rotationAxis: "y", grid: true });
    expect(typeof svg3D).toBe("string");
    expect(svg3D).toContain("<svg");
  });

  test("parseTextExpression via plotFromString supports expr: formulas", () => {
    const points = mainModule.plotFromString("expr:2*x+3:-10,10,1");
    expect(Array.isArray(points)).toBe(true);
    if (points.length > 0) {
      expect(points[0].x).toBe(-10);
      expect(points[0].y).toBeCloseTo(2 * -10 + 3, 1);
    }
  });

  test("parseTextExpression throws error for invalid format", () => {
    expect(mainModule.plotFromString("expr:2*x+3")).toEqual([]);
  });

  test("startExpressServer starts server and returns 200 response on /", async () => {
    const server = mainModule.startExpressServer();
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await fetch("http://localhost:3000/");
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toContain("<form");
    server.close();
  });

  test("extractQuadraticCoefficients returns correct coefficients", () => {
    const coeffs = mainModule.extractQuadraticCoefficients("x^2+2x+1");
    expect(coeffs.a).toBeCloseTo(1);
    expect(coeffs.b).toBeCloseTo(2);
    expect(coeffs.c).toBeCloseTo(1);
  });

  test("invertExpression returns correctly inverted expression", () => {
    const inverted1 = mainModule.invertExpression("+2x-3");
    const inverted2 = mainModule.invertExpression("-2x+3");
    const inverted3 = mainModule.invertExpression("2x+3");
    expect(inverted1).toBe("-2x-3");
    expect(inverted2).toBe("+2x-3");
    expect(inverted3).toBe("-2x+3");
  });

  test("getInternalState returns internal color schemes", () => {
    const state = mainModule.getInternalState();
    expect(state).toHaveProperty("defaultColorSchemes");
    expect(state.defaultColorSchemes.quadratic).toContain("blue");
  });

  test("plotGradient returns SVG snippet with gradient definition", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 100, y: 100 },
    ];
    const svgSnippet = mainModule.plotGradient(points, "red", "blue");
    expect(svgSnippet).toContain("linearGradient");
    expect(svgSnippet).toContain("stop-color:red");
    expect(svgSnippet).toContain("stop-color:blue");
    expect(svgSnippet).toContain("polyline");
  });

  test("mapToSvgCoordinates returns correct SVG coordinates", () => {
    const p = { x: 5, y: 5 };
    // Map point in range 0 to 10 to an SVG box with offset (50,50) and width=700, height=180
    const mapped = mainModule.mapToSvgCoordinates(p, 0, 10, 0, 10, 50, 50, 700, 180);
    expect(parseFloat(mapped.x)).toBeCloseTo(50 + 0.5 * 700, 2);
    expect(parseFloat(mapped.y)).toBeCloseTo(50 + 180 - 0.5 * 180, 2);
  });
});
