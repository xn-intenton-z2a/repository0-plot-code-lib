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

// Utility function to extract marker attributes from circle elements in SVG
function getMarkerAttributes(svg) {
  const markerRegex = /<circle[^>]*>/g;
  const circles = svg.match(markerRegex) || [];
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
    const data = generateTimeSeriesData("y=tan(x)", "x=0:0.5");
    expect(data.length).toBeGreaterThanOrEqual(10);
    for (const point of data) {
      expect(typeof point.x).toBe("number");
      expect(typeof point.y).toBe("number");
      expect(Math.abs(point.y - Math.tan(point.x))).toBeLessThan(TOLERANCE);
    }
  });

  test("should generate correct data for y=log(x) within valid domain", () => {
    const data = generateTimeSeriesData("y=log(x)", "x=1:10", 10);
    for (const point of data) {
      expect(point.x).toBeGreaterThan(0);
      expect(Math.abs(point.y - Math.log(point.x))).toBeLessThan(TOLERANCE);
    }
  });

  test("should handle x<=0 for y=log(x) by defaulting to 0", () => {
    const data = generateTimeSeriesData("y=log(x)", "x=-5:5", 11);
    data.forEach(point => {
      if (point.x <= 0) {
        expect(point.y).toBe(0);
      } else {
        expect(Math.abs(point.y - Math.log(point.x))).toBeLessThan(TOLERANCE);
      }
    });
  });

  test("should generate correct data for y=exp(x)", () => {
    const data = generateTimeSeriesData("y=exp(x)", "x=0:5", 10);
    data.forEach(point => {
      expect(Math.abs(point.y - Math.exp(point.x))).toBeLessThan(TOLERANCE);
    });
  });

  test("should generate correct data for y=x^2", () => {
    const data = generateTimeSeriesData("y=x^2", "x=-3:3", 13);
    data.forEach(point => {
      expect(point.y).toBeCloseTo(point.x * point.x, 4);
    });
  });

  test("should generate correct data for y=sqrt(x)", () => {
    const data = generateTimeSeriesData("y=sqrt(x)", "x=0:16", 10);
    data.forEach(point => {
      expect(Math.abs(point.y - Math.sqrt(point.x))).toBeLessThan(TOLERANCE);
    });
  });

  test("should generate correct data for y=x^3", () => {
    const data = generateTimeSeriesData("y=x^3", "x=0:10", 11);
    data.forEach(point => {
      expect(point.y).toBeCloseTo(point.x * point.x * point.x, 4);
    });
  });

  test("should generate correct data for y=sinh(x)", () => {
    const data = generateTimeSeriesData("y=sinh(x)", "x=-1:1", 11);
    data.forEach(point => {
      expect(Math.abs(point.y - Math.sinh(point.x))).toBeLessThan(TOLERANCE);
    });
  });

  test("should generate correct data for y=cosh(x)", () => {
    const data = generateTimeSeriesData("y=cosh(x)", "x=-1:1", 11);
    data.forEach(point => {
      expect(Math.abs(point.y - Math.cosh(point.x))).toBeLessThan(TOLERANCE);
    });
  });

  test("should generate correct data for y=tanh(x)", () => {
    const data = generateTimeSeriesData("y=tanh(x)", "x=-1:1", 11);
    data.forEach(point => {
      expect(Math.abs(point.y - Math.tanh(point.x))).toBeLessThan(TOLERANCE);
    });
  });

  test("should generate correct data for y=double(x) when custom function is provided as a string", () => {
    const data = generateTimeSeriesData("y=double(x)", "x=0:10", 11, { double: "(x)=>2*x" });
    data.forEach(point => {
      expect(point.y).toBeCloseTo(2 * point.x, 4);
    });
  });

  test("should generate correct data for y=double(x) when custom function is provided as a native function", () => {
    const data = generateTimeSeriesData("y=double(x)", "x=0:10", 11, { double: (x) => 2 * x });
    data.forEach(point => {
      expect(point.y).toBeCloseTo(2 * point.x, 4);
    });
  });
});

