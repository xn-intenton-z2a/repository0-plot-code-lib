import { describe, test, expect, vi } from "vitest";
import fs from "fs";
import { main, renderSVG } from "@src/lib/main.js";
import sharp from "sharp";

// Mock sharp globally to simulate PNG conversion
vi.mock("sharp", () => ({
  default: vi.fn(() => ({
    png: () => ({
      toBuffer: async () => Buffer.from("PNG")
    })
  }))
}));


describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});

describe("Plot Generation CLI Logging", () => {
  test("should log SVG output when --expression is provided", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await main(["--expression", "y=sin(x)"]);
    const logged = consoleSpy.mock.calls[0][0];
    expect(logged.startsWith("<svg")).toBe(true);
    expect(logged).toContain('xmlns="http://www.w3.org/2000/svg"');
    consoleSpy.mockRestore();
  });

  test("should use default error log when no expression provided", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await main([]);
    expect(consoleSpy).toHaveBeenCalled();
    const errorMsg = consoleSpy.mock.calls[0][0];
    expect(errorMsg).toContain("Error: --expression flag is required");
    consoleSpy.mockRestore();
  });
});

describe("SVG Render Feature", () => {
  test("single expression generates SVG with fixed height 400 and custom width", () => {
    const expressions = ["y=sin(x)"];
    const svg = renderSVG({ expressions, width: 800, height: 400 });
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain('width="800"');
    expect(svg).toContain('height="400"');
  });

  test("multiple expressions generate SVG with total height equal to number of expressions * segment height (using --height fallback)", () => {
    const expressions = ["y=sin(x)", "y=cos(x)"];
    const segHeight = 150;
    const totalHeight = expressions.length * segHeight;
    const svg = renderSVG({ expressions, width: 640, segmentHeight: segHeight });
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain(`height="${totalHeight}"`);
  });

  test("multiple expressions with segmentHeight flag provided via CLI should use that value", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    // Using both --expression and --segmentHeight
    await main(["--expression", "y=sin(x); y=cos(x)", "--width", "640", "--segmentHeight", "120"]);
    const logged = consoleSpy.mock.calls[0][0];
    // Expected height = 2 * 120 = 240
    expect(logged).toContain('height="240"');
    consoleSpy.mockRestore();
  });

  test("multiple expressions without segmentHeight flag should use --height as fallback", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    // Using --expression and --height for multi-expression
    await main(["--expression", "y=sin(x); y=cos(x)", "--width", "640", "--height", "130"]);
    const logged = consoleSpy.mock.calls[0][0];
    // Expected height = 2 * 130 = 260
    expect(logged).toContain('height="260"');
    consoleSpy.mockRestore();
  });

  test("single expression with custom height override remains unaffected by segmentHeight flag", () => {
    const expressions = ["y=tan(x)"];
    const customHeight = 500;
    const svg = renderSVG({ expressions, width: 800, height: customHeight });
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain(`height="${customHeight}"`);
  });

  test("renders range information when --range is provided", () => {
    const expressions = ["y=x"];
    const range = "x=-5:5";
    const svg = renderSVG({ expressions, width: 640, height: 400, range });
    expect(svg).toContain("Range: x=-5:5");
  });

  // New tests for axis labels
  test("renders x-axis and y-axis labels for single expression", () => {
    const expressions = ["y=exp(x)"];
    const xlabel = "Time (s)";
    const ylabel = "Amplitude";
    const customHeight = 500;
    const svg = renderSVG({ expressions, width: 800, height: customHeight, xlabel, ylabel });
    expect(svg).toContain(`<text x=\"${800/2}\" y=\"${customHeight - 10}\" text-anchor=\"middle\" font-size=\"14\">${xlabel}</text>`);
    expect(svg).toContain(`<text x=\"15\" y=\"${customHeight/2}\" text-anchor=\"middle\" transform=\"rotate(-90,15,${customHeight/2})\" font-size=\"14\">${ylabel}</text>`);
  });

  test("renders x-axis and y-axis labels for multiple expressions", () => {
    const expressions = ["y=exp(x)", "y=log(x)"];
    const segHeight = 120;
    const totalHeight = expressions.length * segHeight;
    const xlabel = "Distance";
    const ylabel = "Value";
    const svg = renderSVG({ expressions, width: 640, segmentHeight: segHeight, xlabel, ylabel });
    expect(svg).toContain(`<text x=\"${640/2}\" y=\"${totalHeight - 10}\" text-anchor=\"middle\" font-size=\"14\">${xlabel}</text>`);
    expect(svg).toContain(`<text x=\"15\" y=\"${totalHeight/2}\" text-anchor=\"middle\" transform=\"rotate(-90,15,${totalHeight/2})\" font-size=\"14\">${ylabel}</text>`);
  });

  test("logs error for empty --xlabel value", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await main(["--expression", "y=sin(x)", "--xlabel", ""]);
    expect(consoleSpy.mock.calls[0][0]).toContain("Error: --xlabel flag provided with empty value");
    consoleSpy.mockRestore();
  });

  test("logs error for empty --ylabel value", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await main(["--expression", "y=sin(x)", "--ylabel", ""]);
    expect(consoleSpy.mock.calls[0][0]).toContain("Error: --ylabel flag provided with empty value");
    consoleSpy.mockRestore();
  });
});

describe("PNG Conversion Error Handling", () => {
  test("should error when output-format is png without file flag", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await main(["--expression", "y=sin(x)", "--outputFormat", "png"]);
    const errorMsg = consoleErrorSpy.mock.calls[0][0];
    expect(errorMsg).toContain("Error: --file flag is required");
    consoleErrorSpy.mockRestore();
  });
});

describe("PNG Conversion Success", () => {
  test("should convert SVG to PNG and write file when outputFormat is png and file flag is provided", async () => {
    const fsSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    await main(["--expression", "y=sin(x)", "--outputFormat", "png", "--file", "output.png"]);
    expect(fsSpy).toHaveBeenCalledWith("output.png", Buffer.from("PNG"));
    fsSpy.mockRestore();
  });
});
