// SPDX-License-Identifier: MIT
import { test, expect } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { renderSvg, renderPng, renderSVG, renderPNGFromSVG, savePlotFromSeries } from '../../src/lib/main.js';

const PNG_SIG = Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]);

test('renderSvg returns svg string with polyline and viewBox and correct point count', () => {
  const series = [{ x: 0, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 1 }];
  const svg = renderSvg(series, { width: 300, height: 150 });
  expect(typeof svg).toBe('string');
  expect(svg).toContain('<polyline');
  expect(svg).toMatch(/viewBox/);
  const m = svg.match(/<polyline[^>]*points=["']([^"']+)["']/);
  expect(m).toBeTruthy();
  const pointsStr = m[1];
  const pairs = pointsStr.trim().split(/\s+/);
  expect(pairs.length).toBe(series.length);
});

test('renderPng returns Buffer that starts with PNG signature', () => {
  const svg = renderSVG([{ x: 0, y: 0 }, { x: 1, y: 1 }]);
  const png = renderPng(svg);
  if (Buffer.isBuffer(png)) {
    expect(png.slice(0,8).equals(PNG_SIG)).toBe(true);
  } else if (typeof png === 'string') {
    const buf = Buffer.from(png, 'base64');
    expect(buf.slice(0,8).equals(PNG_SIG)).toBe(true);
  } else {
    throw new Error('Unexpected PNG type');
  }
});

test('savePlotFromSeries writes files to disk (svg and png)', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'plot-save-'));
  try {
    const series = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    const svgPath = path.join(tmp, 'out.svg');
    await savePlotFromSeries(series, svgPath);
    expect(fs.existsSync(svgPath)).toBe(true);
    const svg = fs.readFileSync(svgPath, 'utf8');
    expect(svg).toContain('<polyline');

    const pngPath = path.join(tmp, 'out.png');
    await savePlotFromSeries(series, pngPath);
    expect(fs.existsSync(pngPath)).toBe(true);
    const buf = fs.readFileSync(pngPath);
    expect(buf.slice(0,8).equals(PNG_SIG)).toBe(true);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
