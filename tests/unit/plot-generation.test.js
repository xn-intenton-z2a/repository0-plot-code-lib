import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { main } from "@src/lib/main.js";

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