describe("Additional Mathematical Functions", () => {
  test("should generate correct data for y=abs(x)", () => {
    const points = 5;
    const data = generateTimeSeriesData("y=abs(x)", "x=-10:10", points);
    data.forEach(point => {
      expect(point.y).toBe(Math.abs(point.x));
    });
  });

  test("should generate correct data for y=floor(x)", () => {
    const points = 7;
    const data = generateTimeSeriesData("y=floor(x)", "x=0:5", points);
    data.forEach(point => {
      expect(point.y).toBe(Math.floor(point.x));
    });
  });

  test("should generate correct data for y=ceil(x)", () => {
    const points = 7;
    const data = generateTimeSeriesData("y=ceil(x)", "x=0:5", points);
    data.forEach(point => {
      expect(point.y).toBe(Math.ceil(point.x));
    });
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
    const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(buffer.slice(0, 8)).toEqual(pngSignature);
    writeFileSyncSpy.mockRestore();
  });
});

describe("PDF Generation", () => {
  test("should generate PDF using pdfkit and svg-to-pdfkit when --file ends with .pdf", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = ["--expression", "y=sin(x)", "--range", "x=0:6.28", "--file", "output.pdf"];
    await main(args);
    const [filename, buffer] = writeFileSyncSpy.mock.calls[0];
    expect(filename).toBe("output.pdf");
    const pdfSignature = Buffer.from('%PDF-');
    expect(buffer.slice(0, pdfSignature.length).toString()).toBe(pdfSignature.toString());
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

  test("CLI Generation Message should be correct for non-csv files", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-1:1", "--file", "output.svg"];
    await main(args);
    const expectedMessage = "Generating plot for expression y=sin(x) with range x=-1:1 to file output.svg.";
    expect(logSpy.mock.calls[0][0]).toBe(expectedMessage);
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
    expect(writtenData.includes('<circle')).toBe(false);
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

describe("YAML Configuration Override", () => {
  test("should override CLI options with YAML config settings", async () => {
    const tempYamlPath = "temp_config.yaml";
    const yamlContent = `
title: Custom Plot from YAML
ylabel: YAML Y
xlabel: YAML X
marker-size: 7
marker-color: blue
width: 700
height: 700
custom-functions: { double: "(x)=>2*x" }
fillColor: "#abcdef"
legend-position: "top-right"
legend-font: "Verdana"
legend-font-size: 16
legend-background: "#123456"
legend-title: "YAML Legend"
`;
    fs.writeFileSync(tempYamlPath, yamlContent, "utf8");

    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-1:1",
      "--file", "output.svg",
      "--config-yaml", tempYamlPath,
      "--title", "CLI Title",
      "--marker-size", "3",
      "--marker-color", "red"
    ];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(svgContainsText(writtenData, "Custom Plot from YAML")).toBe(true);
    expect(svgContainsText(writtenData, "YAML X")).toBe(true);
    expect(svgContainsText(writtenData, "YAML Y")).toBe(true);
    const markerAttrs = getMarkerAttributes(writtenData);
    expect(markerAttrs.r).toBe("7");
    expect(markerAttrs.fill).toBe("blue");
    expect(writtenData).toContain('fill="#abcdef"');
    // Check legend customizations from YAML
    expect(writtenData).toContain('transform="translate(');
    expect(writtenData).toContain('Verdana');
    expect(writtenData).toContain('16');
    expect(writtenData).toContain("YAML Legend");
    fs.unlinkSync(tempYamlPath);
    writeFileSyncSpy.mockRestore();
  });
});

describe("Piecewise Expression Support", () => {
  test("should evaluate piecewise expression: if x < 0 then sin(x); if x >= 0 then cos(x)", () => {
    const data = generateTimeSeriesData("piecewise: if x < 0 then sin(x); if x >= 0 then cos(x)", "x=-1:1", 11);
    data.forEach(point => {
      if (point.x < 0) {
        expect(Math.abs(point.y - Math.sin(point.x))).toBeLessThan(TOLERANCE);
      } else {
        expect(Math.abs(point.y - Math.cos(point.x))).toBeLessThan(TOLERANCE);
      }
    });
  });

  test("should default to 0 when no condition matches", () => {
    const data = generateTimeSeriesData("piecewise: if x > 1 then sin(x)", "x=0:1", 5);
    data.forEach(point => {
      expect(point.y).toBe(0);
    });
  });

  test("should handle edge case where x equals boundary value", () => {
    const data = generateTimeSeriesData("piecewise: if x <= 0 then sin(x); if x > 0 then cos(x)", "x=-0.5:0.5", 5);
    data.forEach(point => {
      if (point.x <= 0) {
        expect(Math.abs(point.y - Math.sin(point.x))).toBeLessThan(TOLERANCE);
      } else {
        expect(Math.abs(point.y - Math.cos(point.x))).toBeLessThan(TOLERANCE);
      }
    });
  });
});

describe("Fill Under Curve Option", () => {
  test("should include a polygon element with the specified fill color when --fillColor is provided", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = ["--expression", "y=sin(x)", "--range", "x=-1:1", "--file", "output.svg", "--fillColor", "#ff0000"];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenData).toContain('<polygon fill="#ff0000"');
    expect(writtenData).toMatch(/<polygon[^>]*points="[^"]+"/);
    writeFileSyncSpy.mockRestore();
  });

  test("should not include a polygon element when --fillColor is not provided", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = ["--expression", "y=sin(x)", "--range", "x=-1:1", "--file", "output.svg"];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenData).not.toContain('<polygon');
    writeFileSyncSpy.mockRestore();
  });

  test("should support gradient fill when fillColor contains multiple colors", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = ["--expression", "y=sin(x)", "--range", "x=-1:1", "--file", "output.svg", "--fillColor", "#ff0000,#0000ff"];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenData).toContain('<linearGradient');
    expect(writtenData).toMatch(/<stop offset="0%" stop-color="#ff0000"/);
    expect(writtenData).toMatch(/<stop offset="100%" stop-color="#0000ff"/);
    expect(writtenData).toContain('fill="url(#gradient_fill_0)"');
    writeFileSyncSpy.mockRestore();
  });
});

