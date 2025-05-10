import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { main } from "@src/lib/main.js";

describe("Expression Plot Data Generation", () => {
  let logSpy;
  let errSpy;
  let exitSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation((code) => { throw new Error("process.exit"); });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("default domain and samples", () => {
    expect(() => main(["plot", "--expression", "x^2"]))
      .not.toThrow();
    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    const data = JSON.parse(output);
    expect(data).toHaveLength(100);
    expect(data[0].y).toBeCloseTo(100);
    expect(data[data.length - 1].y).toBeCloseTo(100);
  });

  test("custom domain and samples", () => {
    expect(() =>
      main(["plot", "--expression", "x", "--xmin", "0", "--xmax", "2", "--samples", "3"]))
      .not.toThrow();
    const output = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    const data = JSON.parse(output);
    expect(data).toHaveLength(3);
    expect(data[0].x).toBe(0);
    expect(data[2].x).toBe(2);
    expect(data).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ]);
  });

  test("invalid expression", () => {
    expect(() => main(["plot", "--expression", "sin("])).toThrow("process.exit");
    expect(errSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error evaluating expression "sin("')
    );
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
