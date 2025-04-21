import { describe, test, expect, vi } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { main, generateTimeSeriesData, serializeTimeSeries } from "../../src/lib/main.js";
import fs from "fs";

const TOLERANCE = 0.0001;

// Utility function to check if SVG contains required elements
function svgContainsElements(svg, elements) {
  return elements.every((tag) => svg.includes(`<${tag}`));
}

// Utility function to check if SVG contains specific text
function svgContainsText(svg, text) {
  return svg.includes(text);
}

// Utility function to extract marker attributes from circle elements in SVG
function getMarkerAttributes(svg) {
  const markerRegex = /<circle[^>]*>/g;
  const circles = svg.match(markerRegex) || [];
  // Extract r and fill from the first circle
  const attrRegex = /r="(\d+)".*fill="([^"]+)"/;
  if (circles.length > 0) {
    const match = circles[0].match(attrRegex);
    if (match) {
      return { r: match[1], fill: match[2] };
    }
  }
  return null;
}

// Utility function to extract marker attributes from rect elements in SVG (for square markers)
function getSquareMarkerAttributes(svg) {
  const markerRegex = /<rect[^>]*>/g;
  const rects = svg.match(markerRegex) || [];
  // Filter out potential background rect (assume background rect covers full width and height if present)
  const filtered = rects.filter(rect => !rect.includes('width="500"') && !rect.includes('height="500"'));
  const attrRegex = /x="([^"]+)".*y="([^"]+)".*width="(\d+)".*height="(\d+)".*fill="([^"]+)"/;
  if (filtered.length > 0) {
    const match = filtered[0].match(attrRegex);
    if (match) {
      return { x: match[1], y: match[2], width: match[3], height: match[4], fill: match[5] };
    }
  }
  return null;
}

// Utility functions to check for background rect and grid line attributes
function svgContainsRectWithFill(svg, fill) {
  const rectRegex = new RegExp(`<rect[^>]*fill="${fill}"`, "i");
  return rectRegex.test(svg);
}

function svgContainsLineWithStroke(svg, stroke) {
  const lineRegex = new RegExp(`<line[^>]*stroke="${stroke}"`, "i");
  return lineRegex.test(svg);
}

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error", async () => {
    process.argv = ["node", "src/lib/main.js"];
    await main([]);
  });
});

describe("Plot Generation", () => {
  test("should generate enhanced SVG file with axes and data points when valid parameters are provided and file extension is not .csv", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = ["--expression", "y=sin(x)", "--range", "x=-1:1", "--file", "output.svg"];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    const condition =
      svgContainsElements(writtenData, ["line", "circle"]) ||
      svgContainsElements(writtenData, ["line", "polyline", "circle"]);
    expect(condition).toBe(true);
    writeFileSyncSpy.mockRestore();
  });
});

describe("Time Series Data Generation", () => {
  test("should generate at least 10 data points with numeric x and y for sin(x)", () => {
    const data = generateTimeSeriesData("y=sin(x)", "x=0:6.28");
    expect(data.length).toBeGreaterThanOrEqual(10);
    for (const point of data) {
      expect(typeof point.x).toBe("number");
      expect(typeof point.y).toBe("number");
      expect(point.y).toBeGreaterThanOrEqual(-1);
      expect(point.y).toBeLessThanOrEqual(1);
    }
  });

  test("should generate at least 10 data points with numeric x and y for cos(x)", () => {
    const data = generateTimeSeriesData("y=cos(x)", "x=0:6.28");
    expect(data.length).toBeGreaterThanOrEqual(10);
    for (const point of data) {
      expect(typeof point.x).toBe("number");
      expect(typeof point.y).toBe("number");
      expect(Math.abs(point.y - Math.cos(point.x))).toBeLessThan(TOLERANCE);
    }
  });

  test("should generate at least 10 data points with numeric x and y for tan(x)", () => {
    // Using a safe range to avoid extreme tan(x) values
    const data = generateTimeSeriesData("y=tan(x)", "x=0:0.5");
    expect(data.length).toBeGreaterThanOrEqual(10);
    for (const point of data) {
      expect(typeof point.x).toBe("number");
      expect(typeof point.y).toBe("number");
      expect(Math.abs(point.y - Math.tan(point.x))).toBeLessThan(TOLERANCE);
    }
  });
});

