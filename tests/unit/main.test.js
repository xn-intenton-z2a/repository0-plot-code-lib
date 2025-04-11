import { beforeEach, afterEach, describe, test, expect, vi } from "vitest";
import { parseCSV, normalizeNumberString, validateNumericArg, main, submitErrorReport } from "../../src/lib/main.js";
import fs from "fs";
import path from "path";
import { Readable } from 'stream';

// Utility to capture console output
let consoleOutput = [];
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

const mockedLog = output => consoleOutput.push(output);

beforeEach(() => {
  consoleOutput = [];
  console.log = mockedLog;
  console.error = mockedLog;
});

afterEach(() => {
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
  delete globalThis.__TEST_STDIN__;
  vi.restoreAllMocks();
  // Clear environment variables that might affect tests
  delete process.env.ERROR_RETRY_DELAYS;
  delete process.env.ERROR_MAX_ATTEMPTS;
  delete process.env.FALLBACK_NUMBER;
  delete process.env.ALLOW_EXPLICIT_NAN;
  delete process.env.PRESERVE_DECIMAL;
});

describe("CSV Importer with default comma delimiter", () => {
  const testCSVPath = path.join(process.cwd(), "test.csv");

  test("should correctly import valid CSV numeric data", () => {
    const csvContent = "1,2,3\n4,5,6";
    fs.writeFileSync(testCSVPath, csvContent);
    const data = parseCSV(testCSVPath);
    expect(data).toEqual([[1, 2, 3], [4, 5, 6]]);
    fs.unlinkSync(testCSVPath);
  });

  test("should handle different numeric formats", () => {
    // 1_000 -> 1000, 2,000 -> 2000, 3 000 -> 3000, and 5.000 interpreted as 5000 due to thousand separator handling
    const csvContent = "1_000,2,3_000\n4,5,5.000";
    fs.writeFileSync(testCSVPath, csvContent);
    const data = parseCSV(testCSVPath);
    expect(data).toEqual([[1000, 2, 3000], [4, 5, 5000]]);
    fs.unlinkSync(testCSVPath);
  });

  test("should throw error for empty file", () => {
    fs.writeFileSync(testCSVPath, "   ");
    expect(() => parseCSV(testCSVPath)).toThrow("CSV file is empty.");
    fs.unlinkSync(testCSVPath);
  });

  test("should throw error for non-numeric values", () => {
    const csvContent = "1, two,3";
    fs.writeFileSync(testCSVPath, csvContent);
    expect(() => parseCSV(testCSVPath)).toThrow(/Invalid numeric input/);
    fs.unlinkSync(testCSVPath);
  });

  test("should throw error for CSV cell 'nan' (lowercase) when no fallback provided and not allowed", () => {
    const csvContent = "nan,2,3";
    fs.writeFileSync(testCSVPath, csvContent);
    expect(() => parseCSV(testCSVPath)).toThrow(/Invalid numeric input 'nan'/i);
    fs.unlinkSync(testCSVPath);
  });

  test("should throw error for CSV cell 'NAN' (uppercase) when no fallback provided and not allowed", () => {
    const csvContent = "NAN,2,3";
    fs.writeFileSync(testCSVPath, csvContent);
    expect(() => parseCSV(testCSVPath)).toThrow(/Invalid numeric input 'NAN'/i);
    fs.unlinkSync(testCSVPath);
  });

  test("applies fallback for CSV 'NaN' cell when fallback provided and not allowed", () => {
    const csvContent = "NaN,2,3\n4,NaN,6";
    fs.writeFileSync(testCSVPath, csvContent);
    const data = parseCSV(testCSVPath, "100");
    expect(data).toEqual([[100, 2, 3], [4, 100, 6]]);
    fs.unlinkSync(testCSVPath);
  });

  test("CSV importer preserves decimal when --preserve-decimal is set", () => {
    const csvContent = "1,234.56,7.89\n3,456.78,9.01";
    fs.writeFileSync(testCSVPath, csvContent);
    const data = parseCSV(testCSVPath, "0", false, true);
    expect(data).toEqual([[1234.56, 7.89], [3456.78, 9.01]]);
    fs.unlinkSync(testCSVPath);
  });
});

