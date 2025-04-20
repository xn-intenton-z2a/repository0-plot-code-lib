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

describe("Plot Generation", () => {
  test("should generate dummy SVG file when valid parameters are provided", () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-1:1,y=-1:1",
      "--file", "output.svg"
    ];
    const expectedSVG = "<svg><text x='10' y='20'>Expression: y=sin(x)</text><text x='10' y='40'>Range: x=-1:1,y=-1:1</text></svg>";
    
    // Call main with parameters
    main(args);
    
    expect(writeFileSyncSpy).toHaveBeenCalledWith("output.svg", expectedSVG);
    writeFileSyncSpy.mockRestore();
  });
});
