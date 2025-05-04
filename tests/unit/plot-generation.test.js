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
  test('CSV to stdout', async () => {
    const out = await mainCLI(['--expression', 'x+1', '--range', '0:2', '--points', '3', '--format', 'csv']);
    const lines = out.split('\n');
    expect(lines[0]).toBe('x,y');
    expect(lines[1]).toBe('0,1');
    expect(lines[2]).toBe('1,2');
    expect(lines[3]).toBe('2,3');
  });

  test('JSON output', async () => {
    const out = await mainCLI(['--expression', 'x', '--range', '0:2', '--points', '3', '--format', 'json']);
    const arr = JSON.parse(out);
    expect(arr).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ]);
  });

  test('output to file', async () => {
    const tmp = path.join(process.cwd(), 'test_output.txt');
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    const out = await mainCLI([
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

  test('missing flags throws', async () => {
    await expect(mainCLI([])).rejects.toThrow(/Missing required flag --expression/);
    await expect(mainCLI(['--expression', 'x'])).rejects.toThrow(/Missing required flag --range/);
  });
});

// Plot generation tests

describe('Plot generation', () => {
  test('SVG output contains valid structure', async () => {
    const svg = await mainCLI(['plot', '--expression', 'x', '--range', '0:2', '--points', '3', '--plot-format', 'svg', '--width', '200', '--height', '100', '--title', 'Test']);
    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain('<polyline points="');
    expect(svg).toContain('<title>Test</title>');
  });

  test('SVG polyline reflects data points', async () => {
    const svg = await mainCLI(['plot', '--expression', 'x', '--range', '0:2', '--points', '3', '--plot-format', 'svg', '--width', '300', '--height', '300']);
    const match = svg.match(/<polyline points="([^"]+)"/);
    const pts = match[1].split(' ');
    expect(pts).toHaveLength(3);
  });

  test('PNG output writes valid PNG file', async () => {
    const tmp = path.join(process.cwd(), 'plot.png');
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    await mainCLI(['plot', '--expression', 'x', '--range', '0:1', '--points', '2', '--plot-format', 'png', '--width', '100', '--height', '50', '--output-file', tmp]);
    expect(fs.existsSync(tmp)).toBe(true);
    const buf = fs.readFileSync(tmp);
    expect(buf.slice(0, 4)).toEqual(Buffer.from([0x89, 0x50, 0x4e, 0x47]));
    fs.unlinkSync(tmp);
  });

  test('Invalid plot-format throws error', async () => {
    await expect(mainCLI(['plot', '--expression', 'x', '--range', '0:1', '--plot-format', 'bmp'])).rejects.toThrow();
  });

  test('Invalid width/height throws error', async () => {
    await expect(mainCLI(['plot', '--expression', 'x', '--range', '0:1', '--plot-format', 'svg', '--width', '-10'])).rejects.toThrow();
    await expect(mainCLI(['plot', '--expression', 'x', '--range', '0:1', '--plot-format', 'svg', '--height', '0'])).rejects.toThrow();
  });
});