describe("CSV Importer with custom delimiter", () => {
  const testCSVPath = path.join(process.cwd(), "test_semicolon.csv");

  test("should correctly import CSV data using semicolon delimiter", () => {
    const csvContent = "1;2;3\n4;5;6";
    fs.writeFileSync(testCSVPath, csvContent);
    const data = parseCSV(testCSVPath, undefined, false, false, ';');
    expect(data).toEqual([[1, 2, 3], [4, 5, 6]]);
    fs.unlinkSync(testCSVPath);
  });

  test("should correctly import CSV data using pipe delimiter", () => {
    const csvContent = "7|8|9\n10|11|12";
    fs.writeFileSync(testCSVPath, csvContent);
    const data = parseCSV(testCSVPath, undefined, false, false, '|');
    expect(data).toEqual([[7, 8, 9], [10, 11, 12]]);
    fs.unlinkSync(testCSVPath);
  });
});

describe("CSV Importer Auto-Detection", () => {
  const testCSVPath = path.join(process.cwd(), "test_auto.csv");

  test("should auto-detect comma delimiter", () => {
    const csvContent = "1,2,3\n4,5,6";
    fs.writeFileSync(testCSVPath, csvContent);
    // Pass empty string as delimiter to trigger auto-detection
    const data = parseCSV(testCSVPath, undefined, false, false, '');
    expect(data).toEqual([[1, 2, 3], [4, 5, 6]]);
    fs.unlinkSync(testCSVPath);
  });

  test("should auto-detect semicolon delimiter", () => {
    const csvContent = "7;8;9\n10;11;12";
    fs.writeFileSync(testCSVPath, csvContent);
    const data = parseCSV(testCSVPath, undefined, false, false, '');
    expect(data).toEqual([[7, 8, 9], [10, 11, 12]]);
    fs.unlinkSync(testCSVPath);
  });

  test("should auto-detect pipe delimiter", () => {
    const csvContent = "13|14|15\n16|17|18";
    fs.writeFileSync(testCSVPath, csvContent);
    const data = parseCSV(testCSVPath, undefined, false, false, '');
    expect(data).toEqual([[13, 14, 15], [16, 17, 18]]);
    fs.unlinkSync(testCSVPath);
  });

  test("should auto-detect tab delimiter", () => {
    const csvContent = "19\t20\t21\n22\t23\t24";
    fs.writeFileSync(testCSVPath, csvContent);
    const data = parseCSV(testCSVPath, undefined, false, false, '');
    expect(data).toEqual([[19, 20, 21], [22, 23, 24]]);
    fs.unlinkSync(testCSVPath);
  });
});

describe("Numeric argument validation error reporting", () => {
  test("throws error with detailed context when '--number=NaN' provided without fallback and not allowed", async () => {
    await expect(main(["--number=NaN", "--verbose"]))
      .rejects
      .toThrow(/Invalid numeric input 'NaN'/i);
  });

  test("applies fallback when '--number=NaN' provided with fallback and not allowed", async () => {
    await expect(main(["--number=NaN", "--fallback-number=100", "--verbose"]))
      .resolves
      .toBeUndefined();
  });

  test("handles different casings of 'NaN' with fallback when not allowed", () => {
    const themeColors = { info: msg => msg, error: msg => msg };
    expect(validateNumericArg("nan", false, themeColors, "100")).toBe(100);
    expect(validateNumericArg("NAN", false, themeColors, "200")).toBe(200);
    expect(validateNumericArg("NaN", false, themeColors, "300")).toBe(300);
  });

  test("throws error for 'nan' without fallback when not allowed and includes originalInput", () => {
    const themeColors = { info: msg => msg, error: msg => msg };
    try {
      validateNumericArg("nan", false, themeColors, undefined);
    } catch (err) {
      expect(err.message).toMatch(/Invalid numeric input 'nan'/i);
      expect(err.originalInput).toBe("nan");
    }
    try {
      validateNumericArg("NAN", false, themeColors, undefined);
    } catch (err) {
      expect(err.message).toMatch(/Invalid numeric input 'NAN'/i);
      expect(err.originalInput).toBe("NAN");
    }
  });
});

