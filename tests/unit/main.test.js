import { describe, test, expect, vi } from 'vitest';
import * as mainModule from '@src/lib/main.js';

const {
  main,
  loadExpress,
  loadReadline,
  overrides,
  plotQuadratic,
  generateRange,
  calculateDerivative,
  plotSineReal,
  plotCosineReal,
  plotExponentialReal,
  plotLogarithmicReal,
  plotQuadraticReal,
  plotLinearReal,
  plotTangentReal,
  rotatePointsReal,
  plotSigmoidReal,
  plotReLUReal,
  plotHistogramReal,
  plotPolarReal,
  plotLogisticReal,
  movingAverageReal,
  plotSincReal,
  calculateDefiniteIntegralReal,
  plotBezierReal,
  plotHyperbolaReal,
  plotEllipseReal,
  plotCubicReal,
  movingMedianReal,
  plotGaussianReal,
  plotHeatMapReal,
  plotScatterReal,
  plotBarChartReal,
  plotLissajousReal
} = mainModule;

// Helper to reset overrides after tests
function resetOverrides() {
  overrides.loadExpressOverride = undefined;
  overrides.loadReadlineOverride = undefined;
}

// Main Function Behaviour Tests

describe('Main Function Behaviour', () => {
  test('should output demo message when no arguments are provided', () => {
    const spy = vi.spyOn(console, 'log');
    main([]);
    expect(spy).toHaveBeenCalledWith(
      "Welcome to repository0-plot-code-lib CLI!\nMission: 'Be a go-to plot library with a CLI, be the jq of formulae visualisations.'\nSelect from modes: --interactive, --serve, --diagnostics, --plot-abs, --export-csv, --export-md, --export-json, --export-html, --export-ascii, --export-svg, --export-xml, --export-latex, --export-txt, --export-r, --export-png, --bar-chart, --scatter, --plot-parametric, --plot-poly, --lissajous, --lemniscate, --hyperbola, --power-plot, --plot-histogram, --heatmap or provide plot parameters.\nFor contribution guidelines, please refer to CONTRIBUTING.md."
    );
    spy.mockRestore();
  });

  test('should output help message when --help flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--help']);
    expect(spy).toHaveBeenCalledWith(
      "Welcome to repository0-plot-code-lib CLI!\nMission: 'Be a go-to plot library with a CLI, be the jq of formulae visualisations.'\nSelect from modes: --interactive, --serve, --diagnostics, --plot-abs, --export-csv, --export-md, --export-json, --export-html, --export-ascii, --export-svg, --export-xml, --export-latex, --export-txt, --export-r, --export-png, --bar-chart, --scatter, --plot-parametric, --plot-poly, --lissajous, --lemniscate, --hyperbola, --power-plot, --plot-histogram, --heatmap or provide plot parameters.\nFor contribution guidelines, please refer to CONTRIBUTING.md."
    );
    spy.mockRestore();
  });

  test('should output diagnostics when --diagnostics flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--diagnostics']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Diagnostics: Node version:'));
    spy.mockRestore();
  });

  test('should process plot request when plot parameters are provided', () => {
    const spy = vi.spyOn(console, 'log');
    const args = ['plot.svg', 'quad:1,0,0,-10,10,1'];
    main(args);
    expect(spy).toHaveBeenCalledWith(`Processing plot request with parameters: ${JSON.stringify(args)}`);
    spy.mockRestore();
  });

  test('should prompt for user input when --interactive flag is provided (test environment)', async () => {
    const spy = vi.spyOn(console, 'log');
    const originalVitest = process.env.VITEST;
    process.env.VITEST = 'true';

    const fakeInterface = {
      question: (_prompt, callback) => {
        callback('simulated plot command');
      },
      close: vi.fn()
    };
    const fakeReadlineModule = {
      createInterface: () => fakeInterface
    };

    overrides.loadReadlineOverride = () => Promise.resolve(fakeReadlineModule);

    await main(['--interactive']);
    expect(spy).toHaveBeenCalledWith('Received plot command: simulated plot command');
    spy.mockRestore();
    process.env.VITEST = originalVitest;
    resetOverrides();
  }, 6000);

  test('should trigger fallback timeout in interactive mode when no answer is provided (non-test environment)', async () => {
    process.env.NODE_ENV = 'non-test';
    process.env.VITEST = undefined;
    const spyWarn = vi.spyOn(console, 'warn');

    const fakeInterface = {
      question: (_prompt, _callback) => {},
      close: vi.fn()
    };
    const fakeReadlineModule = {
      createInterface: () => fakeInterface
    };

    overrides.loadReadlineOverride = () => Promise.resolve(fakeReadlineModule);

    vi.useFakeTimers();
    const promise = main(['--interactive']);
    await vi.advanceTimersByTimeAsync(120);
    await promise;
    expect(spyWarn).toHaveBeenCalledWith('Interactive mode fallback triggered after timeout');
    spyWarn.mockRestore();
    vi.useRealTimers();
    process.env.NODE_ENV = 'test';
    process.env.VITEST = 'true';
    resetOverrides();
  });

  test('should start Express server when --serve flag is provided', async () => {
    const spy = vi.spyOn(console, 'log');
    const fakeExpress = () => {
      return {
        get: (path, cb) => {},
        listen: (port, cb) => {
          cb();
          return { close: () => {} };
        }
      };
    };
    overrides.loadExpressOverride = () => Promise.resolve({ default: fakeExpress });

    process.env.VITEST = 'true';
    await main(['--serve']);
    expect(spy).toHaveBeenCalledWith(`Express server running at http://localhost:3000`);
    spy.mockRestore();
    resetOverrides();
  });

  test('should catch error and print error message when express fails in --serve mode', async () => {
    const spy = vi.spyOn(console, 'error');
    process.env.VITEST = '';
    overrides.loadExpressOverride = () => Promise.reject(new Error('express failure'));
    await main(['--serve']);
    expect(spy).toHaveBeenCalledWith('Error starting server:', expect.any(Error));
    spy.mockRestore();
    resetOverrides();
  });

  test('should output absolute plot when --plot-abs flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--plot-abs']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Plot Absolute of sin(x):'), expect.any(Array));
    spy.mockRestore();
  });

  test('should output CSV plot when --export-csv flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--export-csv']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('CSV Output:'), expect.any(String));
    spy.mockRestore();
  });

  test('should output Markdown plot when --export-md flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--export-md']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Markdown Output:'), expect.any(String));
    spy.mockRestore();
  });

  test('should output JSON plot when --export-json flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--export-json']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('JSON Output:'), expect.any(String));
    spy.mockRestore();
  });

  test('should output HTML plot when --export-html flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--export-html']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('HTML Output:'));
    spy.mockRestore();
  });

  test('should output ASCII plot when --export-ascii flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--export-ascii']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('ASCII Output:'));
    spy.mockRestore();
  });

  test('should output SVG plot when --export-svg flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--export-svg']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('SVG Output:'));
    spy.mockRestore();
  });

  test('should output XML plot when --export-xml flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--export-xml']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('XML Output:'));
    spy.mockRestore();
  });

  test('should output LaTeX plot when --export-latex flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--export-latex']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('LaTeX Output:'), expect.any(String));
    spy.mockRestore();
  });

  test('should output TXT plot when --export-txt flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--export-txt']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('TXT Output:'), expect.any(String));
    spy.mockRestore();
  });

  test('should output R plot when --export-r flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--export-r']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('R Output:'), expect.any(String));
    spy.mockRestore();
  });

  test('should output PNG plot when --export-png flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--export-png']);
    expect(spy).toHaveBeenCalledWith('PNG Output: [stub output for PNG]');
    spy.mockRestore();
  });

  test('should output Scatter plot when --scatter flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--scatter']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Scatter Plot Output:'), expect.any(Array));
    spy.mockRestore();
  });

  test('should output Bar Chart when --bar-chart flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--bar-chart']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Bar Chart Output:'), expect.any(Array));
    spy.mockRestore();
  });

  test('should output Parametric plot when --plot-parametric flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--plot-parametric']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Parametric Plot Output:'), expect.any(Array));
    spy.mockRestore();
  });

  test('should output Polynomial plot when --plot-poly flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--plot-poly']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Polynomial Plot Output:'), expect.any(Array));
    spy.mockRestore();
  });

  test('should output Lissajous plot when --lissajous flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--lissajous']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Lissajous Curve Output:'), expect.any(Array));
    spy.mockRestore();
  });

  test('should output Lemniscate plot when --lemniscate flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--lemniscate']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Lemniscate Plot Output:'), expect.any(Array));
    spy.mockRestore();
  });

  test('should output Power Plot when --power-plot flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--power-plot']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Power Plot (y = 2x^3) Output:'), expect.any(Array));
    spy.mockRestore();
  });

  test('should output Histogram plot when --plot-histogram flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--plot-histogram']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Histogram Output:'), expect.any(Array));
    spy.mockRestore();
  });

  test('should output Heat Map plot when --heatmap flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--heatmap']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Heat Map Output:'), expect.any(Array));
    spy.mockRestore();
  });

  test('should handle unrecognized flag gracefully', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--unknown']);
    expect(spy).toHaveBeenCalledWith(`Processing plot request with parameters: ${JSON.stringify(['--unknown'])}`);
    spy.mockRestore();
  });
});

