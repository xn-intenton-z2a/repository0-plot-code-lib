///////////////////////////////
// File: tests/unit/main.test.js
///////////////////////////////
// Updated tests/unit/main.test.js with additional tests for the argumentParser module

import { describe, test, expect, vi } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { main } from "../../src/lib/main.js";
import { parseArguments } from "../../src/lib/argumentParser.js";


describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});


describe("Default Demo Output", () => {
  test("should terminate without error for valid inputs", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});


describe("Invalid Numeric Input Handling in Main", () => {
  test("should output error and exit when an invalid numeric parameter is provided", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation((code) => { throw new Error(`process.exit: ${code}`); });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const invalidArg = "quad:1,0,abc,-10,10,1";

    expect(() => main([invalidArg])).toThrow(/process.exit: 1/);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("Invalid numeric parameter 'abc'"));

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  test("should not exit when all numeric parameters are valid in Main", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const validArg = "quad:1,0,5,-10,10,1";

    expect(() => main([validArg])).not.toThrow();
    expect(errorSpy).not.toHaveBeenCalled();
    expect(exitSpy).not.toHaveBeenCalled();

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});


describe("Argument Parser Module", () => {
  test("should parse non-advanced arguments correctly", () => {
    const result = parseArguments(["quad:1,0,5,-10,10,1"]);
    expect(result.advanced).toBe(false);
    expect(result.args).toEqual(["quad:1,0,5,-10,10,1"]);
  });

  test("should parse advanced arguments correctly", () => {
    const result = parseArguments(["--advanced", "spiral", "radius:1,2,3,4"]);
    expect(result.advanced).toBe(true);
    expect(result.plotType).toBe("spiral");
    expect(result.params).toBe("radius:1,2,3,4");
  });

  test("should throw error for invalid numeric input in advanced arguments", () => {
    expect(() => parseArguments(["--advanced", "spiral", "radius:1,abc,3,4"]).toThrow("Invalid numeric parameter 'abc'"));
  });

  test("should throw error if insufficient arguments provided for advanced plotting", () => {
    expect(() => parseArguments(["--advanced", "spiral"])).toThrow("Insufficient arguments for advanced plotting.");
  });
});
