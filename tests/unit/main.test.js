import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
import fs from "fs";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main([]);
  });
});

describe("CLI Options Parsing", () => {
  test("should correctly parse --expression, --range, and --file options when file is not .svg", () => {
    const logSpy = vi.spyOn(console, "log");
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "output.txt"];
    main(args);
    // Since file is not .svg, an error message should be printed
    expect(logSpy).not.toHaveBeenCalledWith(
      'SVG file created at: output.txt'
    );
    logSpy.mockRestore();
  });
});

describe("SVG Plot Generation", () => {
  test("should generate and save SVG file when valid parameters provided", () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "output.svg"];
    main(args);
    const expectedSVG = `<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="100" fill="#f0f0f0"/>
  <text x="10" y="50" font-size="14" fill="#333">Expression: y=sin(x), Range: x=-10:10,y=-1:1</text>
</svg>`;
    expect(writeSpy).toHaveBeenCalledWith("output.svg", expectedSVG, "utf8");
    writeSpy.mockRestore();
  });
});