describe("Multi-Expression Overlay Plotting", () => {
  test("should generate SVG containing multiple polylines when multiple expressions are provided", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = [
      "--expression", "y=sin(x); y=cos(x)",
      "--range", "x=-1:1",
      "--file", "output.svg",
      "--marker-color", "red,blue",
      "--marker-size", "3,4",
      "--marker-shape", "circle,square"
    ];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    const polylineCount = (writtenData.match(/<polyline/g) || []).length;
    expect(polylineCount).toBe(2);
    expect(writtenData.includes('<circle')).toBe(true);
    expect(writtenData.includes('<rect')).toBe(true);
    writeFileSyncSpy.mockRestore();
  });
});

describe("Automatic Legend Generation", () => {
  test("should generate legend group with legend items for multi-series inputs", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = [
      "--expression", "y=sin(x); y=cos(x)",
      "--range", "x=-1:1",
      "--file", "output.svg",
      "--marker-size", "5,7",
      "--marker-color", "green,blue"
    ];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenData.includes('class="legend"')).toBe(true);
    expect(writtenData.includes('Series 1')).toBe(true);
    expect(writtenData.includes('Series 2')).toBe(true);
    writeFileSyncSpy.mockRestore();
  });
});

describe("Customized Legend Generation", () => {
  test("should generate legend with custom options", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = [
      "--expression", "y=sin(x); y=cos(x)",
      "--range", "x=-1:1",
      "--file", "output.svg",
      "--legend-position", "top-left",
      "--legend-font", "Arial",
      "--legend-font-size", "14",
      "--legend-background", "#f0f0f0",
      "--legend-title", "Data Series Legend"
    ];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenData).toContain('transform="translate(40, 40)"');
    expect(writtenData).toContain('>Data Series Legend</text>');
    expect(writtenData).toContain('fill="#f0f0f0"');
    expect(writtenData).toContain('font-family="Arial"');
    expect(writtenData).toContain('font-size="14"');
    writeFileSyncSpy.mockRestore();
  });
});

describe("Logarithmic Scale Options", () => {
  test("should apply logarithmic scaling on x-axis when --logScaleX is true", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    // Use a positive range for x to enable log scale
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=1:100",
      "--file", "output.svg",
      "--logScaleX", "true"
    ];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    // Check that the SVG was generated and contains a polyline
    expect(writtenData).toContain('<polyline');
    writeFileSyncSpy.mockRestore();
  });

  test("should apply logarithmic scaling on y-axis when --logScaleY is true", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    // Use a positive range for y by using an expression with positive outputs
    const args = [
      "--expression", "y=exp(x)",
      "--range", "x=1:3",
      "--file", "output.svg",
      "--logScaleY", "true"
    ];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenData).toContain('<polyline');
    writeFileSyncSpy.mockRestore();
  });

  test("should apply logarithmic scaling on both axes when --logScaleX and --logScaleY are true", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = [
      "--expression", "y=exp(x)",
      "--range", "x=1:10",
      "--file", "output.svg",
      "--logScaleX", "true",
      "--logScaleY", "true"
    ];
    await main(args);
    const writtenData = writeFileSyncSpy.mock.calls[0][1];
    expect(writtenData).toContain('<polyline');
    writeFileSyncSpy.mockRestore();
  });
});
