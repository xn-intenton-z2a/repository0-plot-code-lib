import { describe, test, expect, vi } from "vitest";
import { main } from "@src/lib/main.js";
import fs from "fs";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});

describe("Default main behavior", () => {
  test("should terminate without error when no arguments provided", () => {
    const consoleSpy = vi.spyOn(console, "log");
    main();
    expect(consoleSpy).toHaveBeenCalledWith("No arguments provided. Use --help to see usage instructions.");
    consoleSpy.mockRestore();
  });

  test("should display help when '--help' is passed", () => {
    const consoleSpy = vi.spyOn(console, "log");
    main(["--help"]);
    expect(consoleSpy).toHaveBeenCalledWith("Usage: node src/lib/main.js --expression <exp> --range <range> --file <filepath> [--evaluate] [--diagnostics]");
    consoleSpy.mockRestore();
  });

  test("should validate and print arguments when valid parameters are provided", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    main(["--expression", "y=sin(x)", "--range", "x=-1:-1,y=-1:-1", "--file", "output.svg"]);
    expect(consoleSpy).toHaveBeenCalledWith('Validated arguments: {"expression":"y=sin(x)","range":"x=-1:-1,y=-1:-1","file":"output.svg"}');
    writeFileSyncSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  test("should error and exit when missing required arguments", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => { throw new Error("process.exit") });
    try {
      main(["--expression", "y=sin(x)", "--range", "x=-1:-1,y=-1:-1"]);
    } catch (e) {
      expect(e.message).toBe("process.exit");
    }
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error: Invalid arguments.");
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  test("should error and exit when provided malformed range", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => { throw new Error("process.exit") });
    try {
      main(["--expression", "y=sin(x)", "--range", "invalid_range", "--file", "output.svg"]);
    } catch (e) {
      expect(e.message).toBe("process.exit");
    }
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error: Invalid arguments.");
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  test("should error and exit when file extension is incorrect", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => { throw new Error("process.exit") });
    try {
      main(["--expression", "y=sin(x)", "--range", "x=-1:-1,y=-1:-1", "--file", "output.txt"]);
    } catch (e) {
      expect(e.message).toBe("process.exit");
    }
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error: Invalid arguments.");
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  test("should generate and save an SVG plot", () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log");
    main(["--expression", "y=cos(x)", "--range", "x=0:10,y=0:5", "--file", "plot.svg"]);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenContent).toContain("<svg");
    expect(consoleSpy).toHaveBeenLastCalledWith("Plot saved to plot.svg");
    writeFileSyncSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});

describe("Evaluate functionality", () => {
  test("should output time series data when --evaluate flag is provided", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    main(["--expression", "y=sin(x)", "--range", "x=0:6,y=-1:1", "--file", "eval.svg", "--evaluate"]);
    // Check that time series data is printed
    const evalCall = consoleSpy.mock.calls.find(call => call[0].startsWith("Time series data:"));
    expect(evalCall).toBeDefined();
    const jsonPart = evalCall[1];
    let data;
    try {
      data = JSON.parse(jsonPart);
    } catch (e) {
      data = null;
    }
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBe(100);
    writeFileSyncSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});

describe("Diagnostics functionality", () => {
  test("should output diagnostic info when '--diagnostics' flag is provided", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    main(["--diagnostics", "--expression", "y=sin(x)", "--range", "x=-1:-1,y=-1:-1", "--file", "diag.svg"]);
    // Check that diagnostics information is output
    const diagCall = consoleSpy.mock.calls.find(call => call[0].includes("Diagnostics - Raw CLI arguments:"));
    expect(diagCall).toBeDefined();
    // Also ensure validated output is printed
    const validatedCall = consoleSpy.mock.calls.find(call => call[0].startsWith("Validated arguments:"));
    expect(validatedCall).toBeDefined();
    writeFileSyncSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
