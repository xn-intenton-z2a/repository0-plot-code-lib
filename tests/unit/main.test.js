import { describe, it, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  it("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default Demo Output", () => {
  it("should terminate without error", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    process.argv = ["node", "src/lib/main.js"];
    main([]);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe("Diagnostics Mode", () => {
  it("should output diagnostics information when --diagnostics flag is provided", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--diagnostics", "--plot", "--expr", "sin(x)"];
    main(args);
    expect(consoleSpy).toHaveBeenCalledWith("Diagnostics Mode Enabled");
    // Check for diagnostics details
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Parsed Arguments:"), args);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Node.js Version:"), process.version);
    consoleSpy.mockRestore();
  });
});

describe("Plot Generation", () => {
  it("should generate a valid SVG plot", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)", "--start", "0", "--end", "6.28", "--step", "0.1"];
    main(args);
    expect(consoleSpy).toHaveBeenCalled();
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain("<svg");
    expect(output).toContain("</svg>");
    consoleSpy.mockRestore();
  });

  it("should error if missing required plot parameters", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)"];
    main(args);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Missing required parameters for plotting: --expr, --start, --end");
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  it("should error if --start is non-numeric", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)", "--start", "abc", "--end", "6.28"];
    main(args);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Invalid numeric value for --start");
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  it("should error if --end is non-numeric", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)", "--start", "0", "--end", "notanumber"];
    main(args);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Invalid numeric value for --end");
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  it("should error if --step is non-numeric", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)", "--start", "0", "--end", "6.28", "--step", "NaN"];
    main(args);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Invalid numeric value for --step");
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});
