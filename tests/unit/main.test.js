import { describe, test, expect, beforeEach, afterEach, afterAll } from "vitest";
import { main, app } from "@src/lib/main.js";
import * as mainModule from "@src/lib/main.js";
import fs from "fs";
import path from "path";

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

  test("should generate enhanced SVG file when provided correct flags", () => {
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
    expect(content).toContain('<text x="10" y="20">Plot for: y=sin(x) in range x=-1:1,y=-1:1</text>');
    expect(content).toContain("<polyline");
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

  test("should error when --expression is empty", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "",
      "--range",
      "x=-1:1,y=-1:1",
      "--file",
      "output.svg"
    ];
    expect(() => main()).toThrow("Error: --expression flag must have a non-empty value.");
  });

  test("should error when --range is empty", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "",
      "--file",
      "output.svg"
    ];
    expect(() => main()).toThrow("Error: --range flag must have a non-empty value.");
  });

  test("should error when --file is empty", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=-1:1,y=-1:1",
      "--file",
      ""
    ];
    expect(() => main()).toThrow("Error: --file flag must have a non-empty value.");
  });

  test("should error if --range is malformed", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=-1:1,y=abc",
      "--file",
      "output.svg"
    ];
    expect(() => main()).toThrow("Error: --range flag value is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values.");
  });

  // New Tests for Floating Point Ranges
  test("should generate SVG file with floating point range when provided correct flags", () => {
    const testFile = "test_output_fp.svg";
    if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=-1.5:2.5,y=-0.5:0.5",
      "--file",
      testFile
    ];
    main();
    const content = fs.readFileSync(testFile, "utf8");
    expect(content.startsWith("<svg")).toBe(true);
    expect(content).toContain('<text x="10" y="20">Plot for: y=sin(x) in range x=-1.5:2.5,y=-0.5:0.5</text>');
    expect(content).toContain("<polyline");
    fs.unlinkSync(testFile);
  });

  test("should generate PNG file with floating point range when provided correct flags", () => {
    const testFile = "test_output_fp.png";
    if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=cos(x)",
      "--range",
      "x=-2.0:3.5,y=-1.5:1.5",
      "--file",
      testFile
    ];
    main();
    const buffer = fs.readFileSync(testFile);
    const signature = buffer.slice(0, 8);
    expect(signature.equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe(true);
    fs.unlinkSync(testFile);
  });

  test("should display help message when --help flag is provided", () => {
    let output = "";
    const originalConsoleLog = console.log;
    console.log = (msg, ...args) => { output += msg; if(args.length) output += " " + args.join(" "); };
    process.argv = ["node", "src/lib/main.js", "--help"];
    main();
    console.log = originalConsoleLog;
    expect(output).toContain("Usage: node src/lib/main.js");
    expect(output).toContain("--help");
    expect(output).toContain("--verbose");
    expect(output).toContain("--expression");
  });

  test("should output verbose debug information when --verbose flag is provided", () => {
    const testFile = "test_verbose.svg";
    if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
    let output = "";
    const originalConsoleLog = console.log;
    console.log = (msg, ...args) => { output += msg; if(args.length) output += " " + args.join(" "); };
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=-1:1,y=-1:1",
      "--file",
      testFile,
      "--verbose"
    ];
    main();
    console.log = originalConsoleLog;
    expect(output).toContain("Verbose Mode Enabled.");
    expect(output).toContain("Parsed flags:");
    expect(fs.existsSync(testFile)).toBe(true);
    fs.unlinkSync(testFile);
  });
});

describe("CLI Version Flag", () => {
  const originalExit = process.exit;
  let originalConsoleLog;

  beforeEach(() => {
    originalConsoleLog = console.log;
    process.exit = (code) => { throw new Error(`Process exit with code ${code}`); };
  });

  afterEach(() => {
    process.exit = originalExit;
    console.log = originalConsoleLog;
  });

  test("should output version and exit when --version flag is provided", () => {
    const pkgPath = path.join(process.cwd(), 'package.json');
    const pkgContent = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(pkgContent);
    const expectedVersion = pkg.version;

    let output = "";
    console.log = (msg, ...args) => { output += msg + (args.length ? " " + args.join(" ") : ""); };

    process.argv = ["node", "src/lib/main.js", "--version"];
    expect(() => main()).toThrow(/Process exit with code 0/);
    expect(output.trim()).toBe(expectedVersion);
  });

  test("should prioritize --version flag even when other flags are provided", () => {
    const pkgPath = path.join(process.cwd(), 'package.json');
    const pkgContent = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(pkgContent);
    const expectedVersion = pkg.version;

    let output = "";
    console.log = (msg, ...args) => { output += msg + (args.length ? " " + args.join(" ") : ""); };

    process.argv = ["node", "src/lib/main.js", "--version", "--expression", "y=sin(x)"];
    expect(() => main()).toThrow(/Process exit with code 0/);
    expect(output.trim()).toBe(expectedVersion);
  });
});

// Restore original argv after all tests
afterAll(() => {
  process.argv = originalArgv;
});
