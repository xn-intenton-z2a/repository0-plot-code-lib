import { describe, test, expect, afterEach, beforeAll, afterAll } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
import fs from "fs";

// Helper to delay execution for async writes
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Temporary file helper for CSV tests
import os from 'os';
import path from 'path';


describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default Demo Output", () => {
  test("should display usage instructions when no required args are provided", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => {
      outputContent += msg;
    };
    await main();
    console.log = originalLog;
    expect(outputContent).toContain("Usage:");
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
    await delay(500);
    expect(fs.existsSync(outputFile)).toBe(true);

    const buffer = fs.readFileSync(outputFile);
    const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(buffer.slice(0, 8).equals(pngHeader)).toBe(true);
  });
});

describe("SVG Output with Y-Range Scaling", () => {
  test("should generate SVG with correctly scaled cy positions", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => {
      outputContent += msg;
    };
    await main(["--expression", "y=sin(x)", "--range", "x=0:9,y=-1:1"]);
    console.log = originalLog;
    expect(outputContent).toContain("<svg");

    const regex = /cy="([\d.]+)"/g;
    let match;
    const cyValues = [];
    while ((match = regex.exec(outputContent)) !== null) {
      cyValues.push(parseFloat(match[1]));
    }

    expect(cyValues.length).toBeGreaterThan(0);
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
    await main([
      "--expression",
      "y=cos(x)",
      "--range",
      "x=-3:3,y=-1:1",
      "--width",
      "600",
      "--height",
      "400",
      "--padding",
      "30",
      "--file",
      outputFile
    ]);
    expect(fs.existsSync(outputFile)).toBe(true);
    const content = fs.readFileSync(outputFile, "utf8");
    expect(content).toContain("<svg");
    expect(content).toContain('width="600"');
    expect(content).toContain('height="400"');
  });
});

describe("SVG Output with Configurable Data Points", () => {
  test("should generate SVG with the correct number of data points when --points parameter is provided", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => {
      outputContent += msg;
    };
    const numPoints = 20;
    await main(["--expression", "y=sin(x)", "--range", "x=0:9,y=-1:1", "--points", numPoints.toString()]);
    console.log = originalLog;
    const polylineRegex = /<polyline[^>]*points="([^"]+)"/;
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
    console.log = (msg) => {
      outputContent += msg;
    };
    await main(["--expression", "y=sin(x),y=cos(x)", "--range", "x=0:9,y=-1:1"]);
    console.log = originalLog;
    const polylineMatches = outputContent.match(/<polyline/g) || [];
    expect(polylineMatches.length).toBe(2);
    expect(outputContent).toMatch(/stroke="blue"/);
    expect(outputContent).toMatch(/stroke="green"/);
  });
});

describe("Custom Colors CLI Option", () => {
  test("should use provided custom colors for plot lines and text", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => {
      outputContent += msg;
    };
    await main(["--expression", "y=tan(x)", "--range", "x=0:5,y=-5:5", "--colors", "magenta,cyan"]);
    console.log = originalLog;
    expect(outputContent).toContain('stroke="magenta"');
    expect(outputContent).toContain('fill="magenta"');
  });
});

describe("Custom Line Styles CLI Option", () => {
  test("should use provided custom line styles for plot lines", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => {
      outputContent += msg;
    };
    await main(["--expression", "y=sin(x),y=cos(x)", "--range", "x=0:9,y=-1:1", "--lineStyles", "dashed,dotted"]);
    console.log = originalLog;
    const polylineRegex = /<polyline[^>]*stroke-dasharray="([^"]+)"/g;
    const matches = [];
    let match;
    while ((match = polylineRegex.exec(outputContent)) !== null) {
      matches.push(match[1]);
    }
    expect(matches.length).toBeGreaterThanOrEqual(2);
    expect(matches[0]).toBe("5,5");
    expect(matches[1]).toBe("1,5");
  });
});

describe("Gridlines and Axis Labels", () => {
  test("should include gridlines when --grid is used", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => {
      outputContent += msg;
    };
    await main(["--expression", "y=sin(x)", "--range", "x=0:9,y=-1:1", "--grid"]);
    console.log = originalLog;
    expect(outputContent).toContain('stroke-dasharray="2,2"');
  });

  test("should render axis labels when --xlabel and --ylabel are provided", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => {
      outputContent += msg;
    };
    const xlabel = "Time (s)";
    const ylabel = "Amplitude";
    await main([
      "--expression",
      "y=cos(x)",
      "--range",
      "x=0:9,y=-1:1",
      "--grid",
      "--xlabel",
      xlabel,
      "--ylabel",
      ylabel
    ]);
    console.log = originalLog;
    expect(outputContent).toContain(xlabel);
    expect(outputContent).toContain(ylabel);
  });
});

