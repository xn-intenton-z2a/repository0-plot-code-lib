import { describe, test, expect, vi } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { main } from "../../src/lib/main.js";
import fs from "fs";
import sharp from "sharp";

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

describe("CLI Options Parsing", () => {
  test("should correctly parse --expression, --range, and --file options when file is not .svg or .png", async () => {
    const errorSpy = vi.spyOn(console, "error");
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "output.txt"];
    await main(args);
    expect(errorSpy).toHaveBeenCalledWith("Error: Only .svg and .png files are supported for plot generation.");
    errorSpy.mockRestore();
  });
});

describe("SVG Plot Generation with Default Styles", () => {
  test("should generate and save SVG file with a polyline element with default stroke when valid parameters provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "output.svg"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain("<polyline");
    expect(writtenContent).toContain('stroke="blue"');
    expect(writtenContent).toContain('stroke-width="2"');
    expect(writtenContent).toContain('width="300"');
    expect(writtenContent).toContain('height="150"');
    writeSpy.mockRestore();
  });
});

describe("PNG Plot Generation with Default Styles", () => {
  test("should generate and save PNG file as a Buffer when valid parameters provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "output.png"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "output.png");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(Buffer.isBuffer(writtenContent)).toBe(true);
    writeSpy.mockRestore();
  });
});

describe("CSV Plot Generation with Default Styles", () => {
  test("should generate and save SVG file with a polyline element with default CSV styling when valid CSV provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n5,10\n10,5";
    const args = ["--csv", csvData, "--file", "csv_output.svg"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "csv_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain("<polyline");
    expect(writtenContent).toContain('stroke="red"');
    expect(writtenContent).toContain('stroke-width="2"');
    expect(writtenContent).toContain("CSV Plot");
    expect(writtenContent).toContain('width="300"');
    expect(writtenContent).toContain('height="150"');
    writeSpy.mockRestore();
  });

  test("should generate and save PNG file as a Buffer when valid CSV provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n5,10\n10,5";
    const args = ["--csv", csvData, "--file", "csv_output.png"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "csv_output.png");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(Buffer.isBuffer(writtenContent)).toBe(true);
    writeSpy.mockRestore();
  });
});

describe("Custom Style Options", () => {
  test("should generate SVG with custom stroke color and width for function based plots", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=cos(x)", "--range", "x=-10:10,y=-1:1", "--file", "custom_output.svg", "--stroke-color", "green", "--stroke-width", "5"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "custom_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('stroke="green"');
    expect(writtenContent).toContain('stroke-width="5"');
    writeSpy.mockRestore();
  });

  test("should generate SVG with custom stroke color and width for CSV based plots", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n5,10\n10,5";
    const args = ["--csv", csvData, "--file", "custom_csv_output.svg", "--stroke-color", "purple", "--stroke-width", "3"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "custom_csv_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('stroke="purple"');
    expect(writtenContent).toContain('stroke-width="3"');
    writeSpy.mockRestore();
  });
});

describe("Custom Dimensions Options", () => {
  test("should generate SVG with custom width and height when options are provided for function plots", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "dim_output.svg", "--width", "500", "--height", "400"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "dim_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('width="500"');
    expect(writtenContent).toContain('height="400"');
    writeSpy.mockRestore();
  });

  test("should generate PNG with custom width and height when options are provided for CSV plots", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n10,20\n20,10";
    const args = ["--csv", csvData, "--file", "dim_output.png", "--width", "600", "--height", "450"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "dim_output.png");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(Buffer.isBuffer(writtenContent)).toBe(true);
    writeSpy.mockRestore();
  });
});

describe("Grid Lines Option", () => {
  test("should include grid lines in SVG output when --grid option is used for function plots", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "grid_output.svg", "--grid"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "grid_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('<line');
    expect(writtenContent).toContain('stroke="#ccc"');
    expect(writtenContent).toContain('stroke-width="1"');
    writeSpy.mockRestore();
  });

  test("should include grid lines in SVG output when --grid option is used for CSV plots", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n5,10\n10,5";
    const args = ["--csv", csvData, "--file", "csv_grid_output.svg", "--grid"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "csv_grid_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('<line');
    expect(writtenContent).toContain('stroke="#ccc"');
    expect(writtenContent).toContain('stroke-width="1"');
    writeSpy.mockRestore();
  });
});
