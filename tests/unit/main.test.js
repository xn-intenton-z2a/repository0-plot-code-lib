import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
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
    const logSpy = vi.spyOn(console, "log");
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "output.txt"];
    await main(args);
    // Since file extension is not .svg or .png, no success message should be printed
    expect(logSpy).not.toHaveBeenCalledWith('SVG file created at: output.txt');
    expect(logSpy).not.toHaveBeenCalledWith('PNG file created at: output.txt');
    logSpy.mockRestore();
  });
});

describe("SVG Plot Generation", () => {
  test("should generate and save SVG file when valid parameters provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "output.svg"];
    await main(args);
    const expectedSVG = `<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="100" fill="#f0f0f0"/>
  <text x="10" y="50" font-size="14" fill="#333">Expression: y=sin(x), Range: x=-10:10,y=-1:1</text>
</svg>`;
    expect(writeSpy).toHaveBeenCalledWith("output.svg", expectedSVG, "utf8");
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
