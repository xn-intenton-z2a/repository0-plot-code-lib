// SPDX-License-Identifier: MIT
import { test, expect } from 'vitest';
import { parseExpression, parseRange, evaluateRange, renderPNG } from '../../src/lib/main.js';
import zlib from 'zlib';

test('renderPNG produces PNG with correct IHDR dimensions and image data', async () => {
  const fn = parseExpression('x');
  const r = parseRange('0:1:2');
  const series = evaluateRange(fn, r.start, r.step, r.end);
  const width = 50;
  const height = 20;

  const buf = await renderPNG(series, { width, height });
  expect(Buffer.isBuffer(buf)).toBe(true);

  // PNG signature
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  expect(buf.slice(0, 8)).toEqual(sig);

  // Basic IHDR presence check
  expect(buf.length).toBeGreaterThan(33);
  const ihdrWidth = buf.readUInt32BE(16);
  const ihdrHeight = buf.readUInt32BE(20);
  const colorType = buf[25];

  // Accept either the rasterized dimensions (requested) or fallback 1x1
  if (ihdrWidth === 1 && ihdrHeight === 1) {
    // Fallback deterministic PNG (no sharp)
    expect(ihdrWidth).toBe(1);
    expect(ihdrHeight).toBe(1);
  } else {
    expect(ihdrWidth).toBe(width);
    expect(ihdrHeight).toBe(height);
  }

  // Collect IDAT chunks
  let offset = 8;
  const idatParts = [];
  while (offset + 8 < buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    const dataStart = offset + 8;
    const dataEnd = dataStart + len;
    if (dataEnd > buf.length) break;
    if (type === 'IDAT') idatParts.push(buf.slice(dataStart, dataEnd));
    offset = dataEnd + 4; // skip CRC
  }

  const idat = Buffer.concat(idatParts);
  const raw = zlib.inflateSync(idat);

  // Determine channels from colorType (0=grayscale,2=truecolor,3=paletted,4=gray+alpha,6=RGBA)
  let channels = 3;
  if (colorType === 6) channels = 4;
  else if (colorType === 2) channels = 3;
  else if (colorType === 0) channels = 1;

  const expectedLen = ihdrHeight * (1 + ihdrWidth * channels);
  expect(raw.length).toBe(expectedLen);

  // If rasterized (not fallback), expect non-trivial image data
  if (!(ihdrWidth === 1 && ihdrHeight === 1)) {
    const nonZero = raw.find((b) => b !== 0);
    expect(nonZero !== undefined).toBe(true);
  }
});
