// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { renderPNGFromPoints, encodePNG } from '../../src/lib/main.js';

describe('PNG Renderer', () => {
  test('PNG output starts with PNG magic bytes', () => {
    const buf = encodePNG({ width: 2, height: 2 });
    expect(buf instanceof Uint8Array || Buffer.isBuffer(buf)).toBe(true);
    const sig = Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]);
    expect(Buffer.from(buf).slice(0,8).equals(sig)).toBe(true);
  });

  test('renderPNGFromPoints returns buffer starting with PNG signature', () => {
    const pts = [ { x: 0, y: 0 }, { x: 1, y: 2 } ];
    const buf = renderPNGFromPoints(pts, { width: 10, height: 5 });
    const sig = Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]);
    expect(Buffer.from(buf).slice(0,8).equals(sig)).toBe(true);
  });
});
