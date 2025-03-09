import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";

const {
  main,
  plotQuadratic,
  calculateDerivative,
  calculateArea,
  plotLinear,
  plotSine,
  rotatePoints,
  plotExponential,
  plotLogarithmic,
  movingAverage,
  plotCosine,
  plotTangent,
  reflectPoints,
  scalePoints,
  plotSqrt,
  plotPolar,
  plotAbsolute,
  generateRange,
  plotDerivative,
  offsetPoints
} = mainModule;


describe("Main Function Behaviour", () => {
  test("should output demo message when no arguments are provided", () => {
    const spy = vi.spyOn(console, "log");
    main([]);
    expect(spy).toHaveBeenCalledWith(
      "Welcome to repository0-plot-code-lib CLI: High precision plotting tool aligned with our mission statement. Use flags --interactive, --serve, --diagnostics, --plot-abs or provide plot parameters."
    );
    spy.mockRestore();
  });

  test("should output diagnostics when --diagnostics flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--diagnostics"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Diagnostics: Node version:"));
    spy.mockRestore();
  });

  test("should process plot request when plot parameters are provided", () => {
    const spy = vi.spyOn(console, "log");
    const args = ["plot.svg", "quad:1,0,0,-10,10,1"];
    main(args);
    expect(spy).toHaveBeenCalledWith(`Processing plot request with parameters: ${JSON.stringify(args)}`);
    spy.mockRestore();
  });

  test("should prompt for user input when --interactive flag is provided (test environment)", async () => {
    const spy = vi.spyOn(console, "log");
    const originalVitest = process.env.VITEST;
    process.env.VITEST = "true";

    const fakeInterface = {
      question: (_prompt, callback) => {
        process.nextTick(() => callback("simulated plot command"));
      },
      close: vi.fn()
    };
    const fakeReadlineModule = {
      createInterface: () => fakeInterface
    };

    vi.spyOn(mainModule, "loadReadline").mockImplementation(() => Promise.resolve(fakeReadlineModule));

    await main(["--interactive"]);
    expect(spy).toHaveBeenCalledWith("Received plot command: simulated plot command");
    spy.mockRestore();
    process.env.VITEST = originalVitest;
  });

  test("should trigger fallback timeout in interactive mode when no answer is provided (non-test environment)", async () => {
    process.env.NODE_ENV = "non-test";
    process.env.VITEST = undefined;
    const spyWarn = vi.spyOn(console, "warn");

    const fakeInterface = {
      question: (_prompt, _callback) => {
        // Do not call callback to trigger timeout
      },
      close: vi.fn()
    };
    const fakeReadlineModule = {
      createInterface: () => fakeInterface
    };

    vi.spyOn(mainModule, "loadReadline").mockImplementation(() => Promise.resolve(fakeReadlineModule));

    vi.useFakeTimers();
    const promise = main(["--interactive"]);
    await vi.advanceTimersByTimeAsync(120);
    await promise;
    expect(spyWarn).toHaveBeenCalledWith("Interactive mode fallback triggered after timeout");
    spyWarn.mockRestore();
    vi.useRealTimers();
    process.env.NODE_ENV = "test";
    process.env.VITEST = "true";
  });

  test("should start Express server when --serve flag is provided", async () => {
    const spy = vi.spyOn(console, "log");
    const fakeExpress = () => {
      return {
        disable: (header) => {},
        get: (path, cb) => {},
        listen: (port, cb) => {
          cb();
          return { close: () => {} };
        }
      };
    };
    const fakeExpressModule = { default: fakeExpress };

    vi.spyOn(mainModule, "loadExpress").mockImplementation(() => Promise.resolve(fakeExpressModule));

    await main(["--serve"]);
    expect(spy).toHaveBeenCalledWith("Express server running at http://localhost:3000");
    spy.mockRestore();
  });

  test("should catch error and print error message when express fails in --serve mode", async () => {
    const spy = vi.spyOn(console, "error");
    vi.spyOn(mainModule, "loadExpress").mockImplementation(() => Promise.reject(new Error("express failure")));
    await main(["--serve"]);
    expect(spy).toHaveBeenCalledWith("Error starting server:", expect.any(Error));
    spy.mockRestore();
  });

  test("should output absolute plot when --plot-abs flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--plot-abs"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Plot Absolute of sin(x):"), expect.any(Array));
    spy.mockRestore();
  });
});