// Debug flag behaviour

describe('Debug flag behaviour', () => {
  test('should output debug message when --debug flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--debug']);
    const debugString = spy.mock.calls.map(call => call[0]).join(' ');
    expect(debugString).toContain('plotQuadratic');
    expect(debugString).toContain('plotCustom');
    expect(debugString).toContain('exportPlotAsXML');
    expect(debugString).toContain('exportPlotAsLaTeX');
    expect(debugString).toContain('exportPlotAsTXT');
    expect(debugString).toContain('plotPolynomial');
    expect(debugString).toContain('plotModulatedSine');
    expect(debugString).toContain('plotSpiral');
    expect(debugString).toContain('calculateDefiniteIntegralReal');
    expect(debugString).toContain('plotBezierReal');
    expect(debugString).toContain('plotPolarReal');
    expect(debugString).toContain('plotLogisticReal');
    expect(debugString).toContain('movingAverageReal');
    expect(debugString).toContain('plotHistogramReal');
    expect(debugString).toContain('plotHyperbolaReal');
    expect(debugString).toContain('plotEllipseReal');
    expect(debugString).toContain('plotCubicReal');
    expect(debugString).toContain('movingMedianReal');
    expect(debugString).toContain('plotGaussianReal');
    expect(debugString).toContain('plotScatterReal');
    expect(debugString).toContain('plotBarChartReal');
    expect(debugString).toContain('plotLissajousReal');
    spy.mockRestore();
  });
});

