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

describe("Advanced Plotting Numeric Conversion", () => {
  test("should convert 'NaN' token to native NaN in advanced mode", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    // Override testPlot to capture the params
    const originalTestPlot = mainModule.advancedPlots.testPlot;
    let receivedParams;
    mainModule.advancedPlots.testPlot = function(params) { receivedParams = params; };
    
    // Call main with advanced flag, using testPlot as the plot type
    main(["--advanced", "testPlot", "1,NaN,5"]);
    
    expect(receivedParams).toHaveLength(3);
    expect(receivedParams[0]).toBe(1);
    expect(receivedParams[1]).toBeNaN();
    expect(receivedParams[2]).toBe(5);

    // Restore original testPlot function
    mainModule.advancedPlots.testPlot = originalTestPlot;
    logSpy.mockRestore();
  });
});

describe("Regex-based Numeric Conversion Edge Cases", () => {
  test("should trim extra whitespace and handle lower/upper case 'NaN'", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const arg = "quad:  1 ,  NaN  ,   5  , -10 , 10,  1";
    
    expect(() => main([arg])).not.toThrow();
    expect(errorSpy).not.toHaveBeenCalled();
    expect(exitSpy).not.toHaveBeenCalled();

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  test("should exit on malformed numeric input with extra non-numeric characters", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation((code) => { throw new Error(`process.exit: ${code}`); });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const badArg = "quad:1, 2x, 3";

    expect(() => main([badArg])).toThrow(/process.exit: 1/);
    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  test("should support valid scientific notation inputs", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const arg = "quad: 1e4 , 2.14e-3 , NaN , -3.5E+2";
    
    expect(() => main([arg])).not.toThrow();
    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});
