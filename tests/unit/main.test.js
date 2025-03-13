import { describe, test, expect, vi } from 'vitest';
import * as mainModule from '@src/lib/main.js';
import {
  main,
  resetOverrides,
  overrides,
  movingSumReal,
  plotCubicBezierReal,
  plotGridReal,
  generateRange,
  calculateDerivative,
  plotSineReal,
  plotCosineReal,
  plotSpiralEnhancedReal,
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
  plotLemniscateReal,
  plotEllipseReal,
  plotCubicReal,
  movingMedianReal,
  plotGaussianReal,
  plotHeatMapReal,
  plotSpiralReal,
  plotBarChartReal,
  plotLissajousReal,
  plotCustomReal,
  plotSinCosCombinedReal,
  fibonacciSequence,
  plotFibonacciSpiralReal,
  plotCircularPlotReal,
  plotPolarRoseReal,
  plotStarPolygonReal,
  plotLogLogReal,
  plotStepFunctionReal,
  plotCubicBezierReal,
  plotPolarHeatmapReal,
  plotPowerPlotReal,
  plotCustomEnhancedReal,
  plotPiecewiseReal,
  movingProductReal,
  // Newly added functions
  plotEnhancedParametricReal,
  plotRandomWalkReal,
  plotPhyllotaxisReal,
  // Extended functions
  plotNthRootReal,
  plotPolynomialFromCoeffsReal,
  plotCumulativeSumReal,
  plotIntegralReal,
  plotBarChartEnhancedReal,
  plotScaledSineReal,
  plotExponentialDecayReal,
  plotCumulativeProductReal,
  movingStdReal,
  cumulativeDifferenceReal,
  // Advanced plotting functions
  plotBoxPlotReal,
  plotViolinPlotReal,
  loadExpress,
  loadReadline,
  // New features
  plotDampedOscillationReal,
  plotSpiralColoredReal,
  plotDualAxisReal,
  plotHarmonicsReal,
  plotModulatedSineReal,
  plotStatisticalSummaryReal,
  plotParametricReal,
  plotCumulativeAverageReal,
  plotInverseFunctionReal,
  plotCustomFancyReal,
  plotInteractiveGuideReal,
  plotSineCosineDetailedReal,
  plotComplexFunctionReal,
  plotExponentialMovingAverageReal,
  plotExponentialSineReal,
  plotCosineCumulativeSumReal,
  testCoverageHook,
  mockExternalResourceTest,
  // Newly added extended functions
  plotSpiral3DReal,
  plotExponentialDecayEnhancedReal
} from '@src/lib/main.js';

// Suppress console output during tests
vi.spyOn(console, 'log').mockImplementation(() => {});
vi.spyOn(console, 'warn').mockImplementation(() => {});


describe('Main Module Import', () => {
  test('should be non-null', () => {
    expect(mainModule).not.toBeNull();
  });
});


describe('Default Demo Output', () => {
  test('should terminate without error', () => {
    process.argv = ['node', 'src/lib/main.js'];
    main();
  });
});


describe('Module Loader Error Handling', () => {
  test('loadExpress throws error when override fails', async () => {
    overrides.loadExpressOverride = async () => { throw new Error('Simulated Express load failure'); };
    await expect(loadExpress()).rejects.toThrow('Failed to load express: Simulated Express load failure');
    resetOverrides();
  });

  test('loadReadline throws error when override fails', async () => {
    overrides.loadReadlineOverride = async () => { throw new Error('Simulated Readline load failure'); };
    await expect(loadReadline()).rejects.toThrow('Failed to load readline: Simulated Readline load failure');
    resetOverrides();
  });
});


