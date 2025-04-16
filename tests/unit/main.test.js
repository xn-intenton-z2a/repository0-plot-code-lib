import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
import fs from "fs";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("Plot generation CLI options", () => {
  test("should generate a file when all required flags are provided (SVG)", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const fsSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    main(["--expression", "y=sin(x)", "--range", "x=-1:1", "--file", "output.svg"]);
    expect(fsSpy).toHaveBeenCalledWith(
      "output.svg",
      `<svg xmlns="http://www.w3.org/2000/svg"><text x="10" y="20">y=sin(x) on x=-1:1</text></svg>`
    );
    expect(logSpy).toHaveBeenCalledWith("File output.svg generated successfully.");
    fsSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should display usage message when incomplete options are provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--expression", "y=sin(x)"]);
    expect(logSpy).toHaveBeenCalledWith('Error: Missing required options. Usage: node src/lib/main.js --expression <expression> --range <range> --file <file>');
    logSpy.mockRestore();
  });
});

describe("Time series data generation", () => {
  test("should output valid JSON time series when --expression and --range are provided without --file", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--expression", "Math.sin(x)", "--range", "x=0:6.28"]);
    const output = logSpy.mock.calls[0][0];
    let series;
    expect(() => { series = JSON.parse(output); }).not.toThrow();
    expect(Array.isArray(series)).toBe(true);
    expect(series.length).toBe(100);
    series.forEach((point) => {
      expect(typeof point.x).toBe("number");
      expect(point).toHaveProperty("y");
      if (point.y !== null) {
        expect(typeof point.y).toBe("number");
      }
    });
    logSpy.mockRestore();
  });

  test("should show error for invalid range format", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--expression", "Math.sin(x)", "--range", "invalidRange"]);
    expect(logSpy).toHaveBeenCalledWith('Error: Range format invalid. Expected format "x=min:max"');
    logSpy.mockRestore();
  });
});

describe("Invalid Numeric Range Bounds", () => {
  test("should show error for non-numeric range bounds", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--expression", "Math.sin(x)", "--range", "x=a:b"]);
    expect(logSpy).toHaveBeenCalledWith('Error: Range bounds must be numeric.');
    logSpy.mockRestore();
  });
});

describe("NaN Handling in Time Series Generation", () => {
  test("should replace NaN results with null", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--expression", "Math.sqrt(-1)", "--range", "x=0:10"]);
    const output = logSpy.mock.calls[0][0];
    let series;
    expect(() => { series = JSON.parse(output); }).not.toThrow();
    expect(Array.isArray(series)).toBe(true);
    expect(series.length).toBe(100);
    series.forEach(point => {
      expect(point.y).toBeNull();
    });
    logSpy.mockRestore();
  });
});

describe("Maintenance issues handling", () => {
  test("should output error when --maintenance flag is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--maintenance"]);
    expect(logSpy).toHaveBeenCalledWith("Error: Maximum Open Maintenance Issues Reached. Please resolve the existing issues before submitting new maintenance issues.");
    logSpy.mockRestore();
  });
});

describe("PNG file generation", () => {
  test("should generate a PNG file with dummy content when --file ends with .png", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const fsSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    main(["--expression", "Math.cos(x)", "--range", "x=0:3.14", "--file", "output.png"]);
    expect(fsSpy).toHaveBeenCalledWith("output.png", "PNG content: Math.cos(x) on x=0:3.14");
    expect(logSpy).toHaveBeenCalledWith("File output.png generated successfully.");
    fsSpy.mockRestore();
    logSpy.mockRestore();
  });
});

describe("Custom Sample Count Handling", () => {
  test("should generate the specified number of samples when --samples flag is provided with a valid integer", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--expression", "Math.sin(x)", "--range", "x=0:6.28", "--samples", "50"]);
    const output = logSpy.mock.calls[0][0];
    let series;
    expect(() => { series = JSON.parse(output); }).not.toThrow();
    expect(Array.isArray(series)).toBe(true);
    expect(series.length).toBe(50);
    logSpy.mockRestore();
  });

  test("should fallback to default 100 samples when --samples flag is provided with an invalid value", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--expression", "Math.sin(x)", "--range", "x=0:6.28", "--samples", "abc"]);
    const output = logSpy.mock.calls[0][0];
    let series;
    expect(() => { series = JSON.parse(output); }).not.toThrow();
    expect(Array.isArray(series)).toBe(true);
    expect(series.length).toBe(100);
    logSpy.mockRestore();
  });
});
