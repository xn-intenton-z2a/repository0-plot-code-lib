import { describe, test, expect, beforeEach, afterEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
import { existsSync, readFileSync, unlinkSync } from "fs";

const tempSvgOutputFile = "test_output.svg";
const tempPngOutputFile = "test_output.png";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    // Capture console output
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };
    main();
    console.log = originalLog;
    expect(output).toContain("Run with:");
  });
});

describe("CLI Plot Generation", () => {
  beforeEach(() => {
    if (existsSync(tempSvgOutputFile)) {
      unlinkSync(tempSvgOutputFile);
    }
    if (existsSync(tempPngOutputFile)) {
      unlinkSync(tempPngOutputFile);
    }
  });

  afterEach(() => {
    if (existsSync(tempSvgOutputFile)) {
      unlinkSync(tempSvgOutputFile);
    }
    if (existsSync(tempPngOutputFile)) {
      unlinkSync(tempPngOutputFile);
    }
  });

  test("should generate a valid SVG plot file with proper SVG markup, embedded time series data, and a polyline element", () => {
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-1:1,y=-1:1",
      "--file", tempSvgOutputFile
    ];

    // Capture console output
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };
    main(args);
    console.log = originalLog;

    // Verify file was created
    expect(existsSync(tempSvgOutputFile)).toBe(true);

    // Read the file content and validate it is valid SVG markup
    const fileContent = readFileSync(tempSvgOutputFile, "utf-8");
    expect(fileContent.trim().startsWith("<svg")).toBe(true);
    const expectedText = `Plot generated for expression: y=sin(x) with range: x=-1:1,y=-1:1`;
    expect(fileContent).toContain(expectedText);
    // Check that time series data is embedded
    expect(fileContent).toContain("polyline");
    expect(fileContent).toMatch(new RegExp('<polyline\s+points="'));

    // Verify console message
    expect(output).toContain(`Plot written to file ${tempSvgOutputFile}`);
  });

  test("should generate a PNG plot file with placeholder content and embedded time series data", () => {
    const args = [
      "--expression", "y=tan(x)",
      "--range", "x=-2:2,y=-2:2",
      "--file", tempPngOutputFile
    ];

    // Capture console output
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };
    main(args);
    console.log = originalLog;

    // Verify file was created
    expect(existsSync(tempPngOutputFile)).toBe(true);

    // Read the file content and validate
    const fileContent = readFileSync(tempPngOutputFile, "utf-8");
    const expectedContentStart = "PNG Plot generated for expression: y=tan(x) with range: x=-2:2,y=-2:2";
    expect(fileContent).toContain(expectedContentStart);
    // Check that time series data is appended
    expect(fileContent).toContain("Time Series Data:");
    expect(fileContent).toMatch(/\{\s*"x":/);

    // Verify console message
    expect(output).toContain(`Plot written to file ${tempPngOutputFile}`);
  });
});

describe("CLI Input Validation", () => {
  test("should print error message for empty expression", () => {
    const args = [
      "--expression", "",
      "--range", "x=-1:1,y=-1:1",
      "--file", tempSvgOutputFile
    ];
    let errorOutput = "";
    const originalError = console.error;
    console.error = (msg) => { errorOutput += msg; };
    main(args);
    console.error = originalError;
    expect(errorOutput).toContain("Expression cannot be empty");
    expect(existsSync(tempSvgOutputFile)).toBe(false);
  });

  test("should print error message for invalid range format", () => {
    const args = [
      "--expression", "y=sin(x)",
      "--range", "invalid_range",
      "--file", tempSvgOutputFile
    ];
    let errorOutput = "";
    const originalError = console.error;
    console.error = (msg) => { errorOutput += msg; };
    main(args);
    console.error = originalError;
    expect(errorOutput).toContain("Range must be in the format");
    expect(existsSync(tempSvgOutputFile)).toBe(false);
  });

  test("should print error message for invalid file extension", () => {
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-1:1,y=-1:1",
      "--file", "output.txt"
    ];
    let errorOutput = "";
    const originalError = console.error;
    console.error = (msg) => { errorOutput += msg; };
    main(args);
    console.error = originalError;
    expect(errorOutput).toContain("File must have .svg or .png extension");
    expect(existsSync("output.txt")).toBe(false);
  });
});

describe("CLI JSON Output", () => {
  test("should output valid JSON with plot generation information and not create a file", () => {
    const tempJsonFile = "tempJsonOutput.svg";
    const args = [
      "--expression", "y=log(x)",
      "--range", "x=1:10,y=-1:1",
      "--file", tempJsonFile,
      "--json"
    ];
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };
    main(args);
    console.log = originalLog;
    
    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch (e) {
      parsed = null;
    }
    expect(parsed).not.toBeNull();
    expect(parsed).toHaveProperty("message", "Plot generated");
    expect(parsed).toHaveProperty("expression", "y=log(x)");
    expect(parsed).toHaveProperty("range", "x=1:10,y=-1:1");
    expect(parsed).toHaveProperty("file", tempJsonFile);
    expect(parsed).toHaveProperty("timeSeriesData");
    expect(Array.isArray(parsed.timeSeriesData)).toBe(true);
    expect(parsed.timeSeriesData.length).toBe(5);
    // Ensure no file is created when --json flag is used
    expect(existsSync(tempJsonFile)).toBe(false);
  });
});

describe("CLI CSV Output", () => {
  test("should output valid CSV with header and 5 data rows and not create a file", () => {
    const tempCsvFile = "tempCsvOutput.svg"; // file argument is ignored in CSV mode
    const args = [
      "--expression", "y=cos(x)",
      "--range", "x=0:4,y=-1:1",
      "--file", tempCsvFile,
      "--csv"
    ];
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg + "\n"; };
    main(args);
    console.log = originalLog;

    // CSV should start with header "x,y" and have 6 lines total (header + 5 data rows)
    const lines = output.trim().split("\n");
    expect(lines[0]).toBe("x,y");
    expect(lines.length).toBe(6);
    // Each data row should contain two comma separated values
    for (let i = 1; i < lines.length; i++) {
      expect(lines[i].split(",").length).toBe(2);
    }
    // Ensure no file is created when --csv flag is used
    expect(existsSync(tempCsvFile)).toBe(false);
  });
});
