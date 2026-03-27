// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { main } from "../../src/lib/main.js";
import { readFileSync, existsSync, unlinkSync } from "fs";

describe("CLI", () => {
  test("--help prints usage and exits", () => {
    // Should not throw
    main(["--help"]);
  });

  test("CLI writes an SVG file from expression and range", () => {
    const out = "tests/tmp/out_generated.svg";
    try {
      main(["--expression", "y=Math.sin(x)", "--range", "-3.14:0.1:3.14", "--file", out]);
      expect(existsSync(out)).toBe(true);
      const content = readFileSync(out, "utf8");
      expect(content).toContain("<polyline");
    } finally {
      // cleanup
      try { if (existsSync(out)) { unlinkSync(out); } } catch {}
    }
  });
});
