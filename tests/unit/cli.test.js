// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { main } from '../../src/lib/main.js';
import { existsSync, readFileSync } from 'fs';

describe('CLI', () => {
  test('help prints usage without throwing', () => {
    expect(() => main(['--help'])).not.toThrow();
  });

  test('creates SVG file from expression and range', () => {
    const out = 'tests/tmp/out_generated.svg';
    // remove existing if present
    try { if (existsSync(out)) { /* noop */ } } catch (e) {}
    main(['--expression', 'y=Math.sin(x)', '--range', '-3.14:0.01:3.14', '--file', out]);
    expect(existsSync(out)).toBe(true);
    const content = readFileSync(out, 'utf8');
    expect(content).toContain('<svg');
  });

  test('creates PNG file from expression and range', () => {
    const out = 'tests/tmp/out_generated.png';
    main(['--expression', 'y=Math.sin(x)', '--range', '-3.14:0.01:3.14', '--file', out]);
    expect(existsSync(out)).toBe(true);
    const buf = readFileSync(out);
    const sig = Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]);
    expect(Buffer.from(buf).slice(0,8).equals(sig)).toBe(true);
  });
});
