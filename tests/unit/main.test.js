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
    expect(consoleSpy).toHaveBeenCalledWith("Usage: node src/lib/main.js --expression <exp> --range <range> --file <filepath>");
    consoleSpy.mockRestore();
  });

  test("should validate and print arguments when valid parameters are provided", () => {
    const consoleSpy = vi.spyOn(console, "log");
    // The function will also generate a file, but we focus on validated output here
    // Spy on fs.writeFileSync so it doesn't actually create a file
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
      // Missing --file argument
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