describe("Explicit NaN Acceptance and Signed NaN Variants", () => {
  test("validateNumericArg returns NaN for explicit 'NaN' input when allowed", () => {
    const themeColors = { info: msg => msg, error: msg => msg };
    const result = validateNumericArg("NaN", false, themeColors, "100", true);
    expect(Number.isNaN(result)).toBeTruthy();
  });

  test("validateNumericArg returns fallback for signed variants '+NaN' and '-NaN' when not allowed", () => {
    const themeColors = { info: msg => msg, error: msg => msg };
    expect(validateNumericArg("+NaN", false, themeColors, "100")).toBe(100);
    expect(validateNumericArg("-NaN", false, themeColors, "200")).toBe(200);
  });

  test("validateNumericArg returns NaN for signed variants when allowed", () => {
    const themeColors = { info: msg => msg, error: msg => msg };
    expect(Number.isNaN(validateNumericArg("+NaN", false, themeColors, "100", true))).toBeTruthy();
    expect(Number.isNaN(validateNumericArg("-NaN", false, themeColors, "200", true))).toBeTruthy();
  });

  test("CSV importer returns NaN in explicit 'NaN' cells when allowed", () => {
    const csvContent = "NaN,2,3\n4,NaN,6";
    const testCSVPath = path.join(process.cwd(), "test_allow_nan.csv");
    fs.writeFileSync(testCSVPath, csvContent);
    const parsedData = parseCSV(testCSVPath, "100", true);
    expect(Number.isNaN(parsedData[0][0])).toBeTruthy();
    expect(parsedData[0][1]).toBe(2);
    expect(parsedData[0][2]).toBe(3);
    expect(parsedData[1][0]).toBe(4);
    expect(Number.isNaN(parsedData[1][1])).toBeTruthy();
    expect(parsedData[1][2]).toBe(6);
    fs.unlinkSync(testCSVPath);
  });
});

