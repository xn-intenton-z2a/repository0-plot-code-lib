import { describe, test, expect, vi } from "vitest";
import { main } from "@src/lib/main.js";
import fs from "fs";

// Helper to reset spies
function resetSpies(spies) {
  spies.forEach(spy => spy.mockRestore());
}

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});

describe("Default main behavior", () => {
  test("should terminate without error when no arguments provided", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    await main();
    expect(consoleSpy).toHaveBeenCalledWith("No arguments provided. Use --help to see usage instructions.");
    consoleSpy.mockRestore();
  });

  test("should display help when '--help' is passed", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    await main(["--help"]);
    expect(consoleSpy).toHaveBeenCalledWith("Usage: node src/lib/main.js --expression <exp> --range <range> --file <filepath> [--evaluate] [--diagnostics] [--color <color>] [--stroke <number>] [--width <number>] [--height <number>] [--padding <number>] [--samples <number>] [--grid] [--marker]");
    consoleSpy.mockRestore();
  });

  test("should validate and print arguments when valid parameters are provided", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    await main(["--expression", "y=sin(x)", "--range", "x=-1:-1,y=-1:-1", "--file", "output.svg"]);
    expect(consoleSpy).toHaveBeenCalledWith('Validated arguments: {"expression":"y=sin(x)","range":"x=-1:-1,y=-1:-1","file":"output.svg"}');
    expect(consoleSpy).toHaveBeenCalledWith('Generating plot for expression: y=sin(x) with range: x=-1:-1,y=-1:-1');
    expect(consoleSpy).toHaveBeenLastCalledWith("Plot saved to output.svg");
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });

  test("should error and exit when missing required arguments", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => { throw new Error("process.exit") });
    try {
      await main(["--expression", "y=sin(x)", "--range", "x=-1:-1"]);
    } catch (e) {
      expect(e.message).toBe("process.exit");
    }
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error: Invalid arguments.");
    resetSpies([consoleErrorSpy, processExitSpy]);
  });

  test("should error and exit when provided malformed range", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => { throw new Error("process.exit") });
    try {
      await main(["--expression", "y=sin(x)", "--range", "invalid_range", "--file", "output.svg"]);
    } catch (e) {
      expect(e.message).toBe("process.exit");
    }
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error: Invalid arguments.");
    resetSpies([consoleErrorSpy, processExitSpy]);
  });

  test("should error and exit when file extension is incorrect", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => { throw new Error("process.exit") });
    try {
      await main(["--expression", "y=sin(x)", "--range", "x=-1:-1,y=-1:-1", "--file", "output.txt"]);
    } catch (e) {
      expect(e.message).toBe("process.exit");
    }
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error: Invalid arguments.");
    resetSpies([consoleErrorSpy, processExitSpy]);
  });

  test("should generate and save an SVG plot", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=cos(x)", "--range", "x=0:10,y=0:5", "--file", "plot.svg"]);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenContent).toContain("<svg");
    expect(consoleSpy).toHaveBeenLastCalledWith("Plot saved to plot.svg");
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });
});

describe("Evaluate functionality", () => {
  test("should output time series data when --evaluate flag is provided", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    await main(["--expression", "y=sin(x)", "--range", "x=0:6,y=-1:1", "--file", "eval.svg", "--evaluate"]);
    const evalCall = consoleSpy.mock.calls.find(call => typeof call[0] === 'string' && call[0].startsWith("Time series data:"));
    expect(evalCall).toBeDefined();
    const logged = evalCall[1] || '';
    let data;
    try {
      data = JSON.parse(logged);
    } catch (e) {
      data = null;
    }
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBe(100);
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });
});

describe("Diagnostics functionality", () => {
  test("should output diagnostic info when '--diagnostics' flag is provided", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    await main(["--diagnostics", "--expression", "y=sin(x)", "--range", "x=-1:-1,y=-1:-1", "--file", "diag.svg"]);
    const diagCall = consoleSpy.mock.calls.find(call => call[0].includes("Diagnostics - Raw CLI arguments:"));
    expect(diagCall).toBeDefined();
    const validatedCall = consoleSpy.mock.calls.find(call => call[0].startsWith("Validated arguments:"));
    expect(validatedCall).toBeDefined();
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });
});

describe("PNG Plot Generation", () => {
  test("should generate and save a PNG plot", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log");
    await main(["--expression", "y=cos(x)", "--range", "x=0:10,y=0:5", "--file", "plot.png"]);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(Buffer.isBuffer(writtenContent)).toBe(true);
    expect(writtenContent[0]).toBe(0x89);
    expect(consoleSpy).toHaveBeenLastCalledWith("Plot saved to plot.png");
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });
});

describe("Custom Plot Styling", () => {
  test("should use default stroke and color when not provided", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=sin(x)", "--range", "x=0:10,y=0:5", "--file", "custom.svg"]);
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenContent).toContain('stroke="black"');
    expect(writtenContent).toContain('stroke-width="2"');
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });

  test("should apply custom color and stroke width when provided", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=cos(x)", "--range", "x=0:10,y=0:5", "--file", "custom.svg", "--color", "blue", "--stroke", "5"]);
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenContent).toContain('stroke="blue"');
    expect(writtenContent).toContain('stroke-width="5"');
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });
});

describe("Single X-Range Format", () => {
  test("should generate and save an SVG plot when only x-range is provided", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=sin(x)", "--range", "x=-1:1", "--file", "xrange.svg"]);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenContent).toContain("<svg");
    expect(consoleSpy).toHaveBeenLastCalledWith("Plot saved to xrange.svg");
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });
});

