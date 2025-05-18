import { describe, test, expect } from "vitest";
import fs from "fs";
import os from "os";
import path from "path";
import {
  parseArgs,
  parseRange,
  generateData,
  generateSVG,
  main,
  parseInputFile,
  convertSVGtoPNG,
  generateCSV,
  generateJSON,
} from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect({
      parseArgs,
      parseRange,
      generateData,
      generateSVG,
      main,
      generateCSV,
      generateJSON,
    }).not.toBeNull();
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
  test("should parse --format flag", () => {
    const args = ["--format", "csv"];
    const parsed = parseArgs(args);
    expect(parsed.format).toBe("csv");
  });
  test("should alias --png as boolean and warn on format assignment", () => {
    const args = ["--png"];
    const parsed = parseArgs(args);
    expect(parsed.png).toBe(true);
  });
  test("should parse serve and port flags", () => {
    const args = ["--serve", "--port", "4000"];
    const parsed = parseArgs(args);
    expect(parsed.serve).toBe(true);
    expect(parsed.port).toBe(4000);
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

describe("generateCSV", () => {
  test("should generate CSV string correctly", () => {
    const data = { xValues: [1, 2], yValues: [3, 4] };
    const csv = generateCSV(data);
    expect(csv).toBe("x,y\n1,3\n2,4");
  });
  test("should throw on empty data", () => {
    expect(() => generateCSV({ xValues: [], yValues: [] })).toThrow("No data points available");
  });
});

describe("generateJSON", () => {
  test("should generate JSON string correctly", () => {
    const data = { xValues: [1], yValues: [2] };
    const jsonStr = generateJSON(data);
    expect(jsonStr).toBe(JSON.stringify(data));
  });
});

describe("Default main", () => {
  test("should terminate without error on no args", () => {
    process.argv = ["node", "src/lib/main.js"];
    expect(() => main()).not.toThrow();
  });
});

describe("parseInputFile", () => {
  test("should parse CSV input file", () => {
    const tmp = path.join(os.tmpdir(), "test-input.csv");
    fs.writeFileSync(tmp, "x,y\n1,2\n3,4\n");
    const data = parseInputFile(tmp);
    expect(data).toEqual({ xValues: [1, 3], yValues: [2, 4] });
    fs.unlinkSync(tmp);
  });

  test("should parse JSON input file with object array", () => {
    const tmp = path.join(os.tmpdir(), "test-input.json");
    const arr = [{ x: 0, y: 1 }, { x: 2, y: 3 }];
    fs.writeFileSync(tmp, JSON.stringify(arr));
    const data = parseInputFile(tmp);
    expect(data).toEqual({ xValues: [0, 2], yValues: [1, 3] });
    fs.unlinkSync(tmp);
  });

  test("should throw on unsupported format", () => {
    const tmp = path.join(os.tmpdir(), "test-input.txt");
    fs.writeFileSync(tmp, "foo");
    expect(() => parseInputFile(tmp)).toThrow("Unsupported input format");
    fs.unlinkSync(tmp);
  });
});

describe("convertSVGtoPNG", () => {
  test("should convert SVG to PNG buffer", async () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10"/></svg>';
    const buffer = await convertSVGtoPNG(svg);
    expect(buffer.slice(0, 8)).toEqual(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  });
});
