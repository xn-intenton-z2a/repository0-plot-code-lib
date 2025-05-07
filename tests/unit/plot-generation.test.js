import { describe, test, expect, vi } from "vitest";
import { main } from "@src/lib/main.js";

describe("Time Series Generation", () => {
  test("generates linear series with default points", () => {
    const data = main(["--expression", "y=x", "--range", "0:10"]);
    expect(data.length).toBe(100);
    expect(data[0]).toEqual({ x: 0, y: 0 });
    expect(data[99]).toEqual({ x: 10, y: 10 });
  });

  test("generates custom points count", () => {
    const data = main([
      "--expression",
      "y=x^2",
      "--range",
      "0:2",
      "--points",
      "3",
    ]);
    expect(data).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 4 },
    ]);
  });

  test("errors on missing required args", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("exit");
    });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => main([])).toThrow("exit");
    expect(errorSpy).toHaveBeenCalledWith(
      'Error: --expression and --range parameters are required.'
    );
    exitSpy.mockRestore();
    errorSpy.mockRestore();
  });

  test("errors on invalid range", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("exit");
    });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => main(["--expression", "y=x", "--range", "5:1"])).toThrow(
      "exit"
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Error: --range must be in form start:end with start < end.'
    );
    exitSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
