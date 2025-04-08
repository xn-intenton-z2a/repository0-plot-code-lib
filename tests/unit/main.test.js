///////////////////////////////
// File: tests/unit/main.test.js
///////////////////////////////
// Updated tests/unit/main.test.js
import { describe, test, expect, vi } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { main } from "../../src/lib/main.js";

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

describe("Invalid Numeric Input Handling", () => {
  test("should output error and exit when an invalid numeric parameter is provided", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation((code) => { throw new Error(`process.exit: ${code}`); });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const invalidArg = "quad:1,0,abc,-10,10,1";

    expect(() => main([invalidArg])).toThrow(/process.exit: 1/);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("Invalid numeric parameter 'abc'"));

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  test("should not exit when all numeric parameters are valid", () => {
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

describe("Handling 'NaN' as a valid token", () => {
  test("should not exit when 'NaN' is provided among numeric parameters", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const argWithNaN = "quad:1,NaN,5,-10,10,1";
    
    expect(() => main([argWithNaN])).not.toThrow();
    expect(errorSpy).not.toHaveBeenCalled();
    expect(exitSpy).not.toHaveBeenCalled();

    exitSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
