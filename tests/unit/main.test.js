import { describe, test, expect } from "vitest";
import { parseCSV } from "../../src/lib/main.js";
import fs from "fs";
import path from "path";

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
