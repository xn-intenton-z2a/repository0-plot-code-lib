/* File: tests/unit/main.test.js */
import { describe, it, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";

// Test for the utility function isLiteralNaN
describe("Utility Function: isLiteralNaN", () => {
  it("should return true for 'NaN' in various cases", () => {
    expect(mainModule.isLiteralNaN('NaN')).toBe(true);
    expect(mainModule.isLiteralNaN('nan')).toBe(true);
    expect(mainModule.isLiteralNaN(' NAN ')).toBe(true);
    expect(mainModule.isLiteralNaN('\tNaN\n')).toBe(true);
  });
  it("should return false for non-NaN strings", () => {
    expect(mainModule.isLiteralNaN('Infinity')).toBe(false);
    expect(mainModule.isLiteralNaN('sin(x)')).toBe(false);
    expect(mainModule.isLiteralNaN('')).toBe(false);
  });
});

// Test the module import
describe("Main Module Import", () => {
  it("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

// Test default output
describe("Default Demo Output", () => {
  it("should terminate without error", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    process.argv = ["node", "src/lib/main.js"];
    mainModule.main([]);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

// Diagnostics mode
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

// Plot Generation (Legacy CLI Syntax)
describe("Plot Generation (Legacy CLI Syntax)", () => {
  it("should generate a valid SVG plot with a polyline element and enhanced axes, grid, and ticks", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)", "--start", "0", "--end", "6.28", "--step", "0.1"];
    mainModule.main(args);
    expect(consoleSpy).toHaveBeenCalled();
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain("<svg");
    expect(output).toContain("</svg>");
    expect(output).toContain("<polyline");
    // Check for enhanced elements
    expect(output).toContain("class=\"axis");
    expect(output).toContain("class=\"grid-line");
    expect(output).toContain("class=\"tick-label");
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

// Handling NaN in Plot Generation
describe("Handling NaN in Plot Generation", () => {
  it("should handle cases where evaluated expression returns NaN by displaying a fallback SVG with diagnostic info", () => {
    const svg = mainModule.generatePlot("0/0", 0, 10, 1);
    expect(svg).toContain("<svg");
    expect(svg).toContain("No valid data");
    expect(svg).toContain("non-finite values");
    expect(svg).not.toContain("<polyline");
  });

  it("should allow a custom fallback message via the API", () => {
    const customMessage = "Custom fallback message";
    const svg = mainModule.generateSVGPlot("0/0", 0, 10, 1, customMessage);
    expect(svg).toContain(customMessage);
    expect(svg).not.toContain("No valid data");
  });

  it("should generate fallback SVG when literal 'NaN' is provided with fallback", () => {
    const customMessage = "Fallback for literal NaN";
    const svg = mainModule.generateSVGPlot("NaN", 0, 10, 1, customMessage);
    expect(svg).toContain(customMessage);
  });
  
  it("should generate fallback SVG when literal 'NaN' is provided without fallback", () => {
    const svg = mainModule.generateSVGPlot("NaN", 0, 10, 1);
    expect(svg).toContain("No valid data");
    expect(svg).not.toContain("<polyline");
  });
});

// Custom Fallback via CLI (Legacy)
describe("Custom Fallback Message via CLI (Legacy Syntax)", () => {
  it("should display the custom fallback message in the generated SVG when provided, even for literal 'NaN'", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const customMessage = "CLI custom fallback";
    const args = ["--plot", "--expr", "NaN", "--start", "0", "--end", "10", "--step", "1", "--fallback", customMessage];
    mainModule.main(args);
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain(customMessage);
    expect(output).not.toContain("No valid data");
    consoleSpy.mockRestore();
  });
});

// Help Flag
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

// Version Flag
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

// New SVG CLI Plot Generation
import { generateSVGPlot, generateMultiPlot } from "@src/lib/main.js";

describe("SVG Plot Generation Module", () => {
  it("should generate a valid SVG with polyline and enhanced axes for a valid expression", () => {
    const svg = generateSVGPlot("sin(x)", -10, 10, 0.4);
    expect(svg).toContain("<svg");
    expect(svg).toContain("<polyline");
    expect(svg).toContain("class=\"axis");
  });

  it("should return fallback SVG when no valid data points are generated", () => {
    const svg = generateSVGPlot("0/0", -10, 10, 0.4);
    expect(svg).toContain("No valid data");
    expect(svg).not.toContain("<polyline");
  });
});

describe("Multi-Function Plot Generation via API", () => {
  it("should generate an SVG with multiple polylines, enhanced axes, grid lines, and a legend for valid expressions", () => {
    const expressions = ["sin(x)", "cos(x)"];
    const svg = generateMultiPlot(expressions, 0, 6.28, 0.1);
    expect(svg).toContain("<svg");
    expect(svg).toContain("<polyline");
    expect(svg).toContain("<g class=\"legend\"");
    expect(svg).toContain("class=\"axis");
    expect(svg).toContain("class=\"grid-line");
    expect(svg).toContain("sin(x)");
    expect(svg).toContain("cos(x)");
  });

  it("should return fallback SVG if all expressions yield no valid points", () => {
    const expressions = ["0/0", "0/0"];
    const svg = generateMultiPlot(expressions, 0, 10, 1);
    expect(svg).toContain("No valid data");
    expect(svg).not.toContain("<polyline");
  });
});

describe("New SVG CLI Multi-Plot Generation", () => {
  it("should generate a valid multi-plot SVG using --plots flag with comma-separated expressions", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const customMessage = "New CLI custom fallback";
    const args = ["--plots", "sin(x),cos(x)", "--xmin", "0", "--xmax", "6.28", "--points", "100", "--fallback", customMessage];
    mainModule.main(args);
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain("<svg");
    expect(output).toContain("<polyline");
    expect(output).toContain("sin(x)");
    expect(output).toContain("cos(x)");
    consoleSpy.mockRestore();
  });

  it("should generate a valid multi-plot SVG using --plot flag with comma-separated expressions", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--plot", "tan(x),log(x)", "--xmin", "1", "--xmax", "10", "--points", "50"];
    mainModule.main(args);
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain("<svg");
    expect(output).toContain("<polyline");
    expect(output).toContain("tan(x)");
    expect(output).toContain("log(x)");
    consoleSpy.mockRestore();
  });

  it("should error if missing required new CLI parameters in multi-plot mode", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const args = ["--plot", "cos(x),sin(x)", "--xmin", "0", "--points", "100"]; // missing --xmax
    mainModule.main(args);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Missing required parameters for SVG plotting: --xmin, --xmax, --points");
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});
