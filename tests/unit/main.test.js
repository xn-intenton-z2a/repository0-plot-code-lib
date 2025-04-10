import { describe, test, expect, beforeAll, afterAll, afterEach, vi } from "vitest";
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

// Async helper to capture console output
async function captureConsole(method, fn) {
  const output = [];
  const original = console[method];
  console[method] = (msg) => output.push(msg);
  try {
    await fn();
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
  test("should display usage message when no arguments provided and no defaultArgs in global config", async () => {
    const logOutput = await captureConsole('log', async () => { await main([]); });
    expect(logOutput).toContain("No arguments provided");
  });

  test("should output arguments when provided", async () => {
    const logOutput = await captureConsole('log', async () => { await main(["arg1", "arg2"]); });
    expect(logOutput).toContain("arg1");
    expect(logOutput).toContain("arg2");
  });
});


describe("Error Handling", () => {
  test("should log concise error message in non-verbose mode", async () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    await expect(main(["--simulate-error"]))
      .rejects.toThrow("Simulated error condition for testing. Please provide a valid number such as '--number=42'");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Error: Simulated error condition for testing. Please provide a valid number such as '--number=42'");
    expect(errorOutput).not.toContain("Stack trace:");
    expect(errorOutput).toContain("Please provide a valid number such as '--number=42'");
  });

  test("should log detailed error in verbose mode", async () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    await expect(main(["--simulate-error", "--verbose"]))
      .rejects.toThrow("Simulated error condition for testing. Please provide a valid number such as '--number=42'");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Error in main function execution:");
    expect(errorOutput).toContain("Stack trace:");
    expect(errorOutput).toContain("Simulated error condition for testing. Please provide a valid number such as '--number=42'");
    expect(errorOutput).toContain("Please provide a valid number such as '--number=42'");
  });
});

