import { describe, test, expect } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

// Backup original console.error
const originalConsoleError = console.error;

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default Demo Output", () => {
  test("should display usage message when no arguments provided", () => {
    // Capture console.log output
    let logOutput = "";
    const originalLog = console.log;
    console.log = (msg) => { logOutput += msg; };
    main([]);
    console.log = originalLog;
    expect(logOutput).toContain("No arguments provided");
  });

  test("should output arguments when provided", () => {
    let logOutput = "";
    const originalLog = console.log;
    console.log = (msg) => { logOutput += msg; };
    main(["arg1", "arg2"]);
    console.log = originalLog;
    expect(logOutput).toContain("arg1");
    expect(logOutput).toContain("arg2");
  });
});

describe("Error Handling", () => {
  test("should log error details and throw for simulated error", () => {
    // Override console.error to capture error logs
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };

    expect(() => main(["--simulate-error"]))
      .toThrow("Simulated error condition for testing");

    // Restore console.error
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Error in main function execution:");
    expect(errorOutput).toContain("Simulated error condition for testing");
  });
});
