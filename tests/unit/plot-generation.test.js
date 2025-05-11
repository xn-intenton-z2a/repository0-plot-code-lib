import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { main, generateSeries, serializeJson, serializeCsv } from "@src/lib/main.js";

describe("CLI Argument Parsing and Validation", () => {
  let errorSpy;

  beforeEach(() => {
    // Spy on console.error to capture error messages
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    process.exitCode = 0;
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  test("valid flags produce correct options", () => {
    const opts = main([
      "--expression", "y=sin(x)",
      "--range", "x=0:3.14",
      "--points", "500",
      "--format", "csv",
      "--output", "out.csv",
    ]);
    expect(opts).toEqual({
      expression: "y=sin(x)",
      range: { x: [0, 3.14] },
      points: 500,
      format: "csv",
      output: "out.csv",
    });
    expect(process.exitCode).toBe(0);
  });

  test("missing expression results in error", () => {
    const opts = main(["--range", "x=0:1"]);
    expect(opts).toBeUndefined();
    expect(process.exitCode).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith("Missing required flag: expression");
  });

  test("missing range results in error", () => {
    const opts = main(["--expression", "y=x"]);
    expect(opts).toBeUndefined();
    expect(process.exitCode).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith("Missing required flag: range");
  });

  test("invalid range format results in error", () => {
    const opts = main([
      "--expression", "y=x",
      "--range", "x=0-1"
    ]);
    expect(opts).toBeUndefined();
    expect(process.exitCode).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("Invalid range format"));
  });

  test("unsupported format results in error", () => {
    const opts = main([
      "--expression", "y=x",
      "--range", "x=0:1",
      "--format", "xml"
    ]);
    expect(opts).toBeUndefined();
    expect(process.exitCode).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith("Unsupported format");
  });

  test("default values applied when optional flags omitted", () => {
    const opts = main([
      "--expression", "y=x",
      "--range", "x=0:1"
    ]);
    expect(opts).toEqual({
      expression: "y=x",
      range: { x: [0, 1] },
      points: 1000,
      format: "json",
      output: undefined,
    });
    expect(process.exitCode).toBe(0);
  });
});

// Tests for core series generation and serialization

describe("generateSeries and serializers", () => {
  test("single-axis series generation", () => {
    const series = generateSeries("y=x*2", { x: [0, 1] }, 3);
    expect(series).toEqual([
      { x: 0, y: 0 },
      { x: 0.5, y: 1 },
      { x: 1, y: 2 },
    ]);
  });

  test("multi-axis series generation", () => {
    const series = generateSeries("z=x+y", { x: [0, 1], y: [0, 1] }, 2);
    expect(series).toEqual([
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 1, z: 1 },
      { x: 1, y: 0, z: 1 },
      { x: 1, y: 1, z: 2 },
    ]);
  });

  test("serializeJson produces prettified JSON", () => {
    const s = [{ a: 1 }, { a: 2 }];
    const expected = JSON.stringify(s, null, 2);
    expect(serializeJson(s)).toBe(expected);
  });

  test("serializeCsv for single field", () => {
    const s = [{ a: 1 }, { a: 2 }];
    const csv = serializeCsv(s);
    expect(csv).toBe("a\n1\n2");
  });

  test("serializeCsv for multiple fields", () => {
    const s = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    const csv = serializeCsv(s);
    expect(csv).toBe("x,y\n0,0\n1,1");
  });
});