describe('New Extended Functions', () => {
  test('plotLogLogReal returns non-empty array', () => {
    const result = mainModule.plotLogLogReal(1, 10, 1);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test('plotStepFunctionReal returns correct step values', () => {
    const result = mainModule.plotStepFunctionReal(0, 10, 1, 2);
    expect(result[0].y).toBe(0);
    expect(result[2].y).toBe(1);
  });

  test('movingSumReal calculates correct moving sum', () => {
    const data = [1, 2, 3, 4, 5];
    const result = movingSumReal(data, 3);
    expect(result).toEqual([6, 9, 12]);
  });

  test('plotCubicBezierReal returns a bezier curve for 4 points', () => {
    const controlPoints = [{ x: 0, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 0 }];
    const result = plotCubicBezierReal(controlPoints, 0.5);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(3);
  });

  test('plotEnhancedParametricReal returns enhanced parametric data', () => {
    const result = plotEnhancedParametricReal(0, Math.PI, Math.PI / 4, Math.cos, Math.sin, { color: 'red' });
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('style');
  });

  test('plotRandomWalkReal returns an array with specified number of steps', () => {
    const walk = plotRandomWalkReal(100, 1);
    expect(Array.isArray(walk)).toBe(true);
    expect(walk.length).toBe(100);
  });

  test('plotPhyllotaxisReal returns an array with 1000 points by default', () => {
    const phyllo = plotPhyllotaxisReal();
    expect(Array.isArray(phyllo)).toBe(true);
    expect(phyllo.length).toBe(1000);
  });
});

describe('--reset flag functionality', () => {
  test('should reset overrides when --reset is passed', async () => {
    overrides.loadExpressOverride = async () => 'dummyExpress';
    overrides.loadReadlineOverride = async () => ({ createInterface: () => ({}) });
    process.argv = ['node', 'src/lib/main.js', '--reset'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith('Overrides reset to defaults.');
    expect(overrides.loadExpressOverride).toBeUndefined();
    expect(overrides.loadReadlineOverride).toBeUndefined();
  });
});

describe('Interactive Mode in test environment', () => {
  test('should simulate immediate response', async () => {
    process.env.VITEST = 'true';
    process.argv = ['node', 'src/lib/main.js', '--interactive'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith('Received plot command: simulated plot command');
    delete process.env.VITEST;
  });
});

describe('Serve Mode in test environment', () => {
  test('should simulate server start in test environment', async () => {
    process.env.VITEST = 'true';
    process.argv = ['node', 'src/lib/main.js', '--serve'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith('Express server running at http://localhost:3000');
    delete process.env.VITEST;
  });
});

describe('--plot-circle flag functionality', () => {
  test('should print Circular Plot Output', async () => {
    process.argv = ['node', 'src/lib/main.js', '--plot-circle'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Circular Plot Output:'));
  });
});

describe('--plot-grid flag functionality', () => {
  test('should print Grid Plot Output with sine and cosine plots', async () => {
    process.argv = ['node', 'src/lib/main.js', '--plot-grid'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Grid Plot Output:'));
  });
});

describe('--plot-spiral-enhanced flag functionality', () => {
  test('should print Enhanced Spiral Plot Output', async () => {
    process.argv = ['node', 'src/lib/main.js', '--plot-spiral-enhanced'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Enhanced Spiral Plot Output:'));
  });
});

describe('--plot-polar-heatmap flag functionality', () => {
  test('should print Polar Heatmap Plot Output', async () => {
    process.argv = ['node', 'src/lib/main.js', '--plot-polar-heatmap'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Polar Heatmap Plot Output:'));
  });
});

describe('--power-plot flag functionality', () => {
  test('should print Power Plot Output', async () => {
    process.argv = ['node', 'src/lib/main.js', '--power-plot'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Power Plot (real):'));
  });
});

describe('--plot-custom-enhanced flag functionality', () => {
  test('should print Custom Enhanced Plot Output', async () => {
    process.argv = ['node', 'src/lib/main.js', '--plot-custom-enhanced'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Custom Enhanced Plot Output:'));
  });
});

describe('--plot-piecewise flag functionality', () => {
  test('should print Piecewise Plot Output', async () => {
    process.argv = ['node', 'src/lib/main.js', '--plot-piecewise'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Piecewise Plot Output:'));
  });
});

describe('--plot-derivative flag functionality', () => {
  test('should print Derivative Plot Output', async () => {
    process.argv = ['node', 'src/lib/main.js', '--plot-derivative'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Derivative Plot Output:'));
  });
});

describe('--plot-harmonics flag functionality', () => {
  test('should print Harmonics Plot Output', async () => {
    process.argv = ['node', 'src/lib/main.js', '--plot-harmonics'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Harmonics Plot Output:'));
  });
});

describe('--plot-modulated-sine flag functionality', () => {
  test('should print Modulated Sine Plot Output', async () => {
    process.argv = ['node', 'src/lib/main.js', '--plot-modulated-sine'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Modulated Sine Plot Output:'));
  });
});

describe('--plot-stat-summary flag functionality', () => {
  test('should print Statistical Summary Output', async () => {
    process.argv = ['node', 'src/lib/main.js', '--plot-stat-summary'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Statistical Summary:'));
  });
});

describe('plotStatisticalSummaryReal function', () => {
  test('returns correct statistical summary', () => {
    const data = [1, 2, 3, 4, 5];
    const summary = mainModule.plotStatisticalSummaryReal(data);
    expect(summary).toEqual({ mean: 3, median: 3, min: 1, max: 5 });
  });
});

describe('Extended Functions Full Coverage', () => {
  test('generateRange returns correct sequence', () => {
    const range = generateRange(1, 5, 1);
    expect(range).toEqual([1, 2, 3, 4, 5]);
  });

  test('calculateDerivative returns correct derivative value', () => {
    const result = calculateDerivative('x^2', 'x', 3);
    expect(result).toBeCloseTo(6);
  });

  test('plotSineReal returns a plot array with correct sine values', () => {
    const plot = plotSineReal(0, Math.PI, Math.PI / 2);
    expect(plot).toEqual([
      { x: 0, y: 0 },
      { x: Math.PI / 2, y: 1 },
      { x: Math.PI, y: 0 }
    ]);
  });

  test('plotCosineReal returns a plot array with correct cosine values', () => {
    const plot = plotCosineReal(0, Math.PI, Math.PI / 2);
    expect(plot).toEqual([
      { x: 0, y: 1 },
      { x: Math.PI / 2, y: 0 },
      { x: Math.PI, y: -1 }
    ]);
  });

  test('plotExponentialReal returns an array of numbers', () => {
    const result = plotExponentialReal(0, 2, 1);
    expect(result.every(point => typeof point.y === 'number')).toBe(true);
  });

  test('plotLogarithmicReal returns non-empty for positive range', () => {
    const result = plotLogarithmicReal(1, 10, 1);
    expect(result.length).toBeGreaterThan(0);
  });

  test('plotQuadraticReal calculates quadratic values correctly', () => {
    const result = plotQuadraticReal(0, 2, 1, 1, 0, 0);
    expect(result).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 4 }
    ]);
  });

  test('plotLinearReal calculates linear values correctly', () => {
    const result = plotLinearReal(0, 2, 1, 2, 1);
    expect(result).toEqual([
      { x: 0, y: 1 },
      { x: 1, y: 3 },
      { x: 2, y: 5 }
    ]);
  });

  test('plotTangentReal handles discontinuities', () => {
    const result = plotTangentReal(0, Math.PI, Math.PI / 4);
    expect(result.some(point => point.y === null)).toBe(true);
  });

  test('rotatePointsReal rotates points correctly', () => {
    const points = [{ x: 1, y: 0 }];
    const rotated = rotatePointsReal(points, Math.PI / 2);
    expect(rotated[0].x).toBeCloseTo(0);
    expect(rotated[0].y).toBeCloseTo(1);
  });

  test('plotSigmoidReal returns values between 0 and 1', () => {
    const result = plotSigmoidReal(0, 4, 1);
    expect(result.every(p => p.y >= 0 && p.y <= 1)).toBe(true);
  });

  test('plotReLUReal returns non-negative values', () => {
    const result = plotReLUReal(-2, 2, 1);
    expect(result.every(p => p.y >= 0)).toBe(true);
  });

  test('plotHistogramReal returns an array of counts', () => {
    const result = plotHistogramReal([1, 2, 2, 3], 3);
    expect(Array.isArray(result)).toBe(true);
  });

  test('plotPolarReal returns an array of points', () => {
    const result = plotPolarReal(0, Math.PI, 1);
    expect(Array.isArray(result)).toBe(true);
  });

  test('plotLogisticReal returns values between 0 and 1 for standard logistic', () => {
    const result = plotLogisticReal(0, 5, 1);
    expect(result.every(p => p.y >= 0 && p.y <= 1)).toBe(true);
  });

  test('movingAverageReal returns correct number of averages', () => {
    const result = movingAverageReal([1, 2, 3, 4, 5], 3);
    expect(result.length).toBe(3);
  });

  test('plotSincReal returns y=1 at x=0', () => {
    const result = plotSincReal(0, 1, 0.5);
    expect(result[0].y).toBe(1);
  });

  test('calculateDefiniteIntegralReal calculates an approximate integral', () => {
    const integral = calculateDefiniteIntegralReal(x => x, 0, 1);
    expect(integral).toBeCloseTo(0.5, 1);
  });

  test('plotBezierReal returns the provided control points', () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 0 }];
    const result = plotBezierReal(points);
    expect(result).toEqual(points);
  });

  test('plotHyperbolaReal returns null for x=0', () => {
    const result = plotHyperbolaReal(0, 2, 1);
    expect(result[0].y).toBeNull();
  });

  test('plotLemniscateReal returns an array of points', () => {
    const result = plotLemniscateReal();
    expect(Array.isArray(result)).toBe(true);
  });

  test('plotEllipseReal returns an array of points', () => {
    const result = plotEllipseReal();
    expect(Array.isArray(result)).toBe(true);
  });

  test('plotCubicReal returns correct cubic values', () => {
    const result = plotCubicReal(0, 2, 1, 1, 0, 0, 0);
    expect(result[2].y).toBeCloseTo(8);
  });

  test('movingMedianReal returns correct medians', () => {
    const result = movingMedianReal([1, 3, 2, 5, 4], 3);
    expect(result).toEqual([2, 3, 4]);
  });

  test('plotGaussianReal returns a plot of gaussian values', () => {
    const result = plotGaussianReal(0, 2, 1);
    expect(Array.isArray(result)).toBe(true);
  });

  test('plotHeatMapReal returns a matrix', () => {
    const result = plotHeatMapReal();
    expect(Array.isArray(result)).toBe(true);
  });

  test('plotSpiralReal returns an array of points', () => {
    const result = plotSpiralReal();
    expect(Array.isArray(result)).toBe(true);
  });

  test('plotScatterReal returns points with x and y properties', () => {
    const result = plotScatterReal();
    expect(result[0]).toHaveProperty('x');
    expect(result[0]).toHaveProperty('y');
  });

  test('plotBarChartReal returns an array of strings', () => {
    const result = plotBarChartReal();
    expect(result.every(str => typeof str === 'string')).toBe(true);
  });

  test('plotLissajousReal returns an array of points', () => {
    const result = plotLissajousReal();
    expect(Array.isArray(result)).toBe(true);
  });

  test('plotCustomReal returns a custom plot', () => {
    const result = plotCustomReal();
    expect(Array.isArray(result)).toBe(true);
  });

  test('plotSinCosCombinedReal returns an array with sin and cos values', () => {
    const result = plotSinCosCombinedReal(0, Math.PI, 1);
    expect(result[0]).toHaveProperty('sin');
    expect(result[0]).toHaveProperty('cos');
  });

  test('fibonacciSequence returns correct sequence', () => {
    const result = fibonacciSequence(5);
    expect(result).toEqual([1, 1, 2, 3, 5]);
  });

  test('plotFibonacciSpiralReal returns an array of points', () => {
    const result = plotFibonacciSpiralReal();
    expect(Array.isArray(result)).toBe(true);
  });

  test('plotCircularPlotReal returns an array of points', () => {
    const result = plotCircularPlotReal({ x: 0, y: 0 }, 5, 36);
    expect(Array.isArray(result)).toBe(true);
  });

  test('plotPolarRoseReal returns an array of points', () => {
    const result = plotPolarRoseReal();
    expect(Array.isArray(result)).toBe(true);
  });

  test('plotStarPolygonReal returns an array of points', () => {
    const result = plotStarPolygonReal({ x: 0, y: 0 }, 5, 2.5, 5);
    expect(Array.isArray(result)).toBe(true);
  });

  test('plotStepFunctionReal returns correct steps', () => {
    const result = plotStepFunctionReal(0, 5, 1, 1);
    expect(result).toBeDefined();
  });

  test('plotGridReal returns an object with plots', () => {
    const result = plotGridReal([plotSineReal, plotCosineReal], 0, Math.PI, Math.PI / 4);
    expect(result).toHaveProperty('plotSineReal');
    expect(result).toHaveProperty('plotCosineReal');
  });

  test('plotPolarHeatmapReal returns an array of points', () => {
    const result = plotPolarHeatmapReal();
    expect(Array.isArray(result)).toBe(true);
  });

  describe('plotDualAxisReal functionality', () => {
    test('should return dual axis plots for two functions', () => {
      const result = plotDualAxisReal(0, 2, 1, Math.sin, Math.cos);
      expect(result).toHaveProperty('plot1');
      expect(result).toHaveProperty('plot2');
      expect(result.plot1.length).toEqual(3);
      expect(result.plot2.length).toEqual(3);
    });
  });

  describe('Newly added extended functions', () => {
    test('plotParametricReal returns correct parametric plot values', () => {
      const result = plotParametricReal(0, Math.PI, Math.PI / 2, t => t, t => 2 * t);
      expect(result).toEqual([
        { t: 0, x: 0, y: 0 },
        { t: Math.PI / 2, x: Math.PI / 2, y: Math.PI },
        { t: Math.PI, x: Math.PI, y: 2 * Math.PI }
      ]);
    });

    test('plotCumulativeAverageReal returns correct cumulative averages', () => {
      const data = [2, 4, 6, 8];
      const result = plotCumulativeAverageReal(data);
      expect(result).toEqual([2, 3, 4, 5]);
    });
  });

  describe('Newly added Inverse Function Feature', () => {
    test('plotInverseFunctionReal returns correct inverse values', () => {
      const result = plotInverseFunctionReal(1, 5, 1, x => x);
      const expected = [
        { x: 1, y: 1 },
        { x: 2, y: 0.5 },
        { x: 3, y: 1/3 },
        { x: 4, y: 0.25 },
        { x: 5, y: 0.2 }
      ];
      expected.forEach((exp, idx) => {
        if(exp.y === null){
          expect(result[idx].y).toBeNull();
        } else {
          expect(result[idx].y).toBeCloseTo(exp.y);
        }
      });
    });
  });

  describe('Newly added visualization functions', () => {
    test('plotBoxPlotReal returns valid box plot summary for non-empty data', () => {
      const result = plotBoxPlotReal([1,2,3,4,5]);
      expect(result).toEqual({ min: 1, q1: 2, median: 3, q3: 4, max: 5 });
    });

    test('plotViolinPlotReal returns density array for non-empty data', () => {
      const result = plotViolinPlotReal([1,2,3,4,5]);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    test('plotDampedOscillationReal returns proper oscillation values', () => {
      const result = plotDampedOscillationReal(0, Math.PI, 0.5);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    test('plotSpiralColoredReal returns points with colors', () => {
      const result = plotSpiralColoredReal(10, 0, 0.1, ['red','blue']);
      expect(result.every(p => typeof p.color === 'string')).toBe(true);
    });
  });

  describe('Newly added custom extensions', () => {
    test('plotCustomFancyReal returns a fancy custom plot', () => {
      const result = plotCustomFancyReal(0, 10, 1);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty('style');
    });

    test('plotInteractiveGuideReal returns a guide string', () => {
      const result = plotInteractiveGuideReal();
      expect(typeof result).toBe('string');
      expect(result).toMatch(/interactive guide/i);
    });
  });

  describe('--plot-detailed flag functionality', () => {
    test('should print Detailed Sine & Cosine Plot Output', async () => {
      process.argv = ['node', 'src/lib/main.js', '--plot-detailed'];
      const spy = vi.spyOn(console, 'log');
      await main();
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('Detailed Sine & Cosine Plot Output:'));
    });
  });

  describe('Newly added complex combined function', () => {
    test('plotComplexFunctionReal returns valid complex plot data', () => {
      const result = plotComplexFunctionReal(0, 10, 1);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('x');
      expect(result[0]).toHaveProperty('y');
    });
  });

  describe('New function: plotCumulativeProductReal', () => {
    test('calculates cumulative product correctly', () => {
      const data = [2, 3, 4];
      const result = plotCumulativeProductReal(data);
      expect(result).toEqual([2, 6, 24]);
    });
  });

  describe('New function: plotExponentialMovingAverageReal', () => {
    test('calculates EMA correctly', () => {
      const data = [10, 20, 30, 40];
      const result = plotExponentialMovingAverageReal(data, 0.5);
      expect(result.length).toBe(data.length);
    });
  });

  describe('New function: plotExponentialSineReal', () => {
    test('calculates Exponential Sine Plot correctly', () => {
      const result = plotExponentialSineReal(0, Math.PI, 0.5, 1, 0.2);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('New function: plotCosineCumulativeSumReal', () => {
    test('calculates Cosine Cumulative Sum correctly', () => {
      const result = plotCosineCumulativeSumReal(0, Math.PI, 0.5);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Mock External Resource Test', () => {
    test('mockExternalResourceTest returns correct message', () => {
      const result = mockExternalResourceTest();
      expect(result).toBe('External resource test complete');
    });
  });

  describe('Test Coverage Hook', () => {
    test('testCoverageHook returns true', () => {
      const result = testCoverageHook();
      expect(result).toBe(true);
    });
  });

  describe('External resource mocking', () => {
    test('loadExpress returns fake module when overridden', async () => {
      overrides.loadExpressOverride = async () => 'fakeExpress';
      const result = await loadExpress();
      expect(result).toBe('fakeExpress');
      resetOverrides();
    });

    test('loadReadline returns fake module when overridden', async () => {
      overrides.loadReadlineOverride = async () => ({ createInterface: () => ({ close: () => {} }) });
      const res = await loadReadline();
      expect(typeof res.createInterface).toBe('function');
      resetOverrides();
    });
  });

  describe('Unknown Flag Handling', () => {
    test('should show help when an unknown flag is passed', async () => {
      process.argv = ['node', 'src/lib/main.js', '--unknown-flag'];
      const spyWarn = vi.spyOn(console, 'warn');
      await main();
      expect(spyWarn).toHaveBeenCalledWith(expect.stringContaining('Unknown option(s): --unknown-flag'));
    });
  });

  describe('--test-coverage-hook flag functionality', () => {
    test('should execute testCoverageHook and log its execution', async () => {
      process.argv = ['node', 'src/lib/main.js', '--test-coverage-hook'];
      const spy = vi.spyOn(console, 'log');
      await main();
      expect(spy).toHaveBeenCalledWith('Test coverage hook executed');
    });
  });

  // New tests for extended functions
  describe('New Extended 3D and Enhanced Decay Functions', () => {
    test('plotSpiral3DReal returns points with x, y, and z', () => {
      const result = plotSpiral3DReal(10, 0, 0.1, 0.05);
      expect(result.length).toBe(10);
      expect(result[0]).toHaveProperty('z');
    });

    test('plotExponentialDecayEnhancedReal returns modified exponential decay values', () => {
      const result = plotExponentialDecayEnhancedReal(0, 2, 1, 0.5, 1);
      expect(result[0].y).toBeCloseTo(Math.exp(0 * -0.5) + 1);
    });
  });

});