describe("Plot Title Rendering", () => {
  test("should render provided title in the SVG output", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => {
      outputContent += msg;
    };
    const testTitle = "My Awesome Plot";
    await main(["--expression", "y=sin(x)", "--range", "x=0:9,y=-1:1", "--title", testTitle]);
    console.log = originalLog;
    expect(outputContent).toContain(testTitle);
    expect(outputContent).toMatch(new RegExp("<text [^>]*>" + testTitle + "</text>"));
  });
});

describe("Auto Y Range Detection", () => {
  test("should auto-compute y-range when omitted and scale cy accordingly", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => { outputContent += msg; };
    await main(["--expression", "y=sin(x)", "--range", "x=0:9"]);
    console.log = originalLog;
    expect(outputContent).toContain("<svg");

    const regex = /cy="([\d.]+)"/g;
    let match;
    const cyValues = [];
    while ((match = regex.exec(outputContent)) !== null) {
      cyValues.push(parseFloat(match[1]));
    }
    expect(cyValues.length).toBeGreaterThan(0);
    expect(Math.min(...cyValues)).toBeLessThan(50);
    expect(Math.max(...cyValues)).toBeGreaterThan(250);
  });
});

// New test for custom lineWidth
describe("Custom Line Width CLI Option", () => {
  test("should use provided custom line width for plot lines", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => { outputContent += msg; };
    await main(["--expression", "y=sin(x)", "--range", "x=0:9,y=-1:1", "--lineWidth", "3.5"]);
    console.log = originalLog;
    expect(outputContent).toContain('stroke-width="3.5"');
  });
});

// New test for CSV Input Option
describe("CSV Input Option", () => {
  const tmpDir = os.tmpdir();
  const csvFile = path.join(tmpDir, "test_data.csv");
  const outputFile = path.join(tmpDir, "test_output_csv.svg");

  beforeAll(() => {
    // Create a temporary CSV file with header and some data
    const csvData = "x,y\n0,0\n1,1\n2,4\n3,9";
    fs.writeFileSync(csvFile, csvData);
  });

  afterAll(() => {
    if (fs.existsSync(csvFile)) fs.unlinkSync(csvFile);
    if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
  });

  test("should generate SVG output from CSV data and ignore --expression and --range", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => { outputContent += msg; };
    await main(["--dataFile", csvFile]);
    console.log = originalLog;
    expect(outputContent).toContain("<svg");
    expect(outputContent).toContain("CSV Data");
  });

  test("should write SVG output to file when --file is used with --dataFile", async () => {
    await main(["--dataFile", csvFile, "--file", outputFile]);
    expect(fs.existsSync(outputFile)).toBe(true);
    const content = fs.readFileSync(outputFile, "utf8");
    expect(content).toContain("<svg");
    expect(content).toContain("CSV Data");
  });
});

// New test for custom legend position
describe("Custom Legend Position CLI Option", () => {
  test("should render legend at the bottom when --legendPosition bottom is provided", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => { outputContent += msg; };
    await main(["--expression", "y=sin(x)", "--range", "x=0:9,y=-1:1", "--legendPosition", "bottom"]);
    console.log = originalLog;
    // Check for a text element with a y attribute value closer to the bottom of the SVG (svgHeight default is 300)
    const regex = /<text[^>]*y="(\d+(?:\.\d+)?)"/g;
    let match;
    const yValues = [];
    while ((match = regex.exec(outputContent)) !== null) {
      yValues.push(parseFloat(match[1]));
    }
    // Expect at least one of the legend y values to be greater than 150 (roughly bottom half)
    const legendY = yValues.slice(0, 3); // assume legend texts are among the first few
    expect(legendY.every(y => y > 150)).toBe(true);
  });

  test("should render legend at the right when --legendPosition right is provided", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => { outputContent += msg; };
    await main(["--expression", "y=cos(x)", "--range", "x=0:9,y=-1:1", "--legendPosition", "right"]);
    console.log = originalLog;
    // Check for a text element with an x attribute value closer to the right of the SVG (default width is 500, so x near 500 - pad - 100, roughly 500 - 20 - 100 = 380)
    const regex = /<text[^>]*x="(\d+(?:\.\d+)?)"/g;
    let match;
    const xValues = [];
    while ((match = regex.exec(outputContent)) !== null) {
      xValues.push(parseFloat(match[1]));
    }
    // Check that at least one x value is greater than 300
    const legendX = xValues.slice(0, 3);
    expect(legendX.every(x => x > 300)).toBe(true);
  });
});