describe("Explicit Y-Range Support", () => {
  test("should use provided y-range boundaries in SVG output", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=2", "--range", "x=0:10,y=-2:2", "--file", "yrange.svg"]);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    const pointsMatch = writtenContent.match(/<polyline[^>]*points="([^"]+)"/);
    expect(pointsMatch).toBeDefined();
    const pointsStr = pointsMatch[1];
    const points = pointsStr.split(" ");
    points.forEach(point => {
      const coords = point.split(",");
      expect(Number(coords[0])).toBeGreaterThanOrEqual(20);
      expect(Number(coords[1])).toBeLessThanOrEqual(480);
    });
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });
});

describe("Additional Math Functions", () => {
  test("should generate and save an SVG plot for sqrt function", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=sqrt(x)", "--range", "x=0:9,y=0:3", "--file", "sqrt.svg"]);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenContent).toContain("<svg");
    expect(consoleSpy).toHaveBeenLastCalledWith("Plot saved to sqrt.svg");
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });

  test("should generate and save an SVG plot for log function", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=log(x)", "--range", "x=1:10,y=0:3", "--file", "log.svg"]);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenContent).toContain("<svg");
    expect(consoleSpy).toHaveBeenLastCalledWith("Plot saved to log.svg");
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });

  test("should generate and save an SVG plot for exp function", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=exp(x)", "--range", "x=0:2,y=1:8", "--file", "exp.svg"]);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenContent).toContain("<svg");
    expect(consoleSpy).toHaveBeenLastCalledWith("Plot saved to exp.svg");
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });
});

describe("CSV Export Functionality", () => {
  test("should generate and save a CSV file with header and data rows matching sample count", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=sin(x)", "--range", "x=0:6,y=-1:1", "--file", "data.csv", "--samples", "150"]);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    const lines = writtenContent.split("\n");
    expect(lines[0]).toBe("x,y");
    expect(lines.length).toBe(151);
    expect(consoleSpy).toHaveBeenLastCalledWith("Time series CSV exported to data.csv");
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });
});

describe("Custom Canvas Dimensions and Padding Options", () => {
  test("should generate SVG with custom canvas width, height, and padding", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=sin(x)", "--range", "x=-1:1", "--file", "customDimensions.svg", "--width", "800", "--height", "600", "--padding", "50"]);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenContent).toContain('<svg width="800" height="600"');
    expect(writtenContent).toContain('<polyline');
    expect(consoleSpy).toHaveBeenLastCalledWith("Plot saved to customDimensions.svg");
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });
});

describe("Custom Samples Count", () => {
  test("should override default sample count with custom --samples flag", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    await main(["--expression", "y=sin(x)", "--range", "x=0:6,y=-1:1", "--file", "customSamples.svg", "--evaluate", "--samples", "50"]);
    const logCall = consoleSpy.mock.calls.find(call => typeof call[0] === 'string' && call[0].startsWith("Time series data:"));
    expect(logCall).toBeDefined();
    const jsonStr = logCall[1] ? logCall[1].trim() : '';
    let data;
    try {
      data = JSON.parse(jsonStr);
    } catch (e) {
      data = [];
    }
    expect(data.length).toBe(50);
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });
});

describe("Grid functionality", () => {
  test("should include gridlines when --grid flag is provided", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=sin(x)", "--range", "x=-1:1", "--file", "grid.svg", "--grid"]);
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenContent).toContain("<line");
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });
});

describe("Marker functionality", () => {
  test("should include marker circles when --marker flag is provided in SVG output", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=cos(x)", "--range", "x=0:10,y=0:5", "--file", "marker.svg", "--marker"]);
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenContent).toContain("<circle");
    const circleMatches = writtenContent.match(/<circle/g);
    expect(circleMatches).not.toBeNull();
    expect(circleMatches.length).toBeGreaterThan(0);
    expect(consoleSpy).toHaveBeenLastCalledWith("Plot saved to marker.svg");
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });

  test("should not include markers in CSV export even if --marker flag is provided", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=cos(x)", "--range", "x=0:10,y=0:5", "--file", "data.csv", "--marker"]);
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenContent).not.toContain("<circle");
    expect(consoleSpy).toHaveBeenLastCalledWith("Time series CSV exported to data.csv");
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });
});

// Tests for Multiple Expressions
describe("Multiple Expressions Functionality", () => {
  test("should generate SVG with multiple polyline elements for multiple expressions", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=sin(x);y=cos(x)", "--range", "x=0:10,y=-1:1", "--file", "multiexpr.svg"]);
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    // Expect at least two polyline elements
    const polylineMatches = writtenContent.match(/<polyline/g);
    expect(polylineMatches).not.toBeNull();
    expect(polylineMatches.length).toBeGreaterThanOrEqual(2);
    expect(consoleSpy).toHaveBeenLastCalledWith("Plot saved to multiexpr.svg");
    resetSpies([writeFileSyncSpy, consoleSpy]);
  });

  test("should error when multiple expressions are used with CSV export", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => { throw new Error("process.exit") });
    try {
      await main(["--expression", "y=sin(x);y=cos(x)", "--range", "x=0:6,y=-1:1", "--file", "multiexpr.csv"]);
    } catch (e) {
      expect(e.message).toBe("process.exit");
    }
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error: CSV export does not support multiple expressions.");
    resetSpies([consoleErrorSpy, processExitSpy]);
  });
});
