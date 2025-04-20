import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, generateTimeSeriesData, serializeTimeSeries } from "@src/lib/main.js";
import fs from "fs";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main([]);
  });
});

describe("Plot Generation", () => {
  test("should generate dummy SVG file when valid parameters are provided and file extension is not .csv", () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-1:1",
      "--file", "output.svg"
    ];
    const expectedSVG = "<svg><text x='10' y='20'>Expression: y=sin(x)</text><text x='10' y='40'>Range: x=-1:1</text></svg>";
    main(args);
    expect(writeFileSyncSpy).toHaveBeenCalledWith("output.svg", expectedSVG);
    writeFileSyncSpy.mockRestore();
  });
});

describe("Time Series Data Generation", () => {
  test("should generate at least 10 data points with numeric x and y", () => {
    const data = generateTimeSeriesData("y=sin(x)", "x=0:6.28");
    expect(data.length).toBeGreaterThanOrEqual(10);
    for (const point of data) {
      expect(typeof point.x).toBe("number");
      expect(typeof point.y).toBe("number");
      expect(point.y).toBeGreaterThanOrEqual(-1);
      expect(point.y).toBeLessThanOrEqual(1);
    }
  });
});

describe("Serialize Time Series Data", () => {
  test("should produce a CSV string with header and data rows", () => {
    const sampleData = [
      { x: 0, y: 0 },
      { x: 1, y: 0.8415 },
      { x: 2, y: 0.9093 }
    ];
    const csvOutput = serializeTimeSeries(sampleData);
    const lines = csvOutput.trim().split("\n");
    expect(lines[0]).toBe("x,y");
    expect(lines.length).toBe(sampleData.length + 1);
  });
});

describe("CLI CSV Generation", () => {
  test("should print CSV content to stdout when --file ends with .csv", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=0:6.28",
      "--file", "output.csv"
    ];
    main(args);
    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.mock.calls[0][0];
    expect(output.startsWith("x,y")).toBe(true);
    logSpy.mockRestore();
  });
});