describe("Color Theme Configuration", () => {
  test("should apply dark theme when CLI_COLOR_SCHEME is set to dark", async () => {
    const originalEnv = process.env.CLI_COLOR_SCHEME;
    process.env.CLI_COLOR_SCHEME = "dark";
    const logOutput = await captureConsole('log', async () => { await main(["arg"]); });
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

  test("should use custom theme from cli-theme.json", async () => {
    const logOutput = await captureConsole('log', async () => { await main(["arg"]); });
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

  test("should log clear error message and fallback to default theme for invalid JSON", async () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    await main(["arg"]);
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

  test("should log clear error message and fallback to default theme for invalid schema", async () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    await main(["arg"]);
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Custom CLI theme configuration error");
    expect(errorOutput).toContain("Using fallback theme");
  });
});

describe("Numeric Argument Validation", () => {
  test("should throw error for invalid numeric input in non-verbose mode", async () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    await expect(main(["--number=abc"]))
      .rejects.toThrow("Invalid numeric value: abc");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Invalid numeric value for argument '--number=abc': 'abc' is not a valid number. Please provide a valid number such as '--number=42'.");
    expect(errorOutput).not.toContain("Stack trace:");
  });

  test("should throw error for invalid numeric input in verbose mode", async () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    await expect(main(["--number=abc", "--verbose"]))
      .rejects.toThrow("Invalid numeric value: abc");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Invalid numeric value for argument '--number=abc': 'abc' is not a valid number. Please provide a valid number such as '--number=42'.");
    expect(errorOutput).toContain("Stack trace:");
  });

  test("should throw error for '--number=NaN' in non-verbose mode", async () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    await expect(main(["--number=NaN"]))
      .rejects.toThrow("Invalid numeric value: NaN");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Invalid numeric value for argument '--number=NaN': 'NaN' is not a valid number. Please provide a valid number such as '--number=42'.");
    expect(errorOutput).not.toContain("Stack trace:");
  });

  test("should throw error for '--number=NaN' in verbose mode", async () => {
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    await expect(main(["--number=NaN", "--verbose"]))
      .rejects.toThrow("Invalid numeric value: NaN");
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Invalid numeric value for argument '--number=NaN': 'NaN' is not a valid number. Please provide a valid number such as '--number=42'.");
    expect(errorOutput).toContain("Stack trace:");
  });

  test("should accept scientific notation", async () => {
    const logOutput = await captureConsole('log', async () => { await main(["--number=1e3", "arg"]); });
    expect(logOutput).toContain("arg");
  });

  test("should accept numbers with underscores", async () => {
    const logOutput = await captureConsole('log', async () => { await main(["--number=1_000", "arg"]); });
    expect(logOutput).toContain("arg");
  });

  test("should accept numbers with commas", async () => {
    const logOutput = await captureConsole('log', async () => { await main(["--number=1,000", "arg"]); });
    expect(logOutput).toContain("arg");
  });

  test("should accept numbers with both underscores and commas", async () => {
    const logOutput = await captureConsole('log', async () => { await main(["--number=1,_000", "arg"]); });
    expect(logOutput).toContain("arg");
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

  test("should use global configuration defaultArgs when no CLI arguments are provided", async () => {
    const logOutput = await captureConsole('log', async () => { await main([]); });
    expect(logOutput).toContain("Using default arguments from global configuration.");
    expect(logOutput).toContain("globalArg1");
  });

  test("should override global defaultArgs when CLI arguments are provided", async () => {
    const logOutput = await captureConsole('log', async () => { await main(["cliArg1"]); });
    expect(logOutput).toContain("cliArg1");
    expect(logOutput).not.toContain("globalArg1");
  });
});

describe("Global Configuration Schema Validation", () => {
  const globalConfigPath = path.join(process.cwd(), ".repository0plotconfig.json");

  afterEach(() => {
    if (fs.existsSync(globalConfigPath)) {
      fs.unlinkSync(globalConfigPath);
    }
  });

  test("should log error and fallback when global config JSON is malformed", async () => {
    fs.writeFileSync(globalConfigPath, '{ malformed json');
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    await main(["arg"]);
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Global config error");
  });

  test("should log error and fallback when global config does not adhere to schema", async () => {
    fs.writeFileSync(globalConfigPath, JSON.stringify({ defaultArgs: "not-an-array" }));
    let errorOutput = "";
    console.error = (msg) => { errorOutput += msg + "\n"; };
    await main(["arg"]);
    console.error = originalConsoleError;
    expect(errorOutput).toContain("Global config validation error");
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
    await expect(main(["--simulate-error", "--verbose"]))
      .rejects.toThrow("Simulated error condition for testing. Please provide a valid number such as '--number=42'");
    // Allow some time for the async reporting
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
    expect(payload).toHaveProperty('libraryVersion');
    expect(typeof payload.libraryVersion).toBe('string');
    expect(payload).toHaveProperty('timestamp');
    expect(typeof payload.timestamp).toBe('string');
    expect(payload).toHaveProperty('envContext');
    expect(payload.envContext).toHaveProperty('NODE_ENV');
    expect(payload.envContext).toHaveProperty('CLI_COLOR_SCHEME');
    expect(payload.envContext).toHaveProperty('LOG_LEVEL');
    expect(payload.envContext).toHaveProperty('HOME');
    delete process.env.ERROR_REPORTING_URL;
    console.error = originalConsoleError;
  });

  test("should not attempt error reporting when ERROR_REPORTING_URL is not defined", async () => {
    const fetchSpy = vi.fn();
    global.fetch = fetchSpy;
    await expect(main(["--simulate-error"]))
      .rejects.toThrow();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

describe("--show-config Option", () => {
  test("should output effective global configuration as formatted JSON and not process further arguments", async () => {
    const configPath = path.join(process.cwd(), ".repository0plotconfig.json");
    const globalConfigJson = {
      CLI_COLOR_SCHEME: "light",
      LOG_LEVEL: "debug",
      ERROR_REPORTING_URL: "http://example.com/report",
      defaultArgs: ["default1"]
    };
    fs.writeFileSync(configPath, JSON.stringify(globalConfigJson));
    process.env.CLI_COLOR_SCHEME = "dark";
    const output = await captureConsole('log', async () => { await main(["--show-config", "another-arg"]); });
    let parsedOutput;
    expect(() => { parsedOutput = JSON.parse(output); }).not.toThrow();
    expect(parsedOutput.CLI_COLOR_SCHEME).toBe("dark");
    expect(parsedOutput.LOG_LEVEL).toBe("debug");
    fs.unlinkSync(configPath);
    delete process.env.CLI_COLOR_SCHEME;
  });
});

describe("Dynamic CLI Theme Flag", () => {
  test("should apply dark theme when '--theme=dark' flag is passed", async () => {
    const logOutput = await captureConsole('log', async () => { await main(["--theme=dark", "arg1"]); });
    expect(logOutput).toContain("\u001b[1m");
  });

  test("should apply light theme when '--theme=light' flag is passed", async () => {
    const logOutput = await captureConsole('log', async () => { await main(["--theme=light", "arg1"]); });
    expect(logOutput).toContain("\u001b[35m");
  });

  test("should apply default theme when '--theme=default' flag is passed", async () => {
    const logOutput = await captureConsole('log', async () => { await main(["--theme=default", "arg1"]); });
    expect(logOutput).toContain("\u001b[33m");
  });
});

describe("CLI Flag over Custom Config", () => {
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
  
  test("should override custom config when --theme flag is provided", async () => {
    const logOutput = await captureConsole('log', async () => { await main(["--theme=light", "arg1"]); });
    expect(logOutput).toContain("\u001b[35m");
  });
});
