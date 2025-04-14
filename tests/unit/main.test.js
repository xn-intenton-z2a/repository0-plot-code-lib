import { describe, test, expect, afterEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
import fs from 'fs';

// Helper to delay execution for async writes
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default Demo Output", () => {
  test("should display usage instructions when no required args are provided", async () => {
    let outputContent = '';
    const originalLog = console.log;
    console.log = (msg) => { outputContent += msg; };
    await main();
    console.log = originalLog;
    expect(outputContent).toContain('Usage:');
  });
});

describe("PNG Output", () => {
  const outputFile = "test_output.png";

  afterEach(() => {
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }
  });

  test("should generate a valid PNG file", async () => {
    await main(["--expression", "y=sin(x)", "--range", "x=0:9,y=-1:1", "--file", outputFile]);
    // Wait for the asynchronous PNG generation if needed
    await delay(500);
    expect(fs.existsSync(outputFile)).toBe(true);

    const buffer = fs.readFileSync(outputFile);
    // Check PNG header: 89 50 4E 47 0D 0A 1A 0A
    const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(buffer.slice(0, 8).equals(pngHeader)).toBe(true);
  });
});

describe("SVG Output with Y-Range Scaling", () => {
  test("should generate SVG with correctly scaled cy positions", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => { outputContent += msg; };
    await main(["--expression", "y=sin(x)", "--range", "x=0:9,y=-1:1"]);
    console.log = originalLog;
    expect(outputContent).toContain('<svg');

    // Extract all cy values from the SVG
    const regex = /cy=\"([\d.]+)\"/g;
    let match;
    const cyValues = [];
    while ((match = regex.exec(outputContent)) !== null) {
      cyValues.push(parseFloat(match[1]));
    }

    expect(cyValues.length).toBeGreaterThan(0);
    // For y=-1, expected cy ~280 (bottom) and for y=1, expected cy ~20 (top) given padding 20 and svgHeight 300
    expect(Math.max(...cyValues)).toBeGreaterThan(250);
    expect(Math.min(...cyValues)).toBeLessThan(50);
  });
});

describe("Custom Dimensions and SVG File Output", () => {
  const outputFile = "test_output.svg";

  afterEach(() => {
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }
  });

  test("should generate SVG file with custom width, height, and padding", async () => {
    await main(["--expression", "y=cos(x)", "--range", "x=-3:3,y=-1:1", "--width", "600", "--height", "400", "--padding", "30", "--file", outputFile]);
    expect(fs.existsSync(outputFile)).toBe(true);
    const content = fs.readFileSync(outputFile, 'utf8');
    expect(content).toContain('<svg');
    expect(content).toContain('width="600"');
    expect(content).toContain('height="400"');
  });
});

describe("SVG Output with Configurable Data Points", () => {
  test("should generate SVG with the correct number of data points when --points parameter is provided", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => { outputContent += msg; };
    const numPoints = 20;
    await main(["--expression", "y=sin(x)", "--range", "x=0:9,y=-1:1", "--points", numPoints.toString()]);
    console.log = originalLog;
    // Extract polyline points attribute
    const polylineRegex = /<polyline[^>]*points=\"([^\"]+)\"/;
    const match = polylineRegex.exec(outputContent);
    expect(match).not.toBeNull();
    const pointsAttr = match[1];
    const pointPairs = pointsAttr.trim().split(/\s+/);
    expect(pointPairs.length).toBe(numPoints);
  });
});

describe("Multiple Expressions SVG Output", () => {
  test("should generate SVG with multiple polylines and distinct colors for multiple expressions", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => { outputContent += msg; };
    await main(["--expression", "y=sin(x),y=cos(x)", "--range", "x=0:9,y=-1:1"]);
    console.log = originalLog;
    // Check for two polyline elements
    const polylineMatches = outputContent.match(/<polyline/g) || [];
    expect(polylineMatches.length).toBe(2);
    // Check that distinct colors are applied by verifying stroke attributes
    expect(outputContent).toMatch(/stroke="blue"/);
    expect(outputContent).toMatch(/stroke="green"/);
  });
});

describe("Custom Colors CLI Option", () => {
  test("should use provided custom colors for plot lines and text", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => { outputContent += msg; };
    await main(["--expression", "y=tan(x)", "--range", "x=0:5,y=-5:5", "--colors", "magenta,cyan"]);
    console.log = originalLog;
    // Check that the custom colors appear in the SVG output
    expect(outputContent).toContain('stroke="magenta"');
    expect(outputContent).toContain('fill="magenta"');
  });
});

describe("Custom Line Styles CLI Option", () => {
  test("should use provided custom line styles for plot lines", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => { outputContent += msg; };
    await main(["--expression", "y=sin(x),y=cos(x)", "--range", "x=0:9,y=-1:1", "--lineStyles", "dashed,dotted"]);
    console.log = originalLog;
    // Verify first polyline has stroke-dasharray="5,5" and second has stroke-dasharray="1,5"
    const polylineRegex = /<polyline[^>]*stroke-dasharray=\"([^\"]+)\"/g;
    let matches = [];
    let match;
    while ((match = polylineRegex.exec(outputContent)) !== null) {
      matches.push(match[1]);
    }
    expect(matches.length).toBeGreaterThanOrEqual(2);
    expect(matches[0]).toBe('5,5');
    expect(matches[1]).toBe('1,5');
  });
});

describe("Gridlines and Axis Labels", () => {
  test("should include gridlines when --grid is used", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => { outputContent += msg; };
    await main(["--expression", "y=sin(x)", "--range", "x=0:9,y=-1:1", "--grid"]);
    console.log = originalLog;
    // Check for gridline dash pattern
    expect(outputContent).toContain('stroke-dasharray="2,2"');
  });

  test("should render axis labels when --xlabel and --ylabel are provided", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => { outputContent += msg; };
    const xlabel = "Time (s)";
    const ylabel = "Amplitude";
    await main(["--expression", "y=cos(x)", "--range", "x=0:9,y=-1:1", "--grid", "--xlabel", xlabel, "--ylabel", ylabel]);
    console.log = originalLog;
    expect(outputContent).toContain(xlabel);
    expect(outputContent).toContain(ylabel);
  });
});
