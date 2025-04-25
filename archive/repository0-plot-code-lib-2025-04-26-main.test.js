import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { main } from "@src/lib/main.js";
import * as mainModule from "@src/lib/main.js";
import fs from "fs";

// Helper to remove test files if they exist
const TEST_PNG = "tests/tmp_test_output.png";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error when no file flag is provided", async () => {
    // Capture console output
    const logSpy = [];
    const originalLog = console.log;
    console.log = (msg) => logSpy.push(msg);

    await main([]);
    expect(logSpy.length).toBeGreaterThan(0);
    // Restore console.log
    console.log = originalLog;
  });
});

describe("PNG Generation via CLI", () => {
  beforeEach(() => {
    if (fs.existsSync(TEST_PNG)) {
      fs.unlinkSync(TEST_PNG);
    }
  });

  afterEach(() => {
    if (fs.existsSync(TEST_PNG)) {
      fs.unlinkSync(TEST_PNG);
    }
  });

  test("should generate PNG file when --file flag ends with .png", async () => {
    await main(["--file", TEST_PNG]);
    expect(fs.existsSync(TEST_PNG)).toBe(true);
    const fileData = fs.readFileSync(TEST_PNG);
    // PNG signature: 89 50 4E 47 0D 0A 1A 0A
    const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
    expect(fileData.slice(0, 8)).toEqual(pngSignature);
  });

  test("should generate SVG file when --file flag does not end with .png", async () => {
    const testSVG = "tests/tmp_test_output.svg";
    if (fs.existsSync(testSVG)) {
      fs.unlinkSync(testSVG);
    }
    await main(["--file", testSVG]);
    expect(fs.existsSync(testSVG)).toBe(true);
    const fileData = fs.readFileSync(testSVG, { encoding: 'utf8' });
    expect(fileData).toContain('<svg');
    // Clean up
    fs.unlinkSync(testSVG);
  });
});

describe("CLI Help Flag", () => {
  test("should display help message when --help flag is provided", async () => {
    const logSpy = [];
    const originalLog = console.log;
    console.log = (msg) => logSpy.push(msg);

    let exitCode = null;
    const originalExit = process.exit;
    process.exit = (code) => { exitCode = code; throw new Error('process.exit called'); };

    try {
      await main(["--help"]);
    } catch (err) {
      // Expected error due to process.exit being called
    }

    const output = logSpy.join(' ');
    expect(output).toMatch("--file");
    expect(output).toMatch("--expression");
    expect(output).toMatch("--range");
    expect(output).toMatch("--help");
    expect(exitCode).toBe(0);

    console.log = originalLog;
    process.exit = originalExit;
  });
});

describe("SVG Generation with expression and range", () => {
  test("should generate SVG file with expression and range text when provided", async () => {
    const testSVG = "tests/tmp_test_output_expr.svg";
    if (fs.existsSync(testSVG)) {
      fs.unlinkSync(testSVG);
    }
    const expressionStr = "y=sin(x)";
    const rangeStr = "x=-1:1,y=-1:1";
    await main(["--expression", expressionStr, "--range", rangeStr, "--file", testSVG]);
    expect(fs.existsSync(testSVG)).toBe(true);
    const fileContent = fs.readFileSync(testSVG, { encoding: 'utf8' });
    expect(fileContent).toContain(`Expression: ${expressionStr}`);
    expect(fileContent).toContain(`Range: ${rangeStr}`);
    fs.unlinkSync(testSVG);
  });
});

describe("Input Validation Errors", () => {
  test("should error with empty --expression value", async () => {
    const errorSpy = [];
    const originalError = console.error;
    console.error = (msg) => errorSpy.push(msg);

    let exitCalled = false;
    const originalExit = process.exit;
    process.exit = (code) => { exitCalled = true; throw new Error('process.exit ' + code); };

    try {
      await main(["--expression", "", "--file", "tests/tmp_test_output.svg"]);
    } catch (err) {
      // Expected error
    }

    expect(exitCalled).toBe(true);
    expect(errorSpy.join(' ').toLowerCase()).toContain("error: --expression requires a non-empty value");

    console.error = originalError;
    process.exit = originalExit;
  });

  test("should error with invalid --range format", async () => {
    const errorSpy = [];
    const originalError = console.error;
    console.error = (msg) => errorSpy.push(msg);

    let exitCalled = false;
    const originalExit = process.exit;
    process.exit = (code) => { exitCalled = true; throw new Error('process.exit ' + code); };

    try {
      await main(["--range", "incorrect_format", "--file", "tests/tmp_test_output.svg"]);
    } catch (err) {
      // Expected error
    }

    expect(exitCalled).toBe(true);
    expect(errorSpy.join(' ').toLowerCase()).toContain("error: --range flag invalid format");

    console.error = originalError;
    process.exit = originalExit;
  });
});

describe("Custom Plot Styling", () => {
  test("should apply custom color when --color flag is provided", async () => {
    const testSVG = "tests/tmp_test_color.svg";
    if (fs.existsSync(testSVG)) {
      fs.unlinkSync(testSVG);
    }
    await main(["--color", "coral", "--file", testSVG]);
    expect(fs.existsSync(testSVG)).toBe(true);
    const fileContent = fs.readFileSync(testSVG, { encoding: "utf8" });
    expect(fileContent).toContain('<rect width="100%" height="100%" fill="coral"');
    fs.unlinkSync(testSVG);
  });

  test("should apply custom dimensions when --dimensions flag is provided", async () => {
    const testSVG = "tests/tmp_test_dimensions.svg";
    if (fs.existsSync(testSVG)) {
      fs.unlinkSync(testSVG);
    }
    await main(["--dimensions", "400:300", "--file", testSVG]);
    expect(fs.existsSync(testSVG)).toBe(true);
    const fileContent = fs.readFileSync(testSVG, { encoding: "utf8" });
    expect(fileContent).toContain('width="400"');
    expect(fileContent).toContain('height="300"');
    fs.unlinkSync(testSVG);
  });

  test("should error with invalid --dimensions format", async () => {
    const errorSpy = [];
    const originalError = console.error;
    console.error = (msg) => errorSpy.push(msg);

    let exitCalled = false;
    const originalExit = process.exit;
    process.exit = (code) => { exitCalled = true; throw new Error('process.exit ' + code); };

    try {
      await main(["--dimensions", "400300", "--file", "tests/tmp_invalid_dimensions.svg"]);
    } catch (err) {
      // Expected error
    }

    expect(exitCalled).toBe(true);
    expect(errorSpy.join(' ').toLowerCase()).toContain('--dimensions requires a value in the format');

    console.error = originalError;
    process.exit = originalExit;
  });
});
