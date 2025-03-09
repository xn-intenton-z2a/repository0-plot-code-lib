import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";

const {
  main,
  plotQuadratic,
  calculateDerivative,
  calculateArea,
  plotLinear,
  plotSine,
  plotCosine,
  rotatePoints,
  plotExponential,
  plotLogarithmic,
  movingAverage,
  plotTangent,
  reflectPoints,
  scalePoints,
  plotSqrt,
  plotPolar,
  plotAbsolute,
  generateRange,
  plotDerivative,
  offsetPoints,
  plotLogistic,
  plotCubic,
  calculateStandardDeviation,
  calculateCorrelation,
  plotHyperbolic,
  calculateExponentialMovingAverage,
  plotGaussian,
  exportPlotAsCSV,
  exportPlotAsMarkdown,
  exportPlotAsJSON,
  exportPlotAsHTML,
  exportPlotAsASCII,
  exportPlotAsSVG,
  exportPlotAsXML,
  exportPlotAsLaTeX,
  exportPlotAsTXT,
  exportPlotAsR,
  plotScatter,
  plotParametric,
  plotBarChart,
  plotEllipse,
  plotPolynomial,
  plotModulatedSine,
  plotSpiral,
  calculateDefiniteIntegral,
  plotCustom,
  loadExpress,
  loadReadline,
  solveQuadraticEquation,
  plotSinCosCombined,
  interpolateData,
  plotBezier
} = mainModule;

// Main Function Behaviour Tests

describe("Main Function Behaviour", () => {
  test("should output demo message when no arguments are provided", () => {
    const spy = vi.spyOn(console, "log");
    main([]);
    expect(spy).toHaveBeenCalledWith(
      "Welcome to repository0-plot-code-lib CLI: Your precise plotting tool aligned with our mission 'Be a go-to plot library with a CLI, be the jq of formulae visualisations.' Use flags --interactive, --serve, --diagnostics, --plot-abs, --export-csv, --export-md, --export-json, --export-html, --export-ascii, --export-svg, --export-xml, --export-latex, --export-txt, --export-r, --bar-chart, --scatter, --plot-parametric, --plot-poly, or provide plot parameters."
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
      question: (_prompt, _callback) => {},
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

  test("should output CSV plot when --export-csv flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--export-csv"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("CSV Output:"));
    spy.mockRestore();
  });

  test("should output Markdown plot when --export-md flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--export-md"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Markdown Output:"));
    spy.mockRestore();
  });

  test("should output JSON plot when --export-json flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--export-json"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("JSON Output:"));
    spy.mockRestore();
  });

  test("should output HTML plot when --export-html flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--export-html"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("HTML Output:"));
    spy.mockRestore();
  });

  test("should output ASCII plot when --export-ascii flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--export-ascii"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("ASCII Output:"));
    spy.mockRestore();
  });

  test("should output SVG plot when --export-svg flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--export-svg"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("SVG Output:"));
    spy.mockRestore();
  });

  test("should output XML plot when --export-xml flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--export-xml"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("XML Output:"));
    spy.mockRestore();
  });

  test("should output LaTeX plot when --export-latex flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--export-latex"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("LaTeX Output:"));
    spy.mockRestore();
  });

  test("should output TXT plot when --export-txt flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--export-txt"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("TXT Output:"));
    spy.mockRestore();
  });

  test("should output R plot when --export-r flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--export-r"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("R Output:"));
    spy.mockRestore();
  });

  test("should output Scatter plot when --scatter flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--scatter"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Scatter Plot Output:"));
    spy.mockRestore();
  });

  test("should output Bar Chart when --bar-chart flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--bar-chart"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Bar Chart Output:"));
    spy.mockRestore();
  });

  test("should output Parametric plot when --plot-parametric flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--plot-parametric"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Parametric Plot Output:"));
    spy.mockRestore();
  });

  test("should output Polynomial plot when --plot-poly flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--plot-poly"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Polynomial Plot Output:"));
    spy.mockRestore();
  });

  test("should handle unrecognized flag gracefully", () => {
    const spy = vi.spyOn(console, "log");
    main(["--unknown"]);
    expect(spy).toHaveBeenCalledWith(`Processing plot request with parameters: ${JSON.stringify(["--unknown"])}`);
    spy.mockRestore();
  });
});

