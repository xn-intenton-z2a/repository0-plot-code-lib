import { describe, test, expect, vi } from 'vitest';
import * as mainModule from '@src/lib/main.js';
import { main, resetOverrides, overrides, movingSumReal, plotCubicBezierReal } from '@src/lib/main.js';

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
    // Expect at least 3 points (t=0, 0.5, 1)
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
