// SPDX-License-Identifier: MIT
import { describe, test, expect, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';

import {
  parseExpression,
  sampleRange,
  evaluateExpressionOverRange,
  loadCSVFromString,
  renderSVG,
  svgToPng,
  savePlot,
  main
} from '../../src/lib/main.js';

describe('Plotting Library', () => {
  test('parseExpression returns a function and computes sin', () => {
    const f = parseExpression('y=Math.sin(x)');
    expect(typeof f).toBe('function');
    expect(f(0)).toBeCloseTo(0);
    expect(f(Math.PI / 2)).toBeCloseTo(1);
  });

  test('sampleRange produces approximately 628 samples for -3.14:0.01:3.14', () => {
    const xs = sampleRange('-3.14:0.01:3.14');
    expect(xs.length).toBeGreaterThan(600);
    expect(xs.length).toBeLessThan(700);
  });

  test('evaluateExpressionOverRange returns points', () => {
    const pts = evaluateExpressionOverRange('y=Math.sin(x)', '-3.14:0.01:3.14');
    expect(pts.length).toBeGreaterThan(600);
    expect(pts[0]).toHaveProperty('x');
    expect(pts[0]).toHaveProperty('y');
  });

  test('loadCSVFromString parses time,value rows', () => {
    const csv = 'time,value\n0,1\n1,2\n2,3\n';
    const data = loadCSVFromString(csv);
    expect(data.length).toBe(3);
    expect(data[1]).toEqual({ time: 1, value: 2 });
  });

  test('renderSVG contains polyline and viewBox', () => {
    const svg = renderSVG([{ x: 0, y: 0 }, { x: 1, y: 1 }]);
    expect(svg).toContain('<polyline');
    expect(svg).toContain('viewBox=');
  });

  test('svgToPng returns a Buffer starting with PNG magic bytes', () => {
    const png = svgToPng('<svg></svg>');
    const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
    expect(Buffer.isBuffer(png)).toBe(true);
    expect(png.slice(0, 8)).toEqual(sig);
  });

  test('savePlot writes svg and png and CLI writes file', async () => {
    const tmpDir = path.join(process.cwd(), 'tests', 'unit', 'tmp-output');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    const svgFile = path.join(tmpDir, 'test.svg');
    const pngFile = path.join(tmpDir, 'test.png');
    const cliOut = path.join(tmpDir, 'cli.svg');

    const svg = renderSVG([{ x: 0, y: 0 }, { x: 1, y: 1 }]);
    await savePlot(svg, svgFile);
    expect(fs.existsSync(svgFile)).toBe(true);
    const txt = fs.readFileSync(svgFile, 'utf8');
    expect(txt).toContain('<svg');

    await savePlot(svg, pngFile);
    expect(fs.existsSync(pngFile)).toBe(true);
    const buf = fs.readFileSync(pngFile);
    const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
    expect(buf.slice(0, 8)).toEqual(sig);

    // CLI should produce a file
    await main(['--expression', 'y=Math.sin(x)', '--range', '-3.14:0.1:3.14', '--file', cliOut]);
    expect(fs.existsSync(cliOut)).toBe(true);

    // cleanup
    try { fs.unlinkSync(svgFile); } catch {}
    try { fs.unlinkSync(pngFile); } catch {}
    try { fs.unlinkSync(cliOut); } catch {}
    try { fs.rmdirSync(tmpDir); } catch {}
  });
});
