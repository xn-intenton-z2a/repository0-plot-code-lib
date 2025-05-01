import { describe, test, expect } from "vitest";
import { main } from "@src/lib/main.js";
import { writeFileSync } from 'fs';

// Helper to capture console output
function captureConsole(method, fn) {
  const original = console[method];
  let output = "";
  console[method] = (msg) => { output += msg; };
  return fn().then(() => {
    console[method] = original;
    return output;
  });
}

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error when no args provided and missing --expression", async () => {
    let errorOutput = "";
    const originalError = console.error;
    console.error = (msg) => { errorOutput += msg; };
    await main([]);
    expect(errorOutput).toContain("--expression");
    console.error = originalError;
  });
});

describe("CLI Parsing and SVG Generation", () => {
  test("prints error when missing --expression flag", async () => {
    let errorOutput = "";
    const originalError = console.error;
    console.error = (msg) => { errorOutput += msg; };
    await main(["--range", "x=-3:3"]);
    expect(errorOutput).toContain("--expression");
    console.error = originalError;
  });

  test("generates SVG when valid inputs provided", async () => {
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };
    await main(["--expression", "y=sin(x)", "--range", "x=-3:3,y=-1:1"]);
    expect(output).toContain("<svg");
    expect(output).toContain("y=sin(x)");
    console.log = originalLog;
  });

  test("writes SVG to file when --file flag is provided", async () => {
    // Mock writeFileSync to avoid filesystem writes
    const fs = require('fs');
    const originalWriteFileSync = fs.writeFileSync;
    let fileContent = "";
    let filePathWritten = "";
    fs.writeFileSync = (path, data) => {
      filePathWritten = path;
      fileContent = data;
    };

    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };

    await main(["--expression", "y=sin(x)", "--file", "test_output.svg"]);

    expect(filePathWritten).toBe("test_output.svg");
    expect(fileContent).toContain("<svg");
    expect(output).toContain("SVG written to test_output.svg");

    // Restore original functions
    fs.writeFileSync = originalWriteFileSync;
    console.log = originalLog;
  });

  test("converts SVG to PNG when --output-format png is provided", async () => {
    const fs = require('fs');
    const originalWriteFileSync = fs.writeFileSync;
    let fileContent = null;
    let fileWritten = "";
    fs.writeFileSync = (path, data) => {
      fileWritten = path;
      fileContent = data;
    };

    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };

    await main(["--expression", "y=sin(x)", "--output-format", "png", "--file", "test_output.png"]);

    expect(fileWritten).toBe("test_output.png");
    expect(fileContent instanceof Buffer).toBe(true);
    // PNG files start with bytes 0x89 0x50 0x4E 0x47, which in hex is "89504e47"
    expect(fileContent.slice(0, 4).toString('hex')).toBe("89504e47");
    expect(output).toContain("PNG written to test_output.png");

    fs.writeFileSync = originalWriteFileSync;
    console.log = originalLog;
  });

  test("prints error for unsupported output format", async () => {
    let errorOutput = "";
    const originalError = console.error;
    console.error = (msg) => { errorOutput += msg; };
    await main(["--expression", "y=sin(x)", "--output-format", "jpg"]);
    expect(errorOutput).toContain("Unsupported output format");
    console.error = originalError;
  });
});