// Debug flag behaviour

describe("Debug flag behaviour", () => {
  test("should output debug message when --debug flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--debug"]);
    const debugString = spy.mock.calls.map(call => call[0]).join(' ');
    expect(debugString).toContain("exportPlotAsR");
    expect(debugString).toContain("plotCustom");
    expect(debugString).toContain("exportPlotAsXML");
    expect(debugString).toContain("plotBarChart");
    expect(debugString).toContain("plotEllipse");
    expect(debugString).toContain("plotModulatedSine");
    expect(debugString).toContain("exportPlotAsLaTeX");
    expect(debugString).toContain("exportPlotAsTXT");
    expect(debugString).toContain("plotPolynomial");
    expect(debugString).toContain("plotSpiral");
    expect(debugString).toContain("calculateDefiniteIntegral");
    expect(debugString).toContain("plotSinCosCombined");
    expect(debugString).toContain("solveQuadraticEquation");
    expect(debugString).toContain("interpolateData");
    expect(debugString).toContain("plotBezier");
    spy.mockRestore();
  });
});

// Module Loading Helpers

describe("Module Loading Helpers", () => {
  test("loadExpress should return a promise that resolves to a module", async () => {
    const mod = await loadExpress();
    expect(mod).toBeDefined();
  });

  test("loadReadline should return a promise that resolves to a module", async () => {
    const mod = await loadReadline();
    expect(mod).toBeDefined();
  });
});

