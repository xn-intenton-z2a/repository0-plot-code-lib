/* File: tests/unit/main.test.js */
import { describe, it, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";

describe("Main Module Import", () => {
  it("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default Demo Output", () => {
  it("should terminate without error", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    process.argv = ["node", "src/lib/main.js"];
    mainModule.main([]);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe("Diagnostics Mode", () => {
  it("should output diagnostics information when --diagnostics flag is provided", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--diagnostics", "--plot", "--expr", "sin(x)"];
    mainModule.main(args);
    expect(consoleSpy).toHaveBeenCalledWith("Diagnostics Mode Enabled");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Parsed Arguments:"), args);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Node.js Version:"), process.version);
    consoleSpy.mockRestore();
  });
});

describe("Plot Generation (Legacy CLI Syntax)", () => {
  it("should generate a valid SVG plot with a polyline element", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)", "--start", "0", "--end", "6.28", "--step", "0.1"];
    mainModule.main(args);
    expect(consoleSpy).toHaveBeenCalled();
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain("<svg");
    expect(output).toContain("</svg>");
    expect(output).toContain("<polyline");
    consoleSpy.mockRestore();
  });

  it("should error if missing required plot parameters", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)"];
    mainModule.main(args);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Missing required parameters for plotting: --expr, --start, --end");
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  it("should error if --start is non-numeric", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)", "--start", "abc", "--end", "6.28"];
    mainModule.main(args);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Invalid numeric value for --start");
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  it("should error if --end is non-numeric", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)", "--start", "0", "--end", "notanumber"];
    mainModule.main(args);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Invalid numeric value for --end");
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  it("should error if --step is non-numeric", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)", "--start", "0", "--end", "6.28", "--step", "NaN"];
    mainModule.main(args);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Invalid numeric value for --step");
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  it("should error if plot range is invalid when start is not less than end", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)", "--start", "6.28", "--end", "0"];
    mainModule.main(args);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Invalid range: --start must be less than --end");
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});

describe("Handling NaN in Plot Generation", () => {
  it("should handle cases where evaluated expression returns NaN by displaying a fallback SVG with diagnostic info", () => {
    const svg = mainModule.generatePlot("0/0", 0, 10, 1);
    expect(svg).toContain("<svg");
    expect(svg).toContain("No valid data");
    expect(svg).toContain("non-finite values");
    expect(svg).not.toContain("<polyline");
  });
});

describe("Help Flag", () => {
  it("should output help information when --help is provided", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    mainModule.main(["--help"]);
    const output = consoleSpy.mock.calls.flat().join(" ");
    expect(output).toContain("Usage:");
    expect(output).toContain("display help information");
    consoleSpy.mockRestore();
  });

  it("should output help information when -h is provided", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    mainModule.main(["-h"]);
    const output = consoleSpy.mock.calls.flat().join(" ");
    expect(output).toContain("Usage:");
    expect(output).toContain("display help information");
    consoleSpy.mockRestore();
  });
});

describe("Version Flag", () => {
  it("should output version information when --version is provided", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    mainModule.main(["--version"]);
    expect(consoleSpy).toHaveBeenCalledWith("0.8.2");
    consoleSpy.mockRestore();
  });

  it("should output version information when -v is provided", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    mainModule.main(["-v"]);
    expect(consoleSpy).toHaveBeenCalledWith("0.8.2");
    consoleSpy.mockRestore();
  });
});

/* File: tests/unit/plotSVG.test.js */
import { describe, it, expect, vi } from "vitest";
// Updated import to use main.js since generateSVGPlot is now exported from there
import { generateSVGPlot } from "@src/lib/main.js";

describe("SVG Plot Generation Module", () => {
  it("should generate a valid SVG with polyline for a valid expression", () => {
    const svg = generateSVGPlot("sin(x)", -10, 10, 0.4);
    expect(svg).toContain("<svg");
    expect(svg).toContain("<polyline");
  });

  it("should return fallback SVG when no valid data points are generated", () => {
    const svg = generateSVGPlot("0/0", -10, 10, 0.4);
    expect(svg).toContain("No valid data");
    expect(svg).not.toContain("<polyline");
  });
});

// Additional tests for new CLI flag using the new syntax

describe("New SVG CLI Plot Generation", () => {
  it("should generate a valid SVG using new CLI parameters", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--plot", "cos(x)", "--xmin", "0", "--xmax", "6.28", "--points", "100"];
    // Using main from mainModule
    import('@src/lib/main.js').then(mod => mod.main(args));
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain("<svg");
    expect(output).toContain("<polyline");
    consoleSpy.mockRestore();
  });

  it("should error if missing required new CLI parameters", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const args = ["--plot", "cos(x)", "--xmin", "0", "--points", "100"]; // missing --xmax
    import('@src/lib/main.js').then(mod => mod.main(args));
    expect(consoleErrorSpy).toHaveBeenCalledWith("Missing required parameters for SVG plotting: --xmin, --xmax, --points");
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});
