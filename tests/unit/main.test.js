import { beforeEach, afterEach, describe, test, expect } from "vitest";
import { parseCSV, main } from "../../src/lib/main.js";
import fs from "fs";
import path from "path";

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
});

describe("CSV Importer", () => {
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
    expect(() => parseCSV(testCSVPath)).toThrow(/Non-numeric value encountered in CSV/);
    fs.unlinkSync(testCSVPath);
  });
});

describe("Numeric argument validation error reporting", () => {
  test("throws error with detailed context when '--number=NaN' provided without fallback", async () => {
    await expect(main(["--number=NaN", "--verbose"]))
      .rejects
      .toThrow(/Invalid numeric input 'NaN'. Please provide a valid number/);
  });

  test("applies fallback when '--number=NaN' provided with fallback", async () => {
    await expect(main(["--number=NaN", "--fallback-number=100", "--verbose"]))
      .resolves
      .toBeUndefined();
  });
});