describe("Serialize Time Series Data", () => {
  test("should produce a CSV string with header and data rows", () => {
    const sampleData = [
      { x: 0, y: 0 },
      { x: 1, y: 0.8415 },
      { x: 2, y: 0.9093 }
    ];
    const csvOutput = serializeTimeSeries(sampleData);
    const lines = csvOutput.trim().split("\n");
    expect(lines[0]).toBe("x,y");
    expect(lines.length).toBe(sampleData.length + 1);
  });
});

describe("CLI CSV Generation", () => {
  test("should print CSV content to stdout when --file ends with .csv", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=0:6.28", "--file", "output.csv"];
    await main(args);
    // The CSV content should be printed in console.log (second call) and starts with 'x,y'
    const output = logSpy.mock.calls[1][0];
    expect(output.startsWith("x,y")).toBe(true);
    logSpy.mockRestore();
  });
});

describe("CLI PNG Generation", () => {
  test("should generate PNG using sharp when --file ends with .png", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = ["--expression", "y=sin(x)", "--range", "x=0:6.28", "--file", "output.png"];
    await main(args);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const [filename, buffer] = writeFileSyncSpy.mock.calls[0];
    expect(filename).toBe("output.png");
    // PNG files start with the following 8-byte signature: 89 50 4E 47 0D 0A 1A 0A
    const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(buffer.slice(0, 8)).toEqual(pngSignature);
    writeFileSyncSpy.mockRestore();
  });
});

describe("Custom Point Count", () => {
  test("should return exactly 5 data points when custom points count is 5", () => {
    const data = generateTimeSeriesData("y=sin(x)", "x=0:6.28", 5);
    expect(data.length).toBe(5);
  });

  test("should return exactly 20 data points when custom points count is 20", () => {
    const data = generateTimeSeriesData("y=sin(x)", "x=0:6.28", 20);
    expect(data.length).toBe(20);
  });

  test("CLI should use custom points count when provided", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=0:6.28", "--points", "15", "--file", "output.csv"];
    await main(args);
    const output = logSpy.mock.calls[1][0];
    // Verify CSV content has header + 15 data rows
    const lines = output.trim().split("\n");
    expect(lines.length).toBe(16);
    logSpy.mockRestore();
  });

  test("CLI should default to 10 points when --points option is not provided", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=0:6.28", "--file", "output.csv"];
    await main(args);
    const output = logSpy.mock.calls[1][0];
    const lines = output.trim().split("\n");
    expect(lines.length).toBe(11);
    logSpy.mockRestore();
  });
});

describe("Additional Expression Support", () => {
  test("should generate correct data for y=log(x) within valid domain", () => {
    const data = generateTimeSeriesData("y=log(x)", "x=1:10", 10);
    for (const point of data) {
      expect(point.x).toBeGreaterThan(0);
      expect(Math.abs(point.y - Math.log(point.x))).toBeLessThan(TOLERANCE);
    }
  });

  test("should handle x<=0 for y=log(x) by defaulting to 0", () => {
    const data = generateTimeSeriesData("y=log(x)", "x=-5:5", 11);
    data.forEach((point) => {
      if (point.x <= 0) {
        expect(point.y).toBe(0);
      } else {
        expect(Math.abs(point.y - Math.log(point.x))).toBeLessThan(TOLERANCE);
      }
    });
  });

  test("should generate correct data for y=exp(x)", () => {
    const data = generateTimeSeriesData("y=exp(x)", "x=0:5", 10);
    data.forEach((point) => {
      expect(Math.abs(point.y - Math.exp(point.x))).toBeLessThan(TOLERANCE);
    });
  });

  test("should generate correct data for y=x^2", () => {
    const data = generateTimeSeriesData("y=x^2", "x=-3:3", 13);
    data.forEach((point) => {
      expect(point.y).toBeCloseTo(point.x * point.x, 4);
    });
  });

  test("should generate correct data for y=sqrt(x)", () => {
    const data = generateTimeSeriesData("y=sqrt(x)", "x=0:16", 10);
    data.forEach((point) => {
      expect(Math.abs(point.y - Math.sqrt(point.x))).toBeLessThan(TOLERANCE);
    });
  });

  test("should generate correct data for y=x^3", () => {
    const data = generateTimeSeriesData("y=x^3", "x=0:10", 11);
    data.forEach((point) => {
      expect(point.y).toBeCloseTo(point.x * point.x * point.x, 4);
    });
  });
});

