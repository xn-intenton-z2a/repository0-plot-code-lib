import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import { parseExpression, parseRange, generateTimeSeries, main, renderPlot } from '@src/lib/main.js';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

describe('parseExpression', () => {
  test('valid expression returns AST', () => {
    const ast = parseExpression('x^2');
    expect(ast).toBeDefined();
    expect(typeof ast.evaluate).toBe('function');
  });

  test('invalid expression throws error', () => {
    expect(() => parseExpression('x**2')).toThrow(/Invalid expression/);
  });

  test('expression with multiple variables throws error', () => {
    expect(() => parseExpression('x + y')).toThrow(/single variable/);
  });
});

describe('parseRange', () => {
  test('valid range returns parsed values', () => {
    const range = parseRange('x=0:2:1');
    expect(range).toEqual({ variableName: 'x', start: 0, end: 2, step: 1 });
  });

  test('invalid format throws error', () => {
    expect(() => parseRange('0:2:1')).toThrow(/Invalid range format/);
  });

  test('zero step throws error', () => {
    expect(() => parseRange('x=0:2:0')).toThrow(/step must be non-zero/);
  });
});

describe('generateTimeSeries', () => {
  test('generates correct series for x^2', () => {
    const ast = parseExpression('x^2');
    const data = generateTimeSeries(ast, 'x', 0, 2, 1);
    expect(data).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 4 },
    ]);
  });

  test('generates descending series', () => {
    const ast = parseExpression('x');
    const data = generateTimeSeries(ast, 'x', 2, 0, -1);
    expect(data).toEqual([
      { x: 2, y: 2 },
      { x: 1, y: 1 },
      { x: 0, y: 0 },
    ]);
  });
});

describe('renderPlot', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('returns PNG buffer with magic number', async () => {
    const fakeBuffer = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 1, 2, 3]);
    const renderStub = vi.spyOn(ChartJSNodeCanvas.prototype, 'renderToBuffer').mockResolvedValue(fakeBuffer);
    const data = [{ x: 0, y: 0 }];
    const result = await renderPlot(data, { format: 'png', width: 100, height: 100 });
    expect(result).toBeInstanceOf(Buffer);
    expect(result.slice(0, 8)).toEqual(fakeBuffer.slice(0, 8));
    expect(renderStub).toHaveBeenCalled();
  });

  test('returns SVG string starting with <svg and includes labels', async () => {
    const svgContent = '<svg><text>X Label</text><text>Y Label</text></svg>';
    const fakeBuffer = Buffer.from(svgContent, 'utf-8');
    const renderStub = vi.spyOn(ChartJSNodeCanvas.prototype, 'renderToBuffer').mockResolvedValue(fakeBuffer);
    const data = [{ x: 0, y: 0 }];
    const result = await renderPlot(data, { format: 'svg', width: 100, height: 100, labels: { x: 'X Label', y: 'Y Label' } });
    expect(typeof result).toBe('string');
    expect(result.startsWith('<svg')).toBe(true);
    expect(result).toContain('X Label');
    expect(result).toContain('Y Label');
    expect(renderStub).toHaveBeenCalled();
  });

  test('throws error on unsupported format', async () => {
    await expect(renderPlot([], { format: 'jpg', width: 100, height: 100 })).rejects.toThrow(/unsupported format/);
  });
});

describe('CLI integration', () => {
  test('outputs JSON to stdout', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    process.argv = ['node', 'src/lib/main.js', '--expression', 'x+1', '--range', 'x=0:2:1'];
    main();
    expect(logSpy).toHaveBeenCalledWith(
      JSON.stringify(
        [
          { x: 0, y: 1 },
          { x: 1, y: 2 },
          { x: 2, y: 3 },
        ],
        null,
        2
      )
    );
    logSpy.mockRestore();
  });

  test('writes JSON to file when --output provided', () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    process.argv = [
      'node',
      'src/lib/main.js',
      '--expression',
      'x+1',
      '--range',
      'x=0:1:1',
      '--output',
      'out.json',
    ];
    main();
    expect(writeSpy).toHaveBeenCalledWith(
      'out.json',
      JSON.stringify(
        [
          { x: 0, y: 1 },
          { x: 1, y: 2 },
        ],
        null,
        2
      ),
      'utf-8'
    );
    writeSpy.mockRestore();
  });

  describe('NDJSON output', () => {
    test('streams NDJSON to stdout', () => {
      const writeSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => {});
      process.argv = ['node', 'src/lib/main.js', '--expression', 'x+1', '--range', 'x=0:2:1', '--format', 'ndjson'];
      main();
      expect(writeSpy).toHaveBeenCalledTimes(3);
      expect(writeSpy).toHaveBeenNthCalledWith(1, JSON.stringify({ x: 0, y: 1 }) + '\n');
      expect(writeSpy).toHaveBeenNthCalledWith(2, JSON.stringify({ x: 1, y: 2 }) + '\n');
      expect(writeSpy).toHaveBeenNthCalledWith(3, JSON.stringify({ x: 2, y: 3 }) + '\n');
      writeSpy.mockRestore();
    });

    test('writes NDJSON to file when --output provided', () => {
      const fakeStream = { write: vi.fn(), end: vi.fn() };
      const createSpy = vi.spyOn(fs, 'createWriteStream').mockReturnValue(fakeStream);
      process.argv = [
        'node',
        'src/lib/main.js',
        '--expression',
        'x+1',
        '--range',
        'x=0:1:1',
        '--format',
        'ndjson',
        '--output',
        'out.ndjson',
      ];
      main();
      expect(createSpy).toHaveBeenCalledWith('out.ndjson', { encoding: 'utf8' });
      expect(fakeStream.write).toHaveBeenCalledWith(JSON.stringify({ x: 0, y: 1 }) + '\n');
      expect(fakeStream.write).toHaveBeenCalledWith(JSON.stringify({ x: 1, y: 2 }) + '\n');
      expect(fakeStream.end).toHaveBeenCalled();
      createSpy.mockRestore();
    });
  });

  test('CLI: writes SVG to stdout', async () => {
    const fakeSVG = '<svg>test</svg>';
    const fakeBuffer = Buffer.from(fakeSVG, 'utf-8');
    vi.spyOn(ChartJSNodeCanvas.prototype, 'renderToBuffer').mockResolvedValue(fakeBuffer);
    const writeSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => {});
    process.argv = ['node', 'src/lib/main.js', '--expression', 'x', '--range', 'x=0:1:1', '--plot-format', 'svg'];
    await main();
    expect(writeSpy).toHaveBeenCalledWith(expect.stringContaining('<svg'));
    writeSpy.mockRestore();
  });

  test('CLI: writes PNG to file when --output provided', async () => {
    const fakeBuffer = Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]);
    vi.spyOn(ChartJSNodeCanvas.prototype, 'renderToBuffer').mockResolvedValue(fakeBuffer);
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    process.argv = ['node', 'src/lib/main.js', '--expression', 'x', '--range', 'x=0:1:1', '--plot-format', 'png', '--output', 'out.png'];
    const code = await main();
    expect(writeSpy).toHaveBeenCalledWith('out.png', fakeBuffer);
    expect(code).toBe(0);
    writeSpy.mockRestore();
  });
});