describe("Numeric Parser Utility", () => {
  test("normalizeNumberString should remove underscores, commas, spaces, and periods when preserveDecimal is false", () => {
    expect(normalizeNumberString("1_000", false)).toBe("1000");
    expect(normalizeNumberString("1,000", false)).toBe("1000");
    expect(normalizeNumberString("1 000", false)).toBe("1000");
    expect(normalizeNumberString("1.000", false)).toBe("1000");
  });
  
  test("normalizeNumberString should preserve decimal point when preserveDecimal is true", () => {
    expect(normalizeNumberString("1,234.56", true)).toBe("1234.56");
    expect(normalizeNumberString("1_234.56", true)).toBe("1234.56");
  });

  test("validateNumericArg returns valid number for proper input without preserveDecimal", () => {
    const themeColors = { info: msg => msg, error: msg => msg };
    expect(validateNumericArg("2_000", false, themeColors, undefined, false, false)).toBe(2000);
  });

  test("validateNumericArg returns a decimal number when preserveDecimal is enabled", () => {
    const themeColors = { info: msg => msg, error: msg => msg };
    expect(validateNumericArg("1,234.56", false, themeColors, undefined, false, true)).toBe(1234.56);
  });

  test("logs warning when fallback is applied", () => {
    const themeColors = { info: msg => msg, error: msg => msg };
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const result = validateNumericArg("nan", false, themeColors, "999");
    expect(result).toBe(999);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  // Scientific notation tests
  test("normalizeNumberString handles scientific notation with preserveDecimal false", () => {
    expect(normalizeNumberString("1,000e3", false)).toBe("1000e3");
  });

  test("normalizeNumberString handles scientific notation with preserveDecimal true", () => {
    expect(normalizeNumberString("1,000.00e-2", true)).toBe("1000.00e-2");
  });

  test("validateNumericArg returns valid number for scientific notation inputs", () => {
    const themeColors = { info: msg => msg, error: msg => msg };
    expect(validateNumericArg("1e3", false, themeColors, undefined, false, false)).toBe(1000);
    expect(validateNumericArg("1.2e-3", false, themeColors, undefined, false, true)).toBeCloseTo(0.0012);
  });
});

describe("CSV STDIN Importer", () => {
  test("should correctly import CSV data from STDIN with default delimiter", async () => {
    const csvData = "10,20,30\n40,50,60";
    const stdinStream = Readable.from(csvData);
    stdinStream.isTTY = false;
    globalThis.__TEST_STDIN__ = stdinStream;
    await main(["--fallback-number=0"]);
    const found = consoleOutput.some(msg => msg.includes("Imported CSV Data (from STDIN):") && msg.includes("10,20,30"));
    expect(found).toBeTruthy();
  });

  test("should correctly import CSV data from STDIN with custom delimiter", async () => {
    const csvData = "100;200;300\n400;500;600";
    const stdinStream = Readable.from(csvData);
    stdinStream.isTTY = false;
    globalThis.__TEST_STDIN__ = stdinStream;
    await main(["--fallback-number=0", "--csv-delimiter=;"]);
    const found = consoleOutput.some(msg => msg.includes("Imported CSV Data (from STDIN):") && msg.indexOf("100") !== -1);
    expect(found).toBeTruthy();
  });

  test("should handle empty STDIN gracefully", async () => {
    const csvData = "   ";
    const stdinStream = Readable.from(csvData);
    stdinStream.isTTY = false;
    globalThis.__TEST_STDIN__ = stdinStream;
    await expect(main(["--fallback-number=0"]))
      .rejects
      .toThrow(/CSV input is empty/);
  });
});

describe("Error Reporting Retry Mechanism", () => {
  let originalFetch;
  
  beforeEach(() => {
    originalFetch = global.fetch;
  });
  
  afterEach(() => {
    global.fetch = originalFetch;
  });

  test("submits error report successfully on first attempt", async () => {
    const fakeResponse = { ok: true };
    global.fetch = vi.fn().mockResolvedValue(fakeResponse);
    const themeColors = { info: msg => msg, error: msg => msg };
    const payload = { errorMessage: 'Test error' };
    await submitErrorReport(payload, 'http://example.com/report', themeColors);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("retries and succeeds on a subsequent attempt", async () => {
    const fakeFailResponse = { ok: false, status: 500 };
    const fakeSuccessResponse = { ok: true };
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(fakeFailResponse)
      .mockResolvedValueOnce(fakeFailResponse)
      .mockResolvedValueOnce(fakeSuccessResponse);
    global.fetch = fetchMock;
    const themeColors = { info: msg => msg, error: msg => msg };
    const payload = { errorMessage: 'Test error' };
    await submitErrorReport(payload, 'http://example.com/report', themeColors);
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  test("fails after exhausting all retry attempts", async () => {
    const fakeFailResponse = { ok: false, status: 500 };
    global.fetch = vi.fn().mockResolvedValue(fakeFailResponse);
    const themeColors = { info: msg => msg, error: msg => msg };
    const payload = { errorMessage: 'Test error' };
    await submitErrorReport(payload, 'http://example.com/report', themeColors);
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });
});

describe("Configurable Error Reporting Retry", () => {
  let originalFetch;
  beforeEach(() => {
    originalFetch = global.fetch;
  });
  afterEach(() => {
    global.fetch = originalFetch;
    delete process.env.ERROR_RETRY_DELAYS;
    delete process.env.ERROR_MAX_ATTEMPTS;
  });
  
  test("uses configurable retry delays and max attempts from environment variables", async () => {
    process.env.ERROR_RETRY_DELAYS = "100,200";
    process.env.ERROR_MAX_ATTEMPTS = "2";
    const fakeFailResponse = { ok: false, status: 500 };
    global.fetch = vi.fn().mockResolvedValue(fakeFailResponse);
    const themeColors = { info: msg => msg, error: msg => msg };
    const payload = { errorMessage: 'Configurable test error' };
    await submitErrorReport(payload, 'http://example.com/report', themeColors);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
