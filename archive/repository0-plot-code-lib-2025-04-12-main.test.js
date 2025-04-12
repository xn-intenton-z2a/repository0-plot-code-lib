/* File: tests/unit/main.test.js */
import { describe, it, expect, vi, afterEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import fs from "fs";

// Cleanup output files if they exist
afterEach(() => {
  const files = ["output.svg", "test_output.png", "custom_dimensions.svg"];
  files.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
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
  it("should write an SVG file and output its content", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    process.argv = ["node", "src/lib/main.js"];
    await mainModule.main([]);
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain("<svg");
    expect(output).toContain("</svg>");
    consoleSpy.mockRestore();
  });
});

// Diagnostics mode
describe("Diagnostics Mode", () => {
  it("should output diagnostics information when --diagnostics flag is provided", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--diagnostics", "--plot", "--expr", "sin(x)"];
    await mainModule.main(args);
    expect(consoleSpy).toHaveBeenCalledWith("Diagnostics Mode Enabled");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Parsed Arguments:"), args);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Node.js Version:"), process.version);
    consoleSpy.mockRestore();
  });
});

// Plot Generation (Legacy CLI Syntax)
describe("Plot Generation (Legacy CLI Syntax)", () => {
  it("should generate a valid SVG plot with a polyline element and enhanced axes, grid, and ticks", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)", "--start", "0", "--end", "6.28", "--step", "0.1"];
    await mainModule.main(args);
    expect(consoleSpy).toHaveBeenCalled();
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain("<svg");
    expect(output).toContain("</svg>");
    expect(output).toContain("<polyline");
    expect(output).toContain("class=\"axis");
    expect(output).toContain("class=\"grid-line");
    expect(output).toContain("class=\"tick-label");
    consoleSpy.mockRestore();
  });

  it("should error if missing required plot parameters", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)"];
    await mainModule.main(args);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Missing required parameters for plotting: --expr, --start, --end");
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  it("should error if plot range is invalid when start is not less than end", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const args = ["--plot", "--expr", "sin(x)", "--start", "6.28", "--end", "0"];
    await mainModule.main(args);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Invalid range: --start must be less than --end");
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
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
  it("should generate a valid multi-plot SVG using --plots flag with comma-separated expressions", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const customMessage = "New CLI custom fallback";
    const args = ["--plots", "sin(x),cos(x)", "--xmin", "0", "--xmax", "6.28", "--points", "100", "--fallback", customMessage];
    await mainModule.main(args);
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain("<svg");
    expect(output).toContain("<polyline");
    expect(output).toContain("sin(x)");
    expect(output).toContain("cos(x)");
    consoleSpy.mockRestore();
  });

  it("should generate a valid multi-plot SVG using --plot flag with comma-separated expressions", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--plot", "tan(x),log(x)", "--xmin", "1", "--xmax", "10", "--points", "50"];
    await mainModule.main(args);
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain("<svg");
    expect(output).toContain("<polyline");
    expect(output).toContain("tan(x)");
    expect(output).toContain("log(x)");
    consoleSpy.mockRestore();
  });

  it("should error if missing required new CLI parameters in multi-plot mode", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const args = ["--plot", "cos(x),sin(x)", "--xmin", "0", "--points", "100"]; // missing --xmax
    await mainModule.main(args);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Missing required parameters for SVG plotting: --xmin, --xmax, --points");
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});

describe("SVG Plot Caching", () => {
  it("should return identical SVG output for repeated calls of generateSVGPlot with same parameters", () => {
    const svg1 = mainModule.generateSVGPlot("sin(x)", -10, 10, 0.5, "Cache test");
    const svg2 = mainModule.generateSVGPlot("sin(x)", -10, 10, 0.5, "Cache test");
    expect(svg1).toBe(svg2);
  });
  
  it("should return identical SVG output for repeated calls of generateMultiPlot with same parameters", () => {
    const exprs = ["sin(x)", "cos(x)"];
    const svg1 = mainModule.generateMultiPlot(exprs, 0, 6.28, 0.1, "Cache multi test");
    const svg2 = mainModule.generateMultiPlot(exprs, 0, 6.28, 0.1, "Cache multi test");
    expect(svg1).toBe(svg2);
  });
});

describe("Logarithmic Scale Axes", () => {
  it("should generate a valid SVG plot with log scale on x-axis", () => {
    const svg = mainModule.generateSVGPlot("log(x)", 1, 100, 1, "", true, false);
    expect(svg).toMatch(/10\.00/);
    expect(svg).toContain("<polyline");
  });

  it("should generate a valid SVG plot with log scale on y-axis", () => {
    const svg = mainModule.generateSVGPlot("x", 1, 100, 1, "", false, true);
    expect(svg).toMatch(/10\.00/);
    expect(svg).toContain("<polyline");
  });

  it("should generate a valid SVG plot with log scale on both axes", () => {
    const svg = mainModule.generateSVGPlot("x", 1, 100, 1, "", true, true);
    expect(svg).toMatch(/10\.00/);
    expect(svg).toContain("<polyline");
  });
});

describe("PNG Conversion Feature", () => {
  it("should generate a PNG file when --file option ends with .png", async () => {
    const args = ["--plot", "sin(x)", "--xmin", "0", "--xmax", "6.28", "--points", "100", "--file", "test_output.png"];
    await mainModule.main(args);
    expect(fs.existsSync("test_output.png")).toBe(true);
    const fileBuffer = fs.readFileSync("test_output.png");
    const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
    expect(fileBuffer.slice(0, 8)).toEqual(pngSignature);
  });
});

describe("Custom Dimensions Feature", () => {
  it("should generate an SVG with custom width and height when provided via CLI options", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--plot", "sin(x)", "--xmin", "0", "--xmax", "6.28", "--points", "100", "--width", "600", "--height", "400"];
    await mainModule.main(args);
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain('width="600"');
    expect(output).toContain('height="400"');
    consoleSpy.mockRestore();
  });

  it("should generate SVG with default dimensions when no custom dimensions are provided", () => {
    const svg = mainModule.generateSVGPlot("sin(x)", 0, 10, 0.5);
    expect(svg).toContain('width="500"');
    expect(svg).toContain('height="300"');
  });
});
