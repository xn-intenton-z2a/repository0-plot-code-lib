// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { renderSVG } from '../../src/lib/main.js';

describe('SVG Renderer', () => {
  test('produces SVG with polyline and viewBox', () => {
    const pts = [ { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 } ];
    const svg = renderSVG(pts);
    expect(svg).toContain('<polyline');
    expect(svg).toContain('viewBox=');
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
  });
});
