// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { parseExpression, parseRange, evaluateRange, renderSVG, renderPNG } from '../../src/lib/main.js';
import { execFileSync } from 'child_process';

describe('Core library end-to-end', () => {
  test('parseExpression and evaluateRange (sine) produce expected values and count', () => {
    const f = parseExpression('y=Math.sin(x)');
    expect(typeof f).toBe('function');
    expect(Math.abs(f(0) - 0)).toBeLessThan(1e-12);
    expect(Math.abs(f(Math.PI / 2) - 1)).toBeLessThan(1e-9);

    const r = parseRange('-3.14:0.01:3.14');
    const pts = evaluateRange(f, r.start, r.step, r.end);
    // Inclusive stepping: (3.14 - (-3.14)) / 0.01 + 1 = 629
    expect(pts.length).toBe(629);
    expect(Math.abs(pts[0].x - (-3.14))).toBeLessThan(1e-12);
    expect(Math.abs(pts[pts.length - 1].x - 3.14)).toBeLessThan(1e-12);

    // spot-check y value correctness
    expect(Math.abs(pts[0].y - Math.sin(pts[0].x))).toBeLessThan(1e-9);
  });

  test('renderSVG returns string with <polyline> and viewBox', () => {
    const series = [ { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 } ];
    const svg = renderSVG(series, { width: 300, height: 120 });
    expect(typeof svg).toBe('string');
    expect(svg).toContain('<polyline');
    expect(svg).toMatch(/viewBox="0 0 \d+ \d+"/);
  });

  test('renderPNG returns a Buffer starting with PNG magic bytes', async () => {
    const series = [ { x: 0, y: 0 }, { x: 1, y: 1 } ];
    const buf = await renderPNG(series, { width: 100, height: 50 });
    expect(Buffer.isBuffer(buf)).toBe(true);
    const magic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(buf.slice(0, 8)).toEqual(magic);
  });

  test('CLI --help prints usage and example command', () => {
    const out = execFileSync('node', ['src/lib/main.js', '--help'], { encoding: 'utf8' });
    expect(out).toContain('Usage');
    expect(out).toContain('--expression');
    // README and usage show an example with "node src/lib/main.js"
    expect(out).toContain('node src/lib/main.js');
  });
});
