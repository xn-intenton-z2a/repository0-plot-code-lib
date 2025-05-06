import { describe, test, expect, vi } from 'vitest';
import fs from 'fs';
import { parseExpression, parseRange, generateTimeSeries, main } from '@src/lib/main.js';

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
});