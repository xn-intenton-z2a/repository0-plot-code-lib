import { describe, test, expect, vi } from "vitest";
import { main } from "@src/lib/main.js";
import fs from "fs";

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
    expect(consoleSpy).toHaveBeenCalledWith("Usage: node src/lib/main.js --expression <exp> --range <range> --file <filepath> [--evaluate] [--diagnostics] [--color <color>] [--stroke <number>");
    consoleSpy.mockRestore();
  });

  test("should validate and print arguments when valid parameters are provided", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    await main(["--expression", "y=sin(x)", "--range", "x=-1:-1,y=-1:-1", "--file", "output.svg"]);
    expect(consoleSpy).toHaveBeenCalledWith('Validated arguments: {"expression":"y=sin(x)","range":"x=-1:-1,y=-1:-1","file":"output.svg"}');
    writeFileSyncSpy.mockRestore();
    consoleSpy.mockRestore();
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
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
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
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
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
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  test("should generate and save an SVG plot", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=cos(x)", "--range", "x=0:10,y=0:5", "--file", "plot.svg"]);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenContent).toContain("<svg");
    expect(consoleSpy).toHaveBeenLastCalledWith("Plot saved to plot.svg");
    writeFileSyncSpy.mockRestore();
    consoleSpy.mockRestore();
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
    writeFileSyncSpy.mockRestore();
    consoleSpy.mockRestore();
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
    writeFileSyncSpy.mockRestore();
    consoleSpy.mockRestore();
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
    writeFileSyncSpy.mockRestore();
    consoleSpy.mockRestore();
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
    writeFileSyncSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  test("should apply custom color and stroke width when provided", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=cos(x)", "--range", "x=0:10,y=0:5", "--file", "custom.svg", "--color", "blue", "--stroke", "5"]);
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenContent).toContain('stroke="blue"');
    expect(writtenContent).toContain('stroke-width="5"');
    writeFileSyncSpy.mockRestore();
    consoleSpy.mockRestore();
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
    writeFileSyncSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});

describe("Explicit Y-Range Support", () => {
  test("should use provided y-range boundaries in SVG output", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    // Using a constant expression so that y is always 2
    await main(["--expression", "y=2", "--range", "x=0:10,y=-2:2", "--file", "yrange.svg"]);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const writtenContent = writeFileSyncSpy.mock.calls[0][1];
    // Extract the points attribute from the polyline
    const pointsMatch = writtenContent.match(/<polyline[^>]*points="([^"]+)"/);
    expect(pointsMatch).toBeDefined();
    const pointsStr = pointsMatch[1];
    const points = pointsStr.split(" ");
    // For expression y=2 and provided y-range -2:2, mapY(2) should be:
    // mapY(2) = height - padding - ((2 - (-2))/(2 - (-2)))*(height - 2*padding)
    // = 500-20 - (4/4)*(500-40) = 480 - 460 = 20
    points.forEach(point => {
      const coords = point.split(",");
      expect(Number(coords[1])).toBeCloseTo(20, 0);
    });
    writeFileSyncSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
