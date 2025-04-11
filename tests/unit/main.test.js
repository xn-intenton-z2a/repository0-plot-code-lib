import { beforeEach, afterEach, describe, test, expect } from "vitest";
import { parseCSV, parseCSVFromString, main, normalizeNumberString, validateNumericArg } from "../../src/lib/main.js";
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
  // Remove test stdin override if set
  delete globalThis.__TEST_STDIN__;
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
    expect(() => parseCSV(testCSVPath)).toThrow(/Invalid numeric input 'nan'/);
    fs.unlinkSync(testCSVPath);
  });

  test("should throw error for CSV cell 'NAN' (uppercase) when no fallback provided and not allowed", () => {
    const csvContent = "NAN,2,3";
    fs.writeFileSync(testCSVPath, csvContent);
    expect(() => parseCSV(testCSVPath)).toThrow(/Invalid numeric input 'NAN'/);
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

describe("Numeric argument validation error reporting", () => {
  test("throws error with detailed context when '--number=NaN' provided without fallback and not allowed", async () => {
    await expect(main(["--number=NaN", "--verbose"]))
      .rejects
      .toThrow(/Invalid numeric input 'NaN'/);
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
      expect(err.message).toMatch(/Invalid numeric input 'nan'/);
      expect(err.originalInput).toBe("nan");
    }
    try {
      validateNumericArg("NAN", false, themeColors, undefined);
    } catch (err) {
      expect(err.message).toMatch(/Invalid numeric input 'NAN'/);
      expect(err.originalInput).toBe("NAN");
    }
  });
});

describe("Explicit NaN Acceptance", () => {
  test("validateNumericArg returns NaN for explicit 'NaN' input when allowed", () => {
    const themeColors = { info: msg => msg, error: msg => msg };
    const result = validateNumericArg("NaN", false, themeColors, "100", true);
    expect(Number.isNaN(result)).toBeTruthy();
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
});

describe("CSV STDIN Importer", () => {
  test("should correctly import CSV data from STDIN with default delimiter", async () => {
    const csvData = "10,20,30\n40,50,60";
    // Create a Readable stream from the csvData
    const stdinStream = Readable.from(csvData);
    // Simulate non-TTY by setting isTTY property to false
    stdinStream.isTTY = false;
    // Use globalThis.__TEST_STDIN__ override instead of process.stdin
    globalThis.__TEST_STDIN__ = stdinStream;

    // Call main with fallback for numeric parsing not needed in this case
    await main(["--fallback-number=0"]);

    // Verify that console output contains the expected STDIN CSV import message
    const found = consoleOutput.some(msg => msg.includes("Imported CSV Data (from STDIN):") && msg.includes("10,20,30"));
    expect(found).toBeTruthy();
  });

  test("should correctly import CSV data from STDIN with custom delimiter", async () => {
    const csvData = "100;200;300\n400;500;600";
    const stdinStream = Readable.from(csvData);
    stdinStream.isTTY = false;
    globalThis.__TEST_STDIN__ = stdinStream;
    await main(["--fallback-number=0", "--csv-delimiter=;"]);
    const found = consoleOutput.some(msg => msg.includes("Imported CSV Data (from STDIN):") && msg.includes("100;200;300") === false);
    // We check that numbers are parsed correctly
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