// Module Loading Helpers

describe('Module Loading Helpers', () => {
  test('loadExpress should return a promise that resolves to a module', async () => {
    const mod = await loadExpress();
    expect(mod).toBeDefined();
  });

  test('loadReadline should return a promise that resolves to a module', async () => {
    const mod = await loadReadline();
    expect(mod).toBeDefined();
  });
});

// Error Handling for Module Loaders

describe('Error Handling for module loaders', () => {
  test('loadReadline should handle failure gracefully', async () => {
    overrides.loadReadlineOverride = () => Promise.reject(new Error('readline failure'));
    const spyError = vi.spyOn(console, 'error');
    await main(['--interactive']);
    expect(spyError).toHaveBeenCalledWith('Error loading readline module:', expect.any(Error));
    spyError.mockRestore();
    resetOverrides();
  });

  test('loadExpress should handle failure gracefully', async () => {
    overrides.loadExpressOverride = () => Promise.reject(new Error('express failure'));
    const spyError = vi.spyOn(console, 'error');
    process.env.VITEST = '';
    await main(['--serve']);
    expect(spyError).toHaveBeenCalledWith('Error starting server:', expect.any(Error));
    spyError.mockRestore();
    resetOverrides();
  });
});

// Stub Function Tests

describe('Stub Function Tests', () => {
  test('plotQuadratic stub should log its message', () => {
    const spy = vi.spyOn(console, 'log');
    plotQuadratic();
    expect(spy).toHaveBeenCalledWith('plotQuadratic stub executed');
    spy.mockRestore();
  });

  // Extended Function Implementations Tests
  describe('Extended Function Implementations', () => {
    test('generateRange should return proper range', () => {
      const range = generateRange(1, 5);
      expect(range).toEqual([1, 2, 3, 4, 5]);
    });

    test('calculateDerivative should compute derivative correctly', () => {
      const derivativeValue = calculateDerivative('x^2', 'x', 3);
      expect(derivativeValue).toBeCloseTo(6);
    });

    test('plotSineReal computes sine plot correctly', () => {
      const plot = plotSineReal(0, Math.PI, Math.PI / 2);
      expect(plot).toEqual([
        { x: 0, y: 0 },
        { x: Math.PI / 2, y: 1 },
        { x: Math.PI, y: 0 }
      ]);
    });

    test('plotCosineReal computes cosine plot correctly', () => {
      const plot = plotCosineReal(0, Math.PI, Math.PI / 2);
      expect(plot).toEqual([
        { x: 0, y: 1 },
        { x: Math.PI / 2, y: 0 },
        { x: Math.PI, y: -1 }
      ]);
    });

    test('plotExponentialReal computes exponential plot correctly', () => {
      const plot = plotExponentialReal(0, 2, 1);
      expect(plot).toEqual([
        { x: 0, y: 1 },
        { x: 1, y: Math.exp(1) },
        { x: 2, y: Math.exp(2) }
      ]);
    });

    test('plotLogarithmicReal computes logarithmic plot correctly', () => {
      const plot = plotLogarithmicReal(1, 3, 1);
      expect(plot).toEqual([
        { x: 1, y: 0 },
        { x: 2, y: Math.log(2) },
        { x: 3, y: Math.log(3) }
      ]);
    });

    test('plotQuadraticReal computes quadratic plot correctly', () => {
      const plot = plotQuadraticReal(0, 2, 1, 1, 0, 0);
      expect(plot).toEqual([
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 4 }
      ]);
    });

    test('plotLinearReal computes linear plot correctly', () => {
      const plot = plotLinearReal(0, 2, 1, 2, 1);
      expect(plot).toEqual([
        { x: 0, y: 1 },
        { x: 1, y: 3 },
        { x: 2, y: 5 }
      ]);
    });

    test('plotTangentReal computes tangent plot correctly', () => {
      const plot = plotTangentReal(0, Math.PI / 4, Math.PI / 8);
      const expected = [
        { x: 0, y: 0 },
        { x: Math.PI / 8, y: Math.tan(Math.PI / 8) },
        { x: Math.PI / 4, y: Math.tan(Math.PI / 4) }
      ];
      expect(plot).toEqual(expected);
    });

    test('rotatePointsReal rotates points correctly', () => {
      const points = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
      const angle = Math.PI / 2;
      const rotated = rotatePointsReal(points, angle);
      expect(rotated[0].x).toBeCloseTo(0);
      expect(rotated[0].y).toBeCloseTo(1);
      expect(rotated[1].x).toBeCloseTo(-1);
      expect(rotated[1].y).toBeCloseTo(0);
    });

    test('plotSigmoidReal computes sigmoid plot correctly', () => {
      const plot = plotSigmoidReal(0, 2, 1);
      expect(plot[0].y).toBeCloseTo(0.5);
      expect(plot[1].y).toBeCloseTo(1 / (1 + Math.exp(-1)));
      expect(plot[2].y).toBeCloseTo(1 / (1 + Math.exp(-2)));
    });

    test('plotReLUReal computes ReLU plot correctly', () => {
      const plot = plotReLUReal(-1, 1, 1);
      expect(plot).toEqual([
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 1 }
      ]);
    });

    test('plotHistogramReal computes histogram plot correctly', () => {
      const data = [1, 2, 2, 3, 4];
      const histogram = plotHistogramReal(data, 3);
      expect(histogram).toEqual([1, 2, 2]);
    });

    test('plotPolarReal computes polar plot correctly', () => {
      const plot = plotPolarReal(0, 1, 0.5);
      expect(plot).toEqual([
        { theta: 0, r: 0 },
        { theta: 0.5, r: 0.5 },
        { theta: 1, r: 1 }
      ]);
    });

    test('plotLogisticReal computes logistic plot correctly', () => {
      const plot = plotLogisticReal(0, 2, 1, 1, 1, 1);
      expect(plot).toEqual([
        { x: 0, y: 1/(1+Math.exp(1)) },
        { x: 1, y: 0.5 },
        { x: 2, y: 1/(1+Math.exp(-1)) }
      ]);
    });

    test('movingAverageReal computes moving average correctly', () => {
      const data = [1, 2, 3, 4, 5];
      const result = movingAverageReal(data, 3);
      expect(result).toEqual([2, 3, 4]);
    });

    test('plotSincReal computes sinc plot correctly', () => {
      const plot = plotSincReal(-1, 1, 1);
      expect(plot).toEqual([
        { x: -1, y: Math.sin(-1)/-1 },
        { x: 0, y: 1 },
        { x: 1, y: Math.sin(1)/1 }
      ]);
    });

    test('calculateDefiniteIntegralReal computes integral correctly', () => {
      const integral = calculateDefiniteIntegralReal(x => x, 0, 1, 1000);
      expect(integral).toBeCloseTo(0.5, 2);
    });

    test('plotBezierReal returns control points correctly', () => {
      const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
      const result = plotBezierReal(points);
      expect(result).toEqual(points);
    });

    test('plotHyperbolaReal computes hyperbola plot correctly', () => {
      const plot = plotHyperbolaReal(1, 3, 1);
      expect(plot).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 0.5 },
        { x: 3, y: 1/3 }
      ]);
    });

    test('plotEllipseReal computes ellipse coordinates correctly', () => {
      const plot = plotEllipseReal(1, 2, Math.PI/2);
      expect(plot.length).toBeGreaterThanOrEqual(3);
      expect(plot[0]).toEqual({ x: 1, y: 0 });
    });

    test('plotCubicReal computes cubic plot correctly', () => {
      const plot = plotCubicReal(0, 2, 1, 1, 0, 0, 0);
      expect(plot).toEqual([
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 8 }
      ]);
    });

    test('movingMedianReal computes moving median correctly', () => {
      const data = [5, 2, 8, 3, 7];
      const result = movingMedianReal(data, 3);
      expect(result).toEqual([5, 3, 7]);
    });

    test('plotGaussianReal computes gaussian plot correctly', () => {
      const plot = plotGaussianReal(-1, 1, 1, 1, 0, 1);
      expect(plot.find(p => p.x === 0).y).toBeGreaterThan(plot.find(p => p.x === -1).y);
      expect(plot.find(p => p.x === 0).y).toBeGreaterThan(plot.find(p => p.x === 1).y);
    });

    test('plotHeatMapReal returns a 3x3 matrix by default if no matrix is provided', () => {
      const heatmap = plotHeatMapReal();
      expect(heatmap.length).toEqual(3);
      expect(heatmap[0].length).toEqual(3);
    });

    test('plotScatterReal returns array of points', () => {
      const points = plotScatterReal(5);
      expect(points).toHaveLength(5);
    });

    test('plotBarChartReal returns array of strings', () => {
      const chart = plotBarChartReal([3,2]);
      expect(chart).toEqual(["***", "**"]);
    });

    test('plotLissajousReal returns points with t property', () => {
      const curve = plotLissajousReal(3,2,Math.PI/2,0.5, Math.PI);
      expect(curve[0]).toHaveProperty("t");
    });
  });
});