// Additional helper functions tests

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

  test("plotCosine returns correct cosine wave values", () => {
    const points = plotCosine(1, 1, 0, 0, Math.PI, 10);
    expect(points.length).toBe(11);
    expect(points[0]).toEqual({ x: 0, y: 1 });
    expect(points[10].y).toBeCloseTo(-1, 5);
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

  test("plotDerivative returns derivative values correctly", () => {
    const fn = (x) => x * x;
    const points = plotDerivative(fn, 0, 10, 10);
    expect(points.length).toBe(11);
    expect(points[0].derivative).toBeCloseTo(0, 2);
    expect(points[5].derivative).toBeCloseTo(10, 1);
    expect(points[10].derivative).toBeCloseTo(20, 1);
  });

  test("offsetPoints returns points shifted by given offsets", () => {
    const original = [{ x: 1, y: 2 }, { x: 3, y: 4 }];
    const shifted = offsetPoints(original, 10, -5);
    expect(shifted).toEqual([{ x: 11, y: -3 }, { x: 13, y: -1 }]);
  });

  test("plotLogistic returns correct logistic curve values", () => {
    const points = plotLogistic(1, 1, 0, 0, 10, 10);
    expect(points.length).toBe(11);
    expect(points[0].y).toBeCloseTo(0.5, 4);
    expect(points[10].y).toBeCloseTo(1, 4);
  });

  test("plotCubic returns correct cubic polynomial values", () => {
    const points = plotCubic(1, 0, 0, 0, 0, 10, 10);
    expect(points.length).toBe(11);
    expect(points[0]).toEqual({ x: 0, y: 0 });
    expect(points[10]).toEqual({ x: 10, y: 1000 });
  });

  test("calculateStandardDeviation returns correct value", () => {
    const data = [2, 4, 4, 4, 5, 5, 7, 9];
    const std = calculateStandardDeviation(data);
    expect(std).toBeCloseTo(2, 1);
  });

  test("calculateStandardDeviation returns 0 for empty array", () => {
    expect(calculateStandardDeviation([])).toBe(0);
  });

  test("calculateCorrelation returns correct correlation coefficient", () => {
    const dataX = [1, 2, 3, 4];
    const dataY = [2, 4, 6, 8];
    expect(calculateCorrelation(dataX, dataY)).toBeCloseTo(1, 5);
  });

  test("plotHyperbolic returns correct hyperbolic plot values", () => {
    const points = plotHyperbolic(10, 1, 10, 9);
    expect(points[0].y).toBeCloseTo(10, 5);
  });

  test("calculateExponentialMovingAverage returns correct EMA", () => {
    const data = [1, 2, 3, 4, 5];
    const ema = calculateExponentialMovingAverage(data, 0.5);
    expect(ema.length).toBe(5);
    expect(ema[0]).toEqual(1);
  });

  test("calculateExponentialMovingAverage returns empty array for empty data", () => {
    const ema = calculateExponentialMovingAverage([]);
    expect(ema).toEqual([]);
  });

  test("plotGaussian returns correct gaussian curve values", () => {
    const points = plotGaussian(1, 0, 1, -3, 3, 6);
    expect(points.length).toBe(7);
  });

  test("exportPlotAsCSV returns CSV string correctly", () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    const csv = exportPlotAsCSV(points);
    expect(csv).toBe("x,y\n0,0\n1,1");
  });

  test("exportPlotAsCSV returns empty string for empty points array", () => {
    const csv = exportPlotAsCSV([]);
    expect(csv).toBe("");
  });

  test("exportPlotAsMarkdown returns Markdown table string correctly", () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    const md = exportPlotAsMarkdown(points);
    const expected = "| x | y |\n| --- | --- |\n| 0 | 0 |\n| 1 | 1 |";
    expect(md).toBe(expected);
  });

  test("exportPlotAsMarkdown returns empty string for empty points array", () => {
    const md = exportPlotAsMarkdown([]);
    expect(md).toBe("");
  });

  test("exportPlotAsJSON returns JSON string correctly", () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    const json = exportPlotAsJSON(points);
    expect(json).toBe(JSON.stringify(points, null, 2));
  });

  test("exportPlotAsHTML returns HTML table string correctly", () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    const html = exportPlotAsHTML(points);
    const expected = "<table><thead><tr><th>x</th><th>y</th></tr></thead><tbody><tr><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td></tr></tbody></table>";
    expect(html).toBe(expected);
  });

  test("exportPlotAsASCII returns ASCII table string correctly", () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    const ascii = exportPlotAsASCII(points);
    expect(ascii).toContain("X");
    expect(ascii).toContain("0");
    expect(ascii).toContain("1");
  });

  test("exportPlotAsSVG returns SVG string correctly", () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    const svg = exportPlotAsSVG(points);
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
  });

  test("exportPlotAsXML returns XML string correctly", () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    const xml = exportPlotAsXML(points);
    expect(xml).toContain("<points>");
    expect(xml).toContain("<point>");
    expect(xml).toContain("<x>0</x>");
  });

  test("exportPlotAsLaTeX returns a valid LaTeX table", () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    const latex = exportPlotAsLaTeX(points);
    expect(latex).toContain("\\begin{tabular}");
    expect(latex).toContain("\\end{tabular}");
    expect(latex).toContain("X & Y");
  });

  test("exportPlotAsTXT returns plain text string correctly", () => {
    const points = [{ x: 0, y: 0 }, { x: 2, y: 4 }];
    const txt = exportPlotAsTXT(points);
    const expected = "x: 0, y: 0\nx: 2, y: 4";
    expect(txt).toBe(expected);
  });

  test("exportPlotAsR returns R formatted string correctly", () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    const rStr = exportPlotAsR(points);
    const expectedStart = "x, y";
    expect(rStr).toContain(expectedStart);
  });

  // New function tests
  test("solveQuadraticEquation returns correct roots for quadratic equation", () => {
    const roots = solveQuadraticEquation(1, -3, 2);
    expect(roots.length).toBe(2);
    expect(roots[0]).toBeCloseTo(2);
    expect(roots[1]).toBeCloseTo(1);
  });

  test("plotSinCosCombined returns points with sin and cos values", () => {
    const points = plotSinCosCombined(1, 1, 0, 0, Math.PI, 10);
    expect(points.length).toBe(11);
    expect(points[0]).toHaveProperty('sin');
    expect(points[0]).toHaveProperty('cos');
  });

  test("interpolateData returns correct interpolated value", () => {
    const xData = [0, 10];
    const yData = [0, 100];
    const interpolated = interpolateData(xData, yData, 5);
    expect(interpolated).toBeCloseTo(50);
  });

  test("plotBezier returns a curve with expected number of points", () => {
    const controlPoints = [{ x: 0, y: 0 }, { x: 5, y: 10 }, { x: 10, y: 0 }];
    const curve = plotBezier(controlPoints, 50);
    expect(curve.length).toBe(51);
    expect(curve[0]).toEqual({ x: 0, y: 0 });
    expect(curve[50]).toEqual({ x: 10, y: 0 });
  });
});
