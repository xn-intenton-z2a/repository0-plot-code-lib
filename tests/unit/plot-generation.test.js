import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  parseRange,
  evaluateExpression,
  serializeCSV,
  serializeJSON,
  mainCLI,
} from '@src/lib/main.js';

describe('parseRange', () => {
  test('evenly spaced default points', () => {
    const arr = parseRange('0:10');
    expect(arr).toHaveLength(100);
    expect(arr[0]).toBeCloseTo(0);
    expect(arr[arr.length - 1]).toBeCloseTo(10);
  });

  test('custom step range', () => {
    const arr = parseRange('-1:1:0.5');
    expect(arr).toEqual([-1, -0.5, 0, 0.5, 1]);
  });

  test('invalid format throws', () => {
    expect(() => parseRange('0')).toThrow('Invalid range format');
    expect(() => parseRange('a:b')).toThrow('Invalid range numbers');
    expect(() => parseRange('0:10:0')).toThrow('Step cannot be zero');
  });
});

describe('evaluateExpression', () => {
  test('simple multiplication', () => {
    const data = evaluateExpression('x*2', [1, 2, 3]);
    expect(data).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 4 },
      { x: 3, y: 6 },
    ]);
  });

  test('invalid expression throws', () => {
    expect(() => evaluateExpression('unknownFunc(x)', [1])).toThrow(/Expression evaluation error/);
  });
});

describe('serializeCSV and serializeJSON', () => {
  const sample = [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ];
  test('CSV output', () => {
    const csv = serializeCSV(sample);
    expect(csv.split('\n')).toEqual(['x,y', '0,0', '1,1']);
  });
  test('JSON output', () => {
    const json = serializeJSON(sample);
    const parsed = JSON.parse(json);
    expect(parsed).toEqual(sample);
  });
});

describe('mainCLI', () => {
  test('CSV to stdout', () => {
    const out = mainCLI(['--expression', 'x+1', '--range', '0:2', '--points', '3', '--format', 'csv']);
    const lines = out.split('\n');
    expect(lines[0]).toBe('x,y');
    expect(lines[1]).toBe('0,1');
    expect(lines[2]).toBe('1,2');
    expect(lines[3]).toBe('2,3');
  });

  test('JSON output', () => {
    const out = mainCLI(['--expression', 'x', '--range', '0:2', '--points', '3', '--format', 'json']);
    const arr = JSON.parse(out);
    expect(arr).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ]);
  });

  test('output to file', () => {
    const tmp = path.join(process.cwd(), 'test_output.txt');
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    const out = mainCLI([
      '--expression', 'x',
      '--range', '0:1',
      '--points', '2',
      '--format', 'csv',
      '--output-file', tmp,
    ]);
    expect(fs.existsSync(tmp)).toBe(true);
    const content = fs.readFileSync(tmp, 'utf8');
    expect(content.trim()).toBe(out.trim());
    fs.unlinkSync(tmp);
  });

  test('missing flags throws', () => {
    expect(() => mainCLI([])).toThrow(/Missing required flag --expression/);
    expect(() => mainCLI(['--expression', 'x'])).toThrow(/Missing required flag --range/);
  });
});
