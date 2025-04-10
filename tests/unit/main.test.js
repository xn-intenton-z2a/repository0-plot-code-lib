import { describe, test, expect } from "vitest";
import { main } from "@src/lib/main.js";

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
