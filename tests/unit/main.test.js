import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { main, app } from "@src/lib/main.js";
import * as mainModule from "@src/lib/main.js";
import fs from "fs";

// Preserve original process.argv
const originalArgv = process.argv.slice();

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("CLI Plot Generation", () => {
  const originalExit = process.exit;

  beforeEach(() => {
    // Override process.exit to throw an error that can be caught in tests
    process.exit = (code) => { throw new Error(`Process exit with code ${code}`); };
  });

  afterEach(() => {
    process.exit = originalExit;
  });

  test("should generate SVG file when provided correct flags", () => {
    const testFile = "test_output.svg";
    if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=-1:1,y=-1:1",
      "--file",
      testFile
    ];
    main();
    const content = fs.readFileSync(testFile, "utf8");
    expect(content.startsWith("<svg")).toBe(true);
    expect(content.includes("<!-- Plot for expression: y=sin(x) -->")).toBe(true);
    fs.unlinkSync(testFile);
  });

  test("should generate PNG file when provided correct flags", () => {
    const testFile = "test_output.png";
    if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=cos(x)",
      "--range",
      "x=-1:1,y=-1:1",
      "--file",
      testFile
    ];
    main();
    const buffer = fs.readFileSync(testFile);
    const signature = buffer.slice(0, 8);
    expect(signature.equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe(true);
    fs.unlinkSync(testFile);
  });

  test("should error if missing required flags", () => {
    process.argv = ["node", "src/lib/main.js", "--expression", "y=tan(x)"];
    expect(() => main()).toThrow(/Error: --expression, --range, and --file flags are required together./);
  });

  test("should error on unsupported file extension", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=tan(x)",
      "--range",
      "x=-1:1,y=-1:1",
      "--file",
      "output.txt"
    ];
    expect(() => main()).toThrow(/Error: Unsupported file extension/);
  });
});

// Restore original argv after all tests
afterAll(() => {
  process.argv = originalArgv;
});
