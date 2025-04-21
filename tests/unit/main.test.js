import { describe, test, expect, vi } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { main, generateTimeSeriesData, serializeTimeSeries } from "../../src/lib/main.js";
import fs from "fs";

const TOLERANCE = 0.0001;

// Utility function to check if SVG contains required elements
function svgContainsElements(svg, elements) {
  return elements.every(tag => svg.includes(`<${tag}`));
}

// Utility function to check if SVG contains specific text
function svgContainsText(svg, text) {
  return svg.includes(text);
}

// Updated utility function to extract marker attributes from circle elements in SVG (supports self-closing tags)
function getMarkerAttributes(svg) {
  const markerRegex = /<circle\b[^>]*\/?>(?:<\/circle>)?/g;
  const circles = svg.match(markerRegex) || [];
  const attrRegex = /r="(\d+)"[^>]*fill="([^"]+)"/;
  if (circles.length > 0) {
    const match = circles[0].match(attrRegex);
    if (match) {
      return { r: match[1], fill: match[2] };
    }
  }
  return null;
}

// Updated utility function to extract marker attributes from rect elements in SVG for square markers (supports self-closing tags)
function getSquareMarkerAttributes(svg) {
  const markerRegex = /<rect\b(?!.*width="500")(?!.*height="500")[^>]*\/?>(?:<\/rect>)?/g;
  const rects = svg.match(markerRegex) || [];
  const attrRegex = /x="([^"]+)"[^>]*y="([^"]+)"[^>]*width="(\d+)"[^>]*height="(\d+)"[^>]*fill="([^"]+)"/;
  if (rects.length > 0) {
    const match = rects[0].match(attrRegex);
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

describe("Diagnostics Mode", () => {
  test("should output diagnostic JSON report when --diagnostics flag is provided", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=0:6.28", "--file", "output.svg", "--diagnostics"]; 
    await main(args);
    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.mock.calls[0][0];
    let parsed;
    expect(() => { parsed = JSON.parse(output); }).not.toThrow();
    expect(parsed).toHaveProperty("mergedOptions");
    expect(parsed).toHaveProperty("envDetails");
    expect(parsed.envDetails).toHaveProperty("cwd");
    expect(parsed.envDetails).toHaveProperty("nodeVersion");
    expect(parsed.envDetails).toHaveProperty("platform");
    logSpy.mockRestore();
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

// New test for Blue Theme
describe("Blue Theme Application", () => {
  test("should apply blue theme settings with correct background, marker, grid and font settings", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-1:1", "--file", "output.svg", "--theme", "blue"];
    await main(args);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenData).toContain('fill="#003366"'); // background color
    expect(writtenData).toContain('stroke="#99CCFF"'); // grid lines
    expect(writtenData).toContain('font-family="Courier New"'); // font-family for texts
    expect(writtenData).toContain('fill="#FFD700"'); // marker color
    writeFileSyncSpy.mockRestore();
  });
});

// New test for Custom Theme Config Application
describe("Custom Theme Config Application", () => {
  const configFilePath = "customTheme.json";
  const customConfig = {
    bgColor: "#customBgColor",
    markerColor: ["#customMarker"],
    gridColor: "#customGridColor",
    fontFamily: "CustomFont"
  };

  beforeAll(() => {
    fs.writeFileSync(configFilePath, JSON.stringify(customConfig));
  });

  afterAll(() => {
    fs.unlinkSync(configFilePath);
  });

  test("should override theme settings with values from external JSON config", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-1:1", "--file", "output.svg", "--theme", "blue", "--theme-config", configFilePath];
    await main(args);
    expect(writeFileSyncSpy).toHaveBeenCalled();
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    // Should reflect custom theme values
    expect(writtenData).toContain('fill="#customBgColor"');
    expect(writtenData).toContain("#customMarker");
    expect(writtenData).toContain('stroke="#customGridColor"');
    expect(writtenData).toContain('font-family="CustomFont"');
    writeFileSyncSpy.mockRestore();
  });
});
