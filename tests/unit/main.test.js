import { describe, test, expect, vi } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { main } from "../../src/lib/main.js";
import fs from "fs";

// Added import for sharp if needed by tests, though not directly used
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

describe("SVG Plot Generation", () => {
  test("should generate and save SVG file with a polyline element when valid parameters provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "output.svg"];
    await main(args);
    // Capture the written content
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain("<polyline");
    writeSpy.mockRestore();
  });
});

describe("PNG Plot Generation", () => {
  test("should generate and save PNG file when valid parameters provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "output.png"];
    await main(args);
    // Ensure that fs.writeFileSync was called with a Buffer for a PNG file
    expect(writeSpy).toHaveBeenCalled();
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "output.png");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(Buffer.isBuffer(writtenContent)).toBe(true);
    writeSpy.mockRestore();
  });
});

describe("CSV Plot Generation", () => {
  test("should generate and save SVG file with a polyline element when valid CSV provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n5,10\n10,5";
    const args = ["--csv", csvData, "--file", "csv_output.svg"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "csv_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain("<polyline");
    expect(writtenContent).toContain("CSV Plot");
    writeSpy.mockRestore();
  });

  test("should generate and save PNG file when valid CSV provided", async () => {
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
