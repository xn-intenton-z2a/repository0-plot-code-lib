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
  test("should terminate without error", async () => {
    process.argv = ["node", "src/lib/main.js"];
    await main();
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

describe("Custom Dimensions Output", () => {
  test("should generate SVG with custom width, height, and padding", async () => {
    let outputContent = "";
    const originalLog = console.log;
    console.log = (msg) => { outputContent += msg; };
    await main(["--expression", "y=cos(x)", "--range", "x=0:9,y=-1:1", "--width", "600", "--height", "400", "--padding", "30"]);
    console.log = originalLog;
    expect(outputContent).toContain('<svg');
    // Check that the SVG has custom width and height attributes
    expect(outputContent).toContain('width="600"');
    expect(outputContent).toContain('height="400"');
  });
});
