import { describe, test, expect, vi } from 'vitest';
import * as mainModule from '@src/lib/main.js';

const {
  main,
  loadExpress,
  loadReadline
  // other functions can be imported if needed
} = mainModule;

// Helper to reset overrides after tests
function resetOverrides() {
  mainModule.loadExpressOverride = undefined;
  mainModule.loadReadlineOverride = undefined;
}

// Main Function Behaviour Tests

describe('Main Function Behaviour', () => {
  test('should output demo message when no arguments are provided', () => {
    const spy = vi.spyOn(console, 'log');
    main([]);
    expect(spy).toHaveBeenCalledWith(`Welcome to repository0-plot-code-lib CLI: Embracing our mission 'Be a go-to plot library with a CLI, be the jq of formulae visualisations.'\nSelect from modes: --interactive, --serve, --diagnostics, --plot-abs, --export-csv, --export-md, --export-json, --export-html, --export-ascii, --export-svg, --export-xml, --export-latex, --export-txt, --export-r, --bar-chart, --scatter, --plot-parametric, --plot-poly, --lissajous, --lemniscate, --hyperbola, --power-plot or provide plot parameters.\nFor contribution guidelines, please refer to CONTRIBUTING.md.`);
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

    mainModule.loadReadlineOverride = () => Promise.resolve(fakeReadlineModule);

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
      question: (_prompt, _callback) => { /* no callback invocation */ },
      close: vi.fn()
    };
    const fakeReadlineModule = {
      createInterface: () => fakeInterface
    };

    mainModule.loadReadlineOverride = () => Promise.resolve(fakeReadlineModule);

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
    mainModule.loadExpressOverride = () => Promise.resolve({ default: fakeExpress } ) || fakeExpress;

    process.env.VITEST = 'true';
    await main(['--serve']);
    expect(spy).toHaveBeenCalledWith(`Express server running at http://localhost:3000`);
    spy.mockRestore();
    resetOverrides();
  });

  test('should catch error and print error message when express fails in --serve mode', async () => {
    const spy = vi.spyOn(console, 'error');
    process.env.VITEST = '';
    mainModule.loadExpressOverride = () => Promise.reject(new Error('express failure'));
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

  test('should output Scatter plot when --scatter flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--scatter']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Scatter Plot Output:'), expect.any(Array));
    spy.mockRestore();
  });

  test('should output Bar Chart when --bar-chart flag is provided', () => {
    const spy = vi.spyOn(console, 'log');
    main(['--bar-chart']);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Bar Chart Output:'), expect.any(String));
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
    expect(debugString).toContain('plotPower');
    expect(debugString).toContain('plotCustom');
    expect(debugString).toContain('exportPlotAsXML');
    expect(debugString).toContain('exportPlotAsLaTeX');
    expect(debugString).toContain('exportPlotAsTXT');
    expect(debugString).toContain('plotPolynomial');
    expect(debugString).toContain('plotModulatedSine');
    expect(debugString).toContain('plotSpiral');
    expect(debugString).toContain('calculateDefiniteIntegral');
    expect(debugString).toContain('plotEllipse');
    // New functions check
    expect(debugString).toContain('plotSigmoid');
    expect(debugString).toContain('plotSinc');
    expect(debugString).toContain('plotReLU');
    expect(debugString).toContain('movingMedian');
    expect(debugString).toContain('plotInverse');
    expect(debugString).toContain('cumulativeSum');
    expect(debugString).toContain('plotLogLog');
    expect(debugString).toContain('boxPlot');
    expect(debugString).toContain('plotDampedOscillation');
    expect(debugString).toContain('plotRational');
    expect(debugString).toContain('plotStep');
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
    mainModule.loadReadlineOverride = () => Promise.reject(new Error('readline failure'));
    const spyError = vi.spyOn(console, 'error');
    await main(['--interactive']);
    expect(spyError).toHaveBeenCalledWith('Error loading readline module:', expect.any(Error));
    spyError.mockRestore();
    resetOverrides();
  });

  test('loadExpress should handle failure gracefully', async () => {
    mainModule.loadExpressOverride = () => Promise.reject(new Error('express failure'));
    const spyError = vi.spyOn(console, 'error');
    process.env.VITEST = '';
    await main(['--serve']);
    expect(spyError).toHaveBeenCalledWith('Error starting server:', expect.any(Error));
    spyError.mockRestore();
    resetOverrides();
  });
});
