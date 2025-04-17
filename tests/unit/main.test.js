import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";


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
  test("should correctly parse --expression, --range, and --file options", () => {
    // Spy on console.log to capture output
    const logSpy = vi.spyOn(console, "log");
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "output.svg"];
    main(args);
    expect(logSpy).toHaveBeenCalledWith(
      'Run with: ' + JSON.stringify({
        expression: "y=sin(x)",
        range: "x=-10:10,y=-1:1",
        file: "output.svg"
      })
    );
    logSpy.mockRestore();
  });
});
