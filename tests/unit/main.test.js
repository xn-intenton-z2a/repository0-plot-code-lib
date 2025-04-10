import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { main } from "@src/lib/main.js";
import fs from "fs";
import path from "path";

// Backup original console functions
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});


describe("Default Demo Output", () => {
  test("should display usage message when no arguments provided", () => {
    let logOutput = "";
    console.log = (msg) => { logOutput += msg; };
    main([]);
    console.log = originalConsoleLog;
    expect(logOutput).toContain("No arguments provided");
  });

  test("should output arguments when provided", () => {
    let logOutput = "";
    console.log = (msg) => { logOutput += msg; };
    main(["arg1", "arg2"]);
    console.log = originalConsoleLog;
    expect(logOutput).toContain("arg1");
    expect(logOutput).toContain("arg2");
  });
});


describe("Error Handling", () => {
  test("should log concise error message in non-verbose mode", () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    expect(() => main(["--simulate-error"]))
      .toThrow("Simulated error condition for testing");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Error: Simulated error condition for testing");
    expect(errorOutput).not.toContain("Stack trace:");
    expect(errorOutput).not.toContain("Error in main function execution:");
  });

  test("should log detailed error in verbose mode", () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    expect(() => main(["--simulate-error", "--verbose"]))
      .toThrow("Simulated error condition for testing");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Error in main function execution:");
    expect(errorOutput).toContain("Stack trace:");
    expect(errorOutput).toContain("Simulated error condition for testing");
  });
});


describe("Color Theme Configuration", () => {
  test("should apply dark theme when CLI_COLOR_SCHEME is set to dark", () => {
    const originalEnv = process.env.CLI_COLOR_SCHEME;
    process.env.CLI_COLOR_SCHEME = "dark";
    let logOutput = "";
    console.log = (msg) => { logOutput += msg; };
    main([]);
    console.log = originalConsoleLog;
    // Check for ANSI bold escape code (typically \u001b[1m for bold in dark theme)
    expect(logOutput).toContain("\u001b[1m"); 
    process.env.CLI_COLOR_SCHEME = originalEnv;
  });
});


describe("Custom Color Theme Configuration", () => {
  const configPath = path.join(process.cwd(), "cli-theme.json");
  const customConfig = {
    error: "bold.red",
    usage: "underline.blue",
    info: "italic.green",
    run: "inverse.cyan"
  };
  
  beforeAll(() => {
    fs.writeFileSync(configPath, JSON.stringify(customConfig));
  });
  
  afterAll(() => {
    fs.unlinkSync(configPath);
  });

  test("should use custom theme from cli-theme.json", () => {
    let logOutput = "";
    console.log = (msg) => { logOutput += msg; };
    main([]);
    console.log = originalConsoleLog;
    // ANSI code for underline is typically \x1B[4m in many terminals
    expect(logOutput).toContain("\x1B[4m");
  });
});


describe("Invalid Custom Theme Configuration - Invalid JSON", () => {
  const configPath = path.join(process.cwd(), "cli-theme.json");
  beforeAll(() => {
    fs.writeFileSync(configPath, '{ invalid json');
  });
  afterAll(() => {
    fs.unlinkSync(configPath);
  });

  test("should log clear error message and fallback to default theme for invalid JSON", () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    main([]);
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Custom CLI theme configuration error");
    expect(errorOutput).toContain("Using fallback theme");
  });
});


describe("Invalid Custom Theme Configuration - Invalid Schema", () => {
  const configPath = path.join(process.cwd(), "cli-theme.json");
  beforeAll(() => {
    // Valid JSON but missing required keys
    fs.writeFileSync(configPath, JSON.stringify({ wrongKey: "bold.red" }));
  });
  afterAll(() => {
    fs.unlinkSync(configPath);
  });

  test("should log clear error message and fallback to default theme for invalid schema", () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    main([]);
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Custom CLI theme configuration error");
    expect(errorOutput).toContain("Using fallback theme");
  });
});


describe("Numeric Argument Validation", () => {
  test("should throw error for invalid numeric input in non-verbose mode", () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    expect(() => main(["--number=abc"]))
      .toThrow("Invalid numeric value: abc");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Invalid numeric value for argument '--number=abc': 'abc' is not a valid number.");
    expect(errorOutput).not.toContain("Stack trace:");
  });

  test("should throw error for invalid numeric input in verbose mode", () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    expect(() => main(["--number=abc", "--verbose"]))
      .toThrow("Invalid numeric value: abc");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Invalid numeric value for argument '--number=abc': 'abc' is not a valid number.");
    expect(errorOutput).toContain("Stack trace:");
  });
});