describe("CLI Generation Message", () => {
  test("should log the correct generation message for non-csv files", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-1:1", "--file", "output.svg"];
    await main(args);
    const expectedMessage = "Generating plot for expression y=sin(x) with range x=-1:1 to file output.svg.";
    expect(logSpy.mock.calls[0][0]).toBe(expectedMessage);
    logSpy.mockRestore();
  });

  test("should log the correct generation message to stderr for CSV files", async () => {
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=0:6.28", "--file", "output.csv"];
    await main(args);
    const expectedMessage = "Generating plot for expression y=sin(x) with range x=0:6.28 to file output.csv.";
    expect(errSpy.mock.calls[0][0]).toBe(expectedMessage);
    errSpy.mockRestore();
    logSpy.mockRestore();
  });

  test("should embed custom title and axis labels when provided", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-1:1",
      "--file", "output.svg",
      "--title", "Custom Plot",
      "--xlabel", "Custom X",
      "--ylabel", "Custom Y"
    ];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(svgContainsText(writtenData, "Custom Plot")).toBe(true);
    expect(svgContainsText(writtenData, "Custom X")).toBe(true);
    expect(svgContainsText(writtenData, "Custom Y")).toBe(true);
    writeFileSyncSpy.mockRestore();
  });
});

describe("Custom Marker Options", () => {
  test("should generate SVG with custom marker size and color when provided via CLI", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-1:1",
      "--file", "output.svg",
      "--marker-size", "5",
      "--marker-color", "green"
    ];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    const markerAttrs = getMarkerAttributes(writtenData);
    expect(markerAttrs).not.toBeNull();
    expect(markerAttrs.r).toBe("5");
    expect(markerAttrs.fill).toBe("green");
    writeFileSyncSpy.mockRestore();
  });

  test("should generate SVG with default marker options when not provided", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = ["--expression", "y=sin(x)", "--range", "x=-1:1", "--file", "output.svg"];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    const markerAttrs = getMarkerAttributes(writtenData);
    expect(markerAttrs).not.toBeNull();
    expect(markerAttrs.r).toBe("3");
    expect(markerAttrs.fill).toBe("red");
    writeFileSyncSpy.mockRestore();
  });
});

describe("Custom Marker Shape", () => {
  test("should generate SVG with square markers when --marker-shape square is provided", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-1:1",
      "--file", "output.svg",
      "--marker-shape", "square",
      "--marker-size", "5",
      "--marker-color", "green"
    ];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    // Ensure no circle markers are present
    expect(writtenData.includes('<circle')).toBe(false);
    // Check that at least one rect marker with width 10 and height 10 and fill green is present
    const squareMarker = getSquareMarkerAttributes(writtenData);
    expect(squareMarker).not.toBeNull();
    expect(squareMarker.width).toBe("10");
    expect(squareMarker.height).toBe("10");
    expect(squareMarker.fill).toBe("green");
    writeFileSyncSpy.mockRestore();
  });
});

describe("Background and Grid Customization", () => {
  test("should include a background rectangle with the specified bgColor and grid lines with the specified gridColor", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-1:1",
      "--file", "output.svg",
      "--bgColor", "#f0f0f0",
      "--gridColor", "#cccccc",
      "--grid-dasharray", "2,2"
    ];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(svgContainsRectWithFill(writtenData, "#f0f0f0")).toBe(true);
    expect(svgContainsLineWithStroke(writtenData, "#cccccc")).toBe(true);
    writeFileSyncSpy.mockRestore();
  });
});

describe("Custom Font Family", () => {
  test("should generate SVG with custom font family when provided via CLI", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-1:1",
      "--file", "output.svg",
      "--font-family", "Courier"
    ];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenData).toContain('font-family="Courier"');
    writeFileSyncSpy.mockRestore();
  });

  test("should generate SVG with default font family when not provided", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = ["--expression", "y=sin(x)", "--range", "x=-1:1", "--file", "output.svg"];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenData).toContain('font-family="sans-serif"');
    writeFileSyncSpy.mockRestore();
  });
});

describe("Custom Grid Dash Pattern", () => {
  test("should use custom grid dash pattern when --grid-dasharray option is provided", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-1:1",
      "--file", "output.svg",
      "--gridColor", "#cccccc",
      "--grid-dasharray", "2,2"
    ];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenData).toContain('stroke-dasharray="2,2"');
    writeFileSyncSpy.mockRestore();
  });
});

describe("Custom Dimensions Option", () => {
  test("should generate SVG with custom width and height attributes when provided via CLI", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-1:1",
      "--file", "output.svg",
      "--width", "800",
      "--height", "600"
    ];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenData).toContain('width="800"');
    expect(writtenData).toContain('height="600"');
    writeFileSyncSpy.mockRestore();
  });
});
