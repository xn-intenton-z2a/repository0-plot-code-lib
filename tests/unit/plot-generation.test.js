import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import { main } from '@src/lib/main.js';

describe('TIME_SERIES_GENERATION CLI', () => {
  let consoleLogSpy;
  let consoleErrorSpy;
  let writeFileSyncSpy;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    writeFileSyncSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('outputs JSON correctly to stdout', () => {
    main(['--expression', 'y=2*x', '--range', 'x=0:2:1']);
    expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify([
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 4 }
    ], null, 2));
  });

  test('outputs CSV correctly to stdout', () => {
    main(['--expression', 'y=x+1', '--range', 'x=0:2:1', '--format', 'csv']);
    expect(consoleLogSpy).toHaveBeenCalledWith('x,y\n0,1\n1,2\n2,3');
  });

  test('writes output to file when --file is provided', () => {
    main(['--expression', 'y=x', '--range', 'x=0:1:1', '--file', 'out.txt']);
    expect(writeFileSyncSpy).toHaveBeenCalledWith('out.txt', JSON.stringify([
      { x: 0, y: 0 },
      { x: 1, y: 1 }
    ], null, 2));
  });

  test('exits with code 1 on invalid expression syntax', () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => { throw new Error('process.exit'); });
    expect(() => main(['--expression', 'invalid', '--range', 'x=0:1:1'])).toThrow('process.exit');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error: --expression must follow y=<expression>');
    exitSpy.mockRestore();
  });

  test('exits with code 1 on invalid range format', () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => { throw new Error('process.exit'); });
    expect(() => main(['--expression', 'y=x', '--range', 'invalid'])).toThrow('process.exit');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error: --range must be in form x=start:end:step');
    exitSpy.mockRestore();
  });

  test('exits with code 1 on unsupported format', () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => { throw new Error('process.exit'); });
    expect(() => main(['--expression', 'y=x', '--range', 'x=0:1:1', '--format', 'xml'])).toThrow('process.exit');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error: --format must be json or csv');
    exitSpy.mockRestore();
  });
});
