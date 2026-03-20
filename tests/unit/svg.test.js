// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { renderSVG } from "../../src/lib/main.js";

describe("SVG renderer", () => {
  test("SVG output contains <polyline> and viewBox", () => {
    const series = [ { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 } ];
    const svg = renderSVG(series, { width: 200, height: 100 });
    expect(svg).toContain("<polyline");
    expect(svg).toContain("viewBox=");
  });
});
