///////////////////////////////
// File: tests/unit/main.test.js
///////////////////////////////
// File: tests/unit/main.test.js
import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

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

///////////////////////////////
// File: tests/unit/advancedPlots.test.js
///////////////////////////////
import { describe, test, expect, vi } from "vitest";
import * as advancedPlots from "@src/lib/advancedPlots.js";
import { main } from "@src/lib/main.js";

describe("Advanced Plots CLI Integration", () => {
  test("should invoke spiral advanced plot", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--advanced", "spiral", "1,2,3"]);
    expect(consoleSpy).toHaveBeenCalledWith("Advanced Plot: Spiral");
    consoleSpy.mockRestore();
  });
  
  test("should exit with error on unknown advanced plot type", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation((code) => { throw new Error(`process.exit: ${code}`); });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => main(["--advanced", "unknown", "1,2,3"])).toThrow(/process.exit: 1/);
    exitSpy.mockRestore();
    errorSpy.mockRestore();
  });

  test("should invoke cumulativeAverage advanced plot", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--advanced", "cumulativeAverage", "5,10,15"]);
    expect(consoleSpy).toHaveBeenCalledWith("Advanced Plot: Cumulative Average");
    consoleSpy.mockRestore();
  });
});

describe("AdvancedPlots Module Functions", () => {
  test("spiral function logs correctly", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    advancedPlots.spiral("paramsTest");
    expect(logSpy).toHaveBeenCalledWith("Plotting spiral with params:", "paramsTest");
    logSpy.mockRestore();
  });

  test("extended3D function logs correctly", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    advancedPlots.extended3D("3dParams");
    expect(logSpy).toHaveBeenCalledWith("Plotting extended 3D plot with params:", "3dParams");
    logSpy.mockRestore();
  });
});