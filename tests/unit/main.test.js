import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { main } from "@src/lib/main.js";
import fs from "fs";
import path from "path";

// Backup original console functions
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

// Helper function to restore environment variables
function withEnv(newEnv, fn) {
  const oldEnv = { ...process.env };
  Object.assign(process.env, newEnv);
  try {
    fn();
  } finally {
    process.env = oldEnv;
  }
}

// Helper to capture console output
function captureConsole(method, fn) {
  const output = [];
  const original = console[method];
  console[method] = (msg) => output.push(msg);
  try {
    fn();
  } finally {
    console[method] = original;
  }
  return output.join("\n");
}


describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});


describe("Default Demo Output", () => {
  test("should display usage message when no arguments provided and no defaultArgs in global config", () => {
    const logOutput = captureConsole('log', () => { main([]); });
    expect(logOutput).toContain("No arguments provided");
  });

  test("should output arguments when provided", () => {
    const logOutput = captureConsole('log', () => { main(["arg1", "arg2"]); });
    expect(logOutput).toContain("arg1");
    expect(logOutput).toContain("arg2");
  });
});


describe("Error Handling", () => {
  test("should log concise error message in non-verbose mode", () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    expect(() => main(["--simulate-error"]))
      .toThrow("Simulated error condition for testing. Please provide a valid number such as '--number=42'");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Error: Simulated error condition for testing. Please provide a valid number such as '--number=42'");
    expect(errorOutput).not.toContain("Stack trace:");
    expect(errorOutput).toContain("Please provide a valid number such as '--number=42'");
  });

  test("should log detailed error in verbose mode", () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    expect(() => main(["--simulate-error", "--verbose"]))
      .toThrow("Simulated error condition for testing. Please provide a valid number such as '--number=42'");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Error in main function execution:");
    expect(errorOutput).toContain("Stack trace:");
    expect(errorOutput).toContain("Simulated error condition for testing. Please provide a valid number such as '--number=42'");
    expect(errorOutput).toContain("Please provide a valid number such as '--number=42'");
  });
});


describe("Color Theme Configuration", () => {
  test("should apply dark theme when CLI_COLOR_SCHEME is set to dark", () => {
    const originalEnv = process.env.CLI_COLOR_SCHEME;
    process.env.CLI_COLOR_SCHEME = "dark";
    const logOutput = captureConsole('log', () => { main([]); });
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
    const logOutput = captureConsole('log', () => { main([]); });
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
    expect(errorOutput).toContain("Invalid numeric value for argument '--number=abc': 'abc' is not a valid number. Please provide a valid number such as '--number=42'");
    expect(errorOutput).not.toContain("Stack trace:");
  });

  test("should throw error for invalid numeric input in verbose mode", () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    expect(() => main(["--number=abc", "--verbose"]))
      .toThrow("Invalid numeric value: abc");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Invalid numeric value for argument '--number=abc': 'abc' is not a valid number. Please provide a valid number such as '--number=42'");
    expect(errorOutput).toContain("Stack trace:");
  });

  test("should throw error for '--number=NaN' in non-verbose mode", () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    expect(() => main(["--number=NaN"]))
      .toThrow("Invalid numeric value: NaN");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Invalid numeric value for argument '--number=NaN': 'NaN' is not a valid number. Please provide a valid number such as '--number=42'");
    expect(errorOutput).not.toContain("Stack trace:");
  });

  test("should throw error for '--number=NaN' in verbose mode", () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    expect(() => main(["--number=NaN", "--verbose"]))
      .toThrow("Invalid numeric value: NaN");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Invalid numeric value for argument '--number=NaN': 'NaN' is not a valid number. Please provide a valid number such as '--number=42'");
    expect(errorOutput).toContain("Stack trace:");
  });
});


describe("Global Configuration Support", () => {
  const globalConfigPath = path.join(process.cwd(), ".repository0plotconfig.json");
  const globalConfig = {
    CLI_COLOR_SCHEME: "dark",
    LOG_LEVEL: "debug",
    defaultArgs: ["globalArg1", "globalArg2"]
  };

  beforeAll(() => {
    fs.writeFileSync(globalConfigPath, JSON.stringify(globalConfig));
  });

  afterAll(() => {
    fs.unlinkSync(globalConfigPath);
  });

  test("should use global configuration defaultArgs when no CLI arguments are provided", () => {
    const logOutput = captureConsole('log', () => { main([]); });
    expect(logOutput).toContain("Using default arguments from global configuration.");
    expect(logOutput).toContain("globalArg1");
  });

  test("should override global defaultArgs when CLI arguments are provided", () => {
    const logOutput = captureConsole('log', () => { main(["cliArg1"]); });
    expect(logOutput).toContain("cliArg1");
    expect(logOutput).not.toContain("globalArg1");
  });
});


describe("Automatic Error Reporting", () => {
  let originalFetch;
  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  test("should submit error report when ERROR_REPORTING_URL is defined", async () => {
    const fetchMock = vi.fn(() => Promise.resolve({ ok: true }));
    global.fetch = fetchMock;
    process.env.ERROR_REPORTING_URL = "http://example.com/report";
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    try {
      main(["--simulate-error", "--verbose"]);
    } catch (e) {
      // Expected error
    }
    await new Promise(r => setTimeout(r, 50));
    expect(fetchMock).toHaveBeenCalled();
    const callArgs = fetchMock.mock.calls[0];
    expect(callArgs[0]).toBe("http://example.com/report");
    const options = callArgs[1];
    expect(options.method).toBe("POST");
    const payload = JSON.parse(options.body);
    expect(payload).toHaveProperty('errorMessage', "Simulated error condition for testing. Please provide a valid number such as '--number=42'");
    expect(payload).toHaveProperty('cliArgs');
    expect(payload.cliArgs).toContain("--simulate-error");
    delete process.env.ERROR_REPORTING_URL;
    console.error = originalConsoleError;
  });

  test("should not attempt error reporting when ERROR_REPORTING_URL is not defined", () => {
    const fetchSpy = vi.fn();
    global.fetch = fetchSpy;
    try {
      main(["--simulate-error"]);
    } catch (e) {
      // Expected error
    }
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
