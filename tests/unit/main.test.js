import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";

const { main, plotQuadratic, calculateDerivative, calculateArea } = mainModule;

describe("Main Function Behaviour", () => {
  test("should output demo message when no arguments are provided", () => {
    const spy = vi.spyOn(console, "log");
    main([]);
    expect(spy).toHaveBeenCalledWith("Demo Plot: Quadratic function (placeholder). Use flags --interactive, --serve or provide plot parameters.");
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

  test("should prompt for user input when --interactive flag is provided", async () => {
    const spy = vi.spyOn(console, "log");
    const originalVitest = process.env.VITEST;
    process.env.VITEST = "true";

    const fakeInterface = {
      question: (prompt, callback) => { process.nextTick(() => callback("simulated plot command")); },
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

  test("should start Express server when --serve flag is provided", async () => {
    const spy = vi.spyOn(console, "log");
    const fakeExpress = () => {
      return {
        get: (path, cb) => {},
        listen: (port, cb) => { cb(); return { close: () => {} }; }
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
});

describe("Additional helper functions", () => {
  test("plotQuadratic returns correct number of points and values", () => {
    const points = plotQuadratic(1, 0, 0, 0, 10, 10);
    expect(points.length).toBe(11);
    expect(points[0]).toEqual({ x: 0, y: 0 });
    expect(points[10]).toEqual({ x: 10, y: 100 });
  });
  
  test("calculateDerivative approximates derivative", () => {
    const fn = x => x * x;
    const derivative = calculateDerivative(fn, 5);
    expect(derivative).toBeCloseTo(10, 1);
  });
  
  test("calculateArea approximates area under curve", () => {
    const fn = x => x;
    const area = calculateArea(fn, 0, 10, 1000);
    expect(area).toBeCloseTo(50, 1);
  });
});
