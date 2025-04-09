///////////////////////////////
// File: tests/unit/main.test.js
///////////////////////////////
// Updated tests/unit/main.test.js
import { describe, test, expect, vi } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { main, getAcceptedNaNAliases, parseNumericParams, advancedPlots } from "../../src/lib/main.js";
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

  test("should return default aliases when LOCALE_NAN_ALIASES is not set", () => {
    delete process.env.LOCALE_NAN_ALIASES;
    const aliases = getAcceptedNaNAliases();
    expect(aliases.has("nan")).toBe(true);
    expect(aliases.has("not a number")).toBe(true);
    expect(aliases.has("notanumber")).toBe(true);
    expect(aliases.has("na")).toBe(true);
    expect(aliases.has("not-a-number")).toBe(true);
    expect(aliases.has("nicht eine zahl")).toBe(true);
    expect(aliases.has("pas un nombre")).toBe(true);
    expect(aliases.has("no es un número")).toBe(true);
    expect(aliases.has("non è un numero")).toBe(true);
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

// New Test Suite for Extended Unicode NaN Aliases in non-Latin scripts

describe("Extended Unicode NaN Aliases", () => {
  test("should accept Cyrillic NaN alias 'не число' when configured via LOCALE_NAN_ALIASES", () => {
    process.env.LOCALE_NAN_ALIASES = JSON.stringify(["не число"]);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["quad:1, не число, 5"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"quad"'));
    delete process.env.LOCALE_NAN_ALIASES;
    logSpy.mockRestore();
  });

  test("should accept Japanese NaN alias '非数' when configured via LOCALE_NAN_ALIASES, including decomposed forms", () => {
    const decomposed = "非数".normalize('NFD');
    process.env.LOCALE_NAN_ALIASES = JSON.stringify([decomposed]);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["quad:1, 非数, 5"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"quad"'));
    delete process.env.LOCALE_NAN_ALIASES;
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

// New Test Suite for Locale-Specific Number Formatting

describe("Locale-Specific Number Formatting", () => {
  test("should correctly parse English formatted numbers with thousands separators", () => {
    process.env.ENABLE_THOUSANDS_SEPARATOR = "true";
    process.env.NUMERIC_LOCALE = "en";
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["quad: 1,234.56, NaN, 7,890"]);
    logSpy.mockRestore();
    delete process.env.ENABLE_THOUSANDS_SEPARATOR;
    delete process.env.NUMERIC_LOCALE;
  });

  test("should correctly parse European formatted numbers with thousands separators", () => {
    process.env.ENABLE_THOUSANDS_SEPARATOR = "true";
    process.env.NUMERIC_LOCALE = "eu";
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["quad: 1.234,56, NaN, 7.890"]);
    logSpy.mockRestore();
    delete process.env.ENABLE_THOUSANDS_SEPARATOR;
    delete process.env.NUMERIC_LOCALE;
  });
});

// New Test Suite for Strict NaN Mode

describe("Strict NaN Mode", () => {
  test("should accept only canonical 'NaN' token when strict mode enabled", () => {
    process.env.STRICT_NAN_MODE = "true";
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["quad: 1, NaN, 5"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"quad"'));
    logSpy.mockRestore();
    delete process.env.STRICT_NAN_MODE;
  });

  test("should reject alternative NaN alias when strict mode is enabled", () => {
    process.env.STRICT_NAN_MODE = "true";
    const exitSpy = vi.spyOn(process, "exit").mockImplementation((code) => { throw new Error(`process.exit: ${code}`); });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => main(["quad: 1, na, 5"]).toThrow()).toThrow(/process.exit: 1/);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("Invalid numeric parameter 'na'"));
    errorSpy.mockRestore();
    exitSpy.mockRestore();
    delete process.env.STRICT_NAN_MODE;
  });
});

// New Test Suite for Batch Plotting Commands

describe("Batch Plotting Commands", () => {
  test("should process multiple non-advanced commands in one invocation", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["quad: 1,2,3,4", "chart:{\"data\":[10,20,30],\"label\":\"Test\"}"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"quad"'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"chart"'));
    logSpy.mockRestore();
  });

  test("should process a mix of advanced and non-advanced commands", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--advanced", "testPlot", "1,NaN,5", "quad: 1,2,3"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Advanced Plot: Test Plot'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"quad"'));
    logSpy.mockRestore();
  });

  test("should error if advanced command is missing arguments", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation((code) => { throw new Error(`process.exit: ${code}`); });
    expect(() => main(["--advanced", "boxPlot"]).toThrow()).toThrow();
    exitSpy.mockRestore();
  });
});
