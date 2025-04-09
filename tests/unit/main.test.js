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

describe("Additional Numeric Edge Cases", () => {
  test("should handle leading/trailing spaces and scientific notation in colon-separated input", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["quad:  3e2,   NaN,  -5E-1"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('["quad",[300,"NaN",-0.5]]'));
    logSpy.mockRestore();
  });
});

describe("Alternative NaN Aliases", () => {
  test("should treat 'not a number' as NaN", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const arg = "quad:1, not a number ,5,-10,10,1";
    expect(() => main([arg])).not.toThrow();
    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  test("should treat 'notanumber' as NaN", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const arg = "quad:1,notanumber,5,-10,10,1";
    expect(() => main([arg])).not.toThrow();
    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  test("should treat 'na' as NaN", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const arg = "quad:1,na,5,-10,10,1";
    expect(() => main([arg])).not.toThrow();
    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  test("should treat 'not-a-number' as NaN", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const arg = "quad:1,not-a-number,5,-10,10,1";
    expect(() => main([arg])).not.toThrow();
    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  test("should reject near miss variants like 'n/a' with suggestion", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation((code) => { throw new Error(`process.exit: ${code}`); });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const arg = "quad:1,n/a,5,-10,10,1";
    expect(() => main([arg])).toThrow(/process.exit: 1/);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("Did you mean one of the accepted tokens"));
    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});

describe("Numeric Debug Logging", () => {
  test("should log debug message when DEBUG_NUMERIC is enabled", () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    process.env.DEBUG_NUMERIC = "true";
    main(["quad:1,na,5"]);
    expect(debugSpy).toHaveBeenCalledWith("Normalized token 'na' to \"NaN\"");
    delete process.env.DEBUG_NUMERIC;
    debugSpy.mockRestore();
  });
});

describe("Advanced Plotting - Contour Plot", () => {
  test("should convert parameters and trigger contour plot handler", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const originalContourPlot = mainModule.advancedPlots.contourPlot;
    let receivedParams;
    mainModule.advancedPlots.contourPlot = function(params) { receivedParams = params; };

    main(["--advanced", "contourPlot", "1,NaN,5"]);
    
    expect(receivedParams).toHaveLength(3);
    expect(receivedParams[0]).toBe(1);
    expect(receivedParams[1]).toBe("NaN");
    expect(receivedParams[2]).toBe(5);

    mainModule.advancedPlots.contourPlot = originalContourPlot;
    logSpy.mockRestore();
  });
});

describe("Advanced Plotting - Scatter Matrix", () => {
  test("should convert parameters and trigger scatter matrix handler", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const originalScatterMatrix = mainModule.advancedPlots.scatterMatrix;
    let receivedParams;
    mainModule.advancedPlots.scatterMatrix = function(params) { receivedParams = params; };

    main(["--advanced", "scatterMatrix", "1,NaN,5,-10,10,1"]);
    
    expect(receivedParams).toHaveLength(6);
    expect(receivedParams[0]).toBe(1);
    expect(receivedParams[1]).toBe("NaN");
    expect(receivedParams[2]).toBe(5);
    expect(receivedParams[3]).toBe(-10);
    expect(receivedParams[4]).toBe(10);
    expect(receivedParams[5]).toBe(1);

    mainModule.advancedPlots.scatterMatrix = originalScatterMatrix;
    logSpy.mockRestore();
  });
});

describe("Trailing Commas Handling", () => {
  test("should ignore trailing commas in non-advanced mode", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["quad:1,2,3,"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('["quad",[1,2,3]]'));
    logSpy.mockRestore();
  });

  test("should ignore extra consecutive commas in advanced mode", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const originalTestPlot = mainModule.advancedPlots.testPlot;
    let receivedParams;
    mainModule.advancedPlots.testPlot = function(params) { receivedParams = params; };
    main(["--advanced", "testPlot", "1,,NaN,5,,"]);
    expect(receivedParams).toEqual([1, "NaN", 5]);
    mainModule.advancedPlots.testPlot = originalTestPlot;
    logSpy.mockRestore();
  });
});

describe("Localized NaN Aliases", () => {
  test("should accept a localized NaN alias when configured via LOCALE_NAN_ALIASES", () => {
    // Set a localized alias, e.g., German: "nicht eine zahl"
    process.env.LOCALE_NAN_ALIASES = JSON.stringify(["nicht eine zahl"]);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    // Using the localized alias in the input
    main(["quad:1, nicht eine zahl ,5"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('["quad",[1,"NaN",5]]'));
    delete process.env.LOCALE_NAN_ALIASES;
    logSpy.mockRestore();
  });
});

describe("Invalid LOCALE_NAN_ALIASES Handling", () => {
  test("should warn and use default NaN aliases when LOCALE_NAN_ALIASES is invalid", () => {
    process.env.LOCALE_NAN_ALIASES = "invalid_json";
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    main(["quad:1,na,5"]);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("Invalid configuration for LOCALE_NAN_ALIASES"));
    delete process.env.LOCALE_NAN_ALIASES;
    warnSpy.mockRestore();
  });
});
