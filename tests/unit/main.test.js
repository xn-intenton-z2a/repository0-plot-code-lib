import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { main } from "@src/lib/main.js";

// Updated captureOutput to attach captured logs to thrown error if any
function captureOutput(func) {
  const logs = [];
  const errors = [];
  const originalLog = console.log;
  const originalError = console.error;
  console.log = (msg) => logs.push(msg);
  console.error = (msg) => errors.push(msg);
  try {
    func();
  } catch (e) {
    // Attach captured logs and errors to the error object for later inspection
    e.captured = { logs, errors };
    throw e;
  } finally {
    console.log = originalLog;
    console.error = originalError;
  }
  return { logs, errors };
}

describe("Main CLI Functionality", () => {
  let exitSpy;

  beforeEach(() => {
    exitSpy = vi.spyOn(process, "exit").mockImplementation((code) => { throw new Error("process.exit:" + code); });
  });

  afterEach(() => {
    exitSpy.mockRestore();
  });

  test("should default to interactive mode when no arguments", () => {
    const { logs } = captureOutput(() => main([]));
    expect(logs).toContain("No arguments provided. Starting interactive mode by default.");
  });

  test("should activate interactive mode with --interactive flag", () => {
    const { logs } = captureOutput(() => main(["--interactive"]));
    expect(logs).toContain("Interactive mode activated.");
  });

  test("should start web server with --serve flag", () => {
    const { logs } = captureOutput(() => main(["--serve"]));
    expect(logs).toContain("Starting web server (placeholder) on port 3000.");
  });

  test("should generate ASCII plot output with --ascii flag", () => {
    const { logs } = captureOutput(() => main(["--ascii"]));
    expect(logs).toContain("Generating ASCII plot output (placeholder).");
  });

  test("should activate diagnostics mode with --diagnostics flag", () => {
    const { logs } = captureOutput(() => main(["--diagnostics"]));
    expect(logs).toContain("Diagnostics mode activated.");
  });

  test("should generate plot for valid command", () => {
    const { logs } = captureOutput(() => main(["output.svg", "quad:1,0,0,-10,10,1"]));
    expect(logs[0]).toMatch(/Generating quad plot to output.svg with parameters 1,0,0,-10,10,1/);
  });

  test("should error on invalid plot command format", () => {
    expect(() => {
      captureOutput(() => main(["output.svg", "invalidFormat"]));
    }).toThrow("process.exit:1");
  });

  test("should error on non-numeric parameters", () => {
    let captured = { logs: [], errors: [] };
    try {
      captured = captureOutput(() => main(["output.svg", "quad:1,NaN,0,-10,10,1"]));
    } catch (e) {
      captured = e.captured || { logs: [], errors: [] };
    }
    expect(captured.errors.some(error => error.includes('Invalid parameter(s):'))).toBe(true);
  });
});
