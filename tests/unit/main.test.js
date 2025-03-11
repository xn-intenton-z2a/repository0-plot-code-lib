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
  plotSpiralEnhancedReal
} from '@src/lib/main.js';

// Mock console methods to suppress output during testing
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
});

describe('--reset flag functionality', () => {
  test('should reset overrides when --reset is passed', async () => {
    // Set overrides to dummy values
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

// Additional test for new enhanced spiral plot feature
describe('--plot-spiral-enhanced flag functionality', () => {
  test('should print Enhanced Spiral Plot Output', async () => {
    process.argv = ['node', 'src/lib/main.js', '--plot-spiral-enhanced'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Enhanced Spiral Plot Output:'));
  });
});

// Additional test for new polar heatmap feature
describe('--plot-polar-heatmap flag functionality', () => {
  test('should print Polar Heatmap Plot Output', async () => {
    process.argv = ['node', 'src/lib/main.js', '--plot-polar-heatmap'];
    const spy = vi.spyOn(console, 'log');
    await main();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Polar Heatmap Plot Output:'));
  });
});

// Additional tests for extended functions to increase coverage

describe('Extended Functions Additional Coverage', () => {
  test('generateRange returns correct sequence', () => {
    const range = generateRange(1, 5, 1);
    expect(range).toEqual([1, 2, 3, 4, 5]);
  });

  test('calculateDerivative returns correct derivative value', () => {
    // derivative of x^2 is 2x, at x=3 should be 6
    const result = calculateDerivative('x^2', 'x', 3);
    expect(result).toBeCloseTo(6);
  });

  test('plotSineReal returns a plot array with correct sine values', () => {
    const plot = plotSineReal(0, Math.PI, Math.PI/2);
    expect(plot).toEqual([
      { x: 0, y: 0 },
      { x: Math.PI/2, y: 1 },
      { x: Math.PI, y: 0 }
    ]);
  });

  test('plotCosineReal returns a plot array with correct cosine values', () => {
    const plot = plotCosineReal(0, Math.PI, Math.PI/2);
    expect(plot).toEqual([
      { x: 0, y: 1 },
      { x: Math.PI/2, y: 0 },
      { x: Math.PI, y: -1 }
    ]);
  });
});
