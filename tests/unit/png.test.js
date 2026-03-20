// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { renderPNG } from "../../src/lib/main.js";

describe("PNG renderer", () => {
  test("PNG output begins with PNG magic bytes", () => {
    const series = [ { x: 0, y: 0 }, { x: 1, y: 1 } ];
    const buf = renderPNG(series);
    expect(buf[0]).toBe(0x89);
    expect(buf[1]).toBe(0x50);
    expect(buf[2]).toBe(0x4E);
    expect(buf[3]).toBe(0x47);
  });
});
