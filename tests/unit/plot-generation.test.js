import { describe, test, expect, vi } from "vitest";
import { main, renderSVG } from "@src/lib/main.js";

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

  test("multiple expressions generate SVG with total height equal to number of expressions * segment height", () => {
    const expressions = ["y=sin(x)", "y=cos(x)"];
    const segHeight = 120;
    const totalHeight = expressions.length * segHeight;
    const svg = renderSVG({ expressions, width: 640, segmentHeight: segHeight });
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain(`height="${totalHeight}"`);
  });

  test("single expression with custom height override", () => {
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
