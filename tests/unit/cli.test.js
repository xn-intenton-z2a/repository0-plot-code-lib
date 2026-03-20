// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import fs from "fs";
import { cliMain } from "../../src/lib/main.js";

describe("CLI", () => {
  test("--help prints usage", async () => {
    const logs = [];
    const orig = console.log;
    console.log = (...args) => logs.push(args.join(" "));
    await cliMain(["--help"]);
    console.log = orig;
    expect(logs.join(" ")).toContain("Usage");
  });

  test("expression + range + file writes SVG", async () => {
    const out = "tests/unit/out.svg";
    if (fs.existsSync(out)) fs.unlinkSync(out);
    await cliMain(["--expression", "y=Math.sin(x)", "--range", "-3.14:0.01:3.14", "--file", out]);
    expect(fs.existsSync(out)).toBe(true);
    const content = fs.readFileSync(out, "utf8");
    expect(content).toContain("<svg");
    fs.unlinkSync(out);
  });
});
