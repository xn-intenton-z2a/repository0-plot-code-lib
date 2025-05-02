import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main, renderSVG } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Plot Generation CLI Logging", () => {
  test("should log SVG output when --expression is provided", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)"];
    main(args);
    // When an expression is provided, the output should be an SVG string
    expect(consoleSpy).toHaveBeenCalled();
    const logged = consoleSpy.mock.calls[0][0];
    expect(logged.startsWith("<svg")).toBe(true);
    expect(logged).toContain('xmlns="http://www.w3.org/2000/svg"');
    consoleSpy.mockRestore();
  });

  test("should use default log when no expression provided", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main();
    expect(consoleSpy).toHaveBeenCalledWith("Run with: []");
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
});
