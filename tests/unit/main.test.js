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

  test("should generate enhanced SVG file when provided correct flags including custom rotation", () => {
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
      testFile,
      "--xlabelRotation",
      "20",
      "--ylabelRotation",
      "-45"
    ];
    main();
    const content = fs.readFileSync(testFile, "utf8");
    expect(content.startsWith("<svg")).toBe(true);
    expect(content).toContain('<text');
    expect(content).toMatch(/<text[^>]+transform="rotate\(20,\s*\d+(?:\.\d+)?,\s*\d+(?:\.\d+)?\)"/);
    expect(content).toMatch(/<text[^>]+transform="rotate\(-45,\s*\d+(?:\.\d+)?,\s*\d+(?:\.\d+)?\)"/);
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

  test("should error if x range numeric order is invalid", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=5:1,y=0:10",
      "--file",
      "output.svg"
    ];
    expect(() => main()).toThrow("Error: Invalid range for x");
  });

  test("should error if y range numeric order is invalid", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=-1:1,y=10:0",
      "--file",
      "output.svg"
    ];
    expect(() => main()).toThrow("Error: Invalid range for y");
  });

  test("should error if expression does not contain variable x", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=5",
      "--range",
      "x=-1:1,y=-1:1",
      "--file",
      "output.svg"
    ];
    expect(() => main()).toThrow("Error: Expression must include the variable 'x'");
  });

  test("should return SVG with custom axis labels when provided", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=0:10,y=0:10",
      "--file",
      "output.svg",
      "--xlabel",
      "MyCustomX",
      "--ylabel",
      "MyCustomY"
    ];
    main();
    const content = fs.readFileSync("output.svg", "utf8");
    expect(content).toContain("MyCustomX");
    expect(content).toContain("MyCustomY");
    fs.unlinkSync("output.svg");
  });

  test("should handle extra whitespace in range parameter", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      " x= 0 : 10 , y= -1 : 5 ",
      "--file",
      "output.svg"
    ];
    main();
    const content = fs.readFileSync("output.svg", "utf8");
    expect(content).toContain("x-axis: 0 to 10");
    expect(content).toContain("y-axis: -1 to 5");
    fs.unlinkSync("output.svg");
  });

  test("should return 400 if evaluated y-value is non-finite", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=1/(x)",
      "--range",
      "x=0:1,y=-1:10",
      "--file",
      "output.svg"
    ];
    expect(() => main()).toThrow(/Error: Expression evaluation resulted in an invalid number at x=/);
  });

  test("should return SVG with custom styling for axis labels when additional query params are provided", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=0:10,y=0:10",
      "--file",
      "output.svg",
      "--xlabelFontSize",
      "16",
      "--xlabelColor",
      "green",
      "--ylabelFontSize",
      "18",
      "--ylabelColor",
      "purple"
    ];
    main();
    const content = fs.readFileSync("output.svg", "utf8");
    expect(content).toContain('font-size="16"');
    expect(content).toContain('fill="green"');
    expect(content).toContain('font-size="18"');
    expect(content).toContain('fill="purple"');
    fs.unlinkSync("output.svg");
  });

  test("should format axis labels with given precision when provided", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=0.1234:10.5678,y=-1.2345:5.6789",
      "--file",
      "output.svg",
      "--xlabelPrecision",
      "2",
      "--ylabelPrecision",
      "3"
    ];
    main();
    const content = fs.readFileSync("output.svg", "utf8");
    expect(content).toContain("x-axis: 0.12 to 10.57");
    expect(content).toContain("y-axis: -1.235 to 5.679");
    fs.unlinkSync("output.svg");
  });

  test("should return SVG with locale-specific axis labels when locale parameter is provided", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=0.1234:10.5678,y=-1.2345:5.6789",
      "--file",
      "output.svg",
      "--locale",
      "de-DE",
      "--xlabelPrecision",
      "2",
      "--ylabelPrecision",
      "3"
    ];
    main();
    const content = fs.readFileSync("output.svg", "utf8");
    expect(content).toMatch(/x-axis: 0,12 to 10,57/);
    expect(content).toMatch(/y-axis: -1,235 to 5,679/);
    fs.unlinkSync("output.svg");
  });

  test("should include ARIA attributes in SVG axis labels", () => {
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=0:10,y=0:10",
      "--file",
      "output.svg"
    ];
    main();
    const content = fs.readFileSync("output.svg", "utf8");
    expect(content).toContain('aria-label="x-axis: 0 to 10"');
    expect(content).toContain('aria-label="y-axis: 0 to 10"');
    fs.unlinkSync("output.svg");
  });

  test("should output SVG with custom aria-label attributes from CLI flags", () => {
    const testFile = "output.svg";
    if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=0:10,y=0:10",
      "--file",
      testFile,
      "--xlabelAriaLabel",
      "CLI_CustomX",
      "--ylabelAriaLabel",
      "CLI_CustomY"
    ];
    main();
    const content = fs.readFileSync(testFile, "utf8");
    expect(content).toContain('aria-label="CLI_CustomX"');
    expect(content).toContain('aria-label="CLI_CustomY"');
    fs.unlinkSync(testFile);
  });

  test("should output SVG with custom text-anchor attributes from CLI flags", () => {
    const testFile = "output.svg";
    if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=0:10,y=0:10",
      "--file",
      testFile,
      "--xlabelAnchor",
      "end",
      "--ylabelAnchor",
      "start"
    ];
    main();
    const content = fs.readFileSync(testFile, "utf8");
    expect(content).toContain('text-anchor="end"');
    expect(content).toContain('text-anchor="start"');
    fs.unlinkSync(testFile);
  });

  test("should generate detailed JSON output when --jsonExport flag is provided", () => {
    const testFile = "output.json";
    if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
    process.argv = [
      "node",
      "src/lib/main.js",
      "--expression",
      "y=sin(x)",
      "--range",
      "x=0:10,y=0:10",
      "--file",
      testFile,
      "--jsonExport",
      "true"
    ];
    main();
    const content = fs.readFileSync(testFile, "utf8");
    const data = JSON.parse(content);
    expect(data).toHaveProperty("points");
    expect(data.points).toHaveLength(100);
    expect(data).toHaveProperty("computedXRange");
    expect(data).toHaveProperty("computedYRange");
    expect(data).toHaveProperty("axisLabels");
    fs.unlinkSync(testFile);
  });

  describe("CLI Config flag", () => {
    const configFile = "test_config.json";
    afterEach(() => {
      if (fs.existsSync(configFile)) fs.unlinkSync(configFile);
      if (fs.existsSync("output_config.svg")) fs.unlinkSync("output_config.svg");
    });

    test("should merge configuration from a valid config file with CLI override", () => {
      const configData = {
        expression: "y=cos(x)",
        range: "x=-2:2,y=-1:1",
        xlabel: "ConfigX",
        ylabel: "ConfigY"
      };
      fs.writeFileSync(configFile, JSON.stringify(configData), "utf8");
      // CLI overrides expression and file
      process.argv = [
        "node",
        "src/lib/main.js",
        "--config",
        configFile,
        "--expression",
        "y=sin(x)",
        "--file",
        "output_config.svg"
      ];
      main();
      const content = fs.readFileSync("output_config.svg", "utf8");
      // Check that the expression from CLI overrides config, but other values come from config
      expect(content).toContain("Plot for: y=sin(x) in range x=-2:2,y=-1:1");
      expect(content).toContain("ConfigX");
      expect(content).toContain("ConfigY");
    });

    test("should error if config file does not exist", () => {
      process.argv = [
        "node",
        "src/lib/main.js",
        "--config",
        "nonexistent.json",
        "--expression",
        "y=sin(x)",
        "--range",
        "x=-1:1,y=-1:1",
        "--file",
        "output.svg"
      ];
      expect(() => main()).toThrow(/Error: Unable to read or parse configuration file/);
    });

    test("should error if config file contains invalid JSON", () => {
      fs.writeFileSync(configFile, "{ invalid json }", "utf8");
      process.argv = [
        "node",
        "src/lib/main.js",
        "--config",
        configFile,
        "--expression",
        "y=sin(x)",
        "--range",
        "x=-1:1,y=-1:1",
        "--file",
        "output.svg"
      ];
      expect(() => main()).toThrow(/Error: Unable to read or parse configuration file/);
    });
  });
});

afterAll(() => {
  process.argv = originalArgv;
});
