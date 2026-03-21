// SPDX-License-Identifier: MIT
import { test, expect } from 'vitest';
import { spawnSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';

const node = process.execPath;
const script = path.resolve('src/lib/main.js');

test('CLI --help prints usage and examples', () => {
  const res = spawnSync(node, [script, '--help'], { encoding: 'utf8' });
  expect(res.status).toBe(0);
  expect(res.stdout).toBeTruthy();
  expect(res.stdout).toMatch(/Usage/);
  expect(res.stdout).toMatch(/--expression/);
  expect(res.stdout).toMatch(/--range/);
  expect(res.stdout).toMatch(/--file/);
  expect(res.stdout).toMatch(/y=Math.sin/);
});

test('CLI writes SVG and PNG files and contents are valid', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'plot-e2e-'));
  try {
    const svgPath = path.join(tmp, 'out.svg');
    let res = spawnSync(node, [script, '--expression', 'y=Math.sin(x)', '--range', '-3.14:0.01:3.14', '--file', svgPath], { encoding: 'utf8' });
    expect(res.status).toBe(0);
    expect(fs.existsSync(svgPath)).toBe(true);
    const svg = fs.readFileSync(svgPath, 'utf8');
    expect(svg).toContain('<polyline');
    expect(svg).toMatch(/viewBox=/);

    const pngPath = path.join(tmp, 'out.png');
    res = spawnSync(node, [script, '--expression', 'y=Math.sin(x)', '--range', '-3.14:0.01:3.14', '--file', pngPath], { encoding: 'utf8' });
    expect(res.status).toBe(0);
    expect(fs.existsSync(pngPath)).toBe(true);
    const buf = fs.readFileSync(pngPath);
    expect(buf.slice(0,8).equals(Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]))).toBe(true);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