describe("Additional helper functions", () => {
  test("plotQuadratic returns correct number of points and values", () => {
    const points = plotQuadratic(1, 0, 0, 0, 10, 10);
    expect(points.length).toBe(11);
    expect(points[0]).toEqual({ x: 0, y: 0 });
    expect(points[10]).toEqual({ x: 10, y: 100 });
  });

  test("calculateDerivative approximates derivative", () => {
    const fn = (x) => x * x;
    const derivative = calculateDerivative(fn, 5);
    expect(derivative).toBeCloseTo(10, 1);
  });

  test("calculateArea approximates area under curve", () => {
    const fn = (x) => x;
    const area = calculateArea(fn, 0, 10, 1000);
    expect(area).toBeCloseTo(50, 1);
  });

  test("plotLinear returns correct points and values", () => {
    const points = plotLinear(2, 1, 0, 10, 10);
    expect(points.length).toBe(11);
    expect(points[0]).toEqual({ x: 0, y: 1 });
    expect(points[10]).toEqual({ x: 10, y: 21 });
  });

  test("plotSine returns sinusoidal values", () => {
    const points = plotSine(1, 1, 0, 0, Math.PI, 10);
    expect(points.length).toBe(11);
    expect(points[0]).toEqual({ x: 0, y: 0 });
  });

  test("rotatePoints rotates points correctly", () => {
    const points = [{ x: 1, y: 0 }];
    const rotated = rotatePoints(points, Math.PI / 2);
    expect(rotated[0].x).toBeCloseTo(0, 5);
    expect(rotated[0].y).toBeCloseTo(1, 5);
  });

  test("plotExponential returns correct exponential values", () => {
    const points = plotExponential(2, 0, 2, 2);
    expect(points.length).toBe(3);
    expect(points[0]).toEqual({ x: 0, y: 1 });
    expect(points[2]).toEqual({ x: 2, y: 4 });
  });

  test("plotLogarithmic returns correct logarithmic values", () => {
    const points = plotLogarithmic(1, 1, Math.E, 1);
    expect(points.length).toBe(2);
    expect(points[0]).toEqual({ x: 1, y: 0 });
    expect(points[1].y).toBeCloseTo(1, 5);
  });

  test("plotLogarithmic throws error when xMin is not > 0", () => {
    expect(() => plotLogarithmic(1, 0, 10)).toThrow("xMin must be greater than 0 for logarithmic plots");
  });

  test("movingAverage returns correct averaged values", () => {
    const data = [1, 2, 3, 4, 5];
    const avg = movingAverage(data, 3);
    expect(avg.length).toBe(5);
    expect(avg[0]).toBeCloseTo(1.5, 5);
    expect(avg[1]).toBeCloseTo(2, 5);
    expect(avg[2]).toBeCloseTo(3, 5);
    expect(avg[3]).toBeCloseTo(4, 5);
    expect(avg[4]).toBeCloseTo(4.5, 5);
  });

  test("plotCosine returns correct cosine wave values", () => {
    const points = plotCosine(1, 1, 0, 0, Math.PI, 10);
    expect(points.length).toBe(11);
    expect(points[0]).toEqual({ x: 0, y: 1 });
    expect(points[10].y).toBeCloseTo(-1, 5);
  });

  test("plotTangent returns values with discontinuities handled", () => {
    const points = plotTangent(1, 1, 0, -Math.PI / 4, Math.PI / 4, 5);
    expect(points.length).toBe(6);
    const mid = points[Math.floor(points.length / 2)];
    expect(mid.y).toBeCloseTo(0, 5);
  });

  test("reflectPoints correctly reflects points across y-axis", () => {
    const original = [{ x: 2, y: 3 }];
    const reflected = reflectPoints(original, "y");
    expect(reflected[0]).toEqual({ x: -2, y: 3 });
  });

  test("scalePoints scales points correctly", () => {
    const original = [{ x: 2, y: 3 }];
    const scaled = scalePoints(original, 2);
    expect(scaled[0]).toEqual({ x: 4, y: 6 });
  });

  test("plotSqrt returns correct square root values and handles negatives", () => {
    const points = plotSqrt(0, 16, 4);
    expect(points.length).toBe(5);
    expect(points[0]).toEqual({ x: 0, y: 0 });
    expect(points[2].y).toBeCloseTo(Math.sqrt(8), 5);
    expect(points[4]).toEqual({ x: 16, y: 4 });
  });

  test("plotPolar returns correct polar coordinate values", () => {
    const radiusFn = (theta) => Math.cos(theta);
    const points = plotPolar(radiusFn, 0, Math.PI, 4);
    expect(points.length).toBe(5);
    expect(points[0]).toEqual({ theta: 0, r: 1 });
    const midTheta = points[2].theta;
    expect(points[2].r).toBeCloseTo(Math.cos(midTheta), 5);
  });

  test("plotAbsolute returns correct absolute values", () => {
    const points = plotAbsolute(Math.sin, 0, Math.PI, 10);
    expect(points.length).toBe(11);
    expect(points[0].y).toBeCloseTo(Math.abs(Math.sin(0)), 5);
    expect(points[10].y).toBeCloseTo(Math.abs(Math.sin(Math.PI)), 5);
  });

  test("generateRange returns a correct sequence", () => {
    const range = generateRange(0, 10, 5);
    expect(range).toEqual([0, 2, 4, 6, 8, 10]);
  });

  // New tests for extended functions
  test("plotDerivative returns derivative values correctly", () => {
    const fn = (x) => x * x;
    const points = plotDerivative(fn, 0, 10, 10);
    expect(points.length).toBe(11);
    // derivative of x^2 is 2x, check a few points
    expect(points[0].derivative).toBeCloseTo(0, 2);
    expect(points[5].derivative).toBeCloseTo(10, 1);
    expect(points[10].derivative).toBeCloseTo(20, 1);
  });

  test("offsetPoints returns points shifted by given offsets", () => {
    const original = [{ x: 1, y: 2 }, { x: 3, y: 4 }];
    const shifted = offsetPoints(original, 10, -5);
    expect(shifted).toEqual([{ x: 11, y: -3 }, { x: 13, y: -1 }]);
  });
});
