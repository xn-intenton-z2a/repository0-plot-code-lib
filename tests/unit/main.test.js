///////////////////////////////
// File: tests/unit/main.test.js
///////////////////////////////
// Updated tests/unit/main.test.js
import { describe, test, expect, vi } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { main, getAcceptedNaNAliases, parseNumericParams, advancedPlots } from "../../src/lib/main.js";
// Updated direct import: now getAcceptedNaNAliases is imported from main.js instead of nanAlias.js
import { getAcceptedNaNAliases as getAcceptedNaNAliasesDirect } from "../../src/lib/main.js";

// Helper function to check if an element is NaN
const isNativeNaN = (x) => typeof x === 'number' && Number.isNaN(x);


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
    
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([arg]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"quad"'));
    errorSpy.mockRestore();
    exitSpy.mockRestore();
    logSpy.mockRestore();
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
    
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main([arg]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"quad"'));
    errorSpy.mockRestore();
    exitSpy.mockRestore();
    logSpy.mockRestore();
  });
});


describe("Additional Numeric Edge Cases with New Delimiters", () => {
  test("should handle semicolons as delimiters", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["quad:1;NaN;5"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"quad"'));
    logSpy.mockRestore();
  });

  test("should handle multiple spaces as delimiters", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["quad:1  NaN  5"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"quad"'));
    logSpy.mockRestore();
  });

  test("should handle mixed delimiters", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["quad: 1, NaN;5  , -10"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"quad"'));
    logSpy.mockRestore();
  });
});


describe("Trailing Commas and Extra Delimiters Handling", () => {
  test("should ignore trailing delimiters in non-advanced mode", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["quad:1,2,3,"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"quad"'));
    logSpy.mockRestore();
  });

  test("should ignore extra consecutive delimiters in advanced mode", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const originalTestPlot = mainModule.advancedPlots.testPlot;
    let receivedParams;
    mainModule.advancedPlots.testPlot = function(params) { receivedParams = params; };
    main(["--advanced", "testPlot", "1,,NaN,5,,"]);
    expect(receivedParams).toEqual([1, Number.NaN, 5]);
    mainModule.advancedPlots.testPlot = originalTestPlot;
    logSpy.mockRestore();
  });
});


describe("Localized NaN Aliases", () => {
  test("should accept a localized NaN alias when configured via LOCALE_NAN_ALIASES", () => {
    process.env.LOCALE_NAN_ALIASES = JSON.stringify(["nicht eine zahl"]);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["quad:1, nicht eine zahl ,5"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"quad"'));
    delete process.env.LOCALE_NAN_ALIASES;
    logSpy.mockRestore();
  });

  test("should warn and use default aliases when LOCALE_NAN_ALIASES is invalid", () => {
    process.env.LOCALE_NAN_ALIASES = "invalid_json";
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    main(["quad:1,na,5"]);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("Invalid configuration for LOCALE_NAN_ALIASES"));
    delete process.env.LOCALE_NAN_ALIASES;
    warnSpy.mockRestore();
  });
});


describe("NaN Alias Utility Module", () => {
  test("should return default aliases when LOCALE_NAN_ALIASES is not set", () => {
    delete process.env.LOCALE_NAN_ALIASES;
    const aliases = getAcceptedNaNAliases();
    expect(aliases.has("nan")).toBe(true);
    expect(aliases.has("not a number")).toBe(true);
    expect(aliases.has("notanumber")).toBe(true);
    expect(aliases.has("na")).toBe(true);
    expect(aliases.has("not-a-number")).toBe(true);
  });

  test("should parse and normalize LOCALE_NAN_ALIASES if valid", () => {
    process.env.LOCALE_NAN_ALIASES = JSON.stringify(["Nicht Eine Zahl", "NaN"]);
    const aliases = getAcceptedNaNAliases();
    expect(aliases.has("nicht eine zahl")).toBe(true);
    expect(aliases.has("nan")).toBe(true);
    delete process.env.LOCALE_NAN_ALIASES;
  });
});


describe("Direct NaN Alias Module Import", () => {
  test("should correctly import from main module and return default alias set", () => {
    const aliases = getAcceptedNaNAliasesDirect();
    expect(aliases.has("nan")).toBe(true);
  });
});


describe("Unicode Normalization Handling", () => {
  test("should handle decomposed Unicode forms of NaN aliases provided via LOCALE_NAN_ALIASES", () => {
    const decomposedAlias = "nicht eine zahl".normalize('NFD');
    process.env.LOCALE_NAN_ALIASES = JSON.stringify([decomposedAlias]);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["quad:1, nicht eine zahl ,5"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"quad"'));
    delete process.env.LOCALE_NAN_ALIASES;
    logSpy.mockRestore();
  });
});


describe("Override Default NaN Aliases", () => {
  test("should use only custom aliases when LOCALE_NAN_OVERRIDE is set", () => {
    process.env.LOCALE_NAN_ALIASES = JSON.stringify(["customnan"]);
    process.env.LOCALE_NAN_OVERRIDE = "true";
    const aliases = getAcceptedNaNAliases();
    expect(aliases.has("customnan")).toBe(true);
    expect(aliases.has("nan")).toBe(false);
    delete process.env.LOCALE_NAN_ALIASES;
    delete process.env.LOCALE_NAN_OVERRIDE;
  });
});


describe("Advanced Plot JSON Configuration", () => {
  test("should parse JSON configuration in advanced mode and pass object to plot function", () => {
    const originalBoxPlot = advancedPlots.boxPlot;
    let receivedParams;
    advancedPlots.boxPlot = function(params) { receivedParams = params; };
    const jsonConfig = '{"data":[1,2,3,4],"title":"My Box Plot","color":"blue"}';
    main(["--advanced", "boxPlot", jsonConfig]);
    expect(typeof receivedParams).toBe('object');
    expect(receivedParams).toHaveProperty('data');
    expect(receivedParams).toHaveProperty('title', 'My Box Plot');
    expect(receivedParams).toHaveProperty('color', 'blue');
    advancedPlots.boxPlot = originalBoxPlot;
  });

  test("should throw error on malformed JSON configuration in advanced mode", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation((code) => { throw new Error(`process.exit: ${code}`); });
    expect(() => {
      main(["--advanced", "boxPlot", '{invalidJson:true}']);
    }).toThrow(/process.exit: 1/);
    exitSpy.mockRestore();
  });

  test("should parse JSON configuration in non-advanced mode for colon-separated arguments", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const jsonConfig = '{"data":[10,20,30],"label":"Test"}';
    main(["chart:" + jsonConfig]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Test'));
    exitSpy.mockRestore();
    logSpy.mockRestore();
  });
});

// New Test Suite for Custom Error Handling Callback in parseNumericParams

describe("Custom Error Handling Callback", () => {
  test("should invoke custom error handler with correct error message", () => {
    let capturedMessage = "";
    const customHandler = (msg) => { capturedMessage = msg; };
    expect(() => parseNumericParams("1,abc,5", customHandler)).toThrow();
    expect(capturedMessage).toContain("Invalid numeric parameter 'abc'");
  });
});
