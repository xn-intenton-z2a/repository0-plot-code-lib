// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import fs from "fs";
import path from "path";
import { loadCSV, main } from "../../src/lib/main.js";

describe("CSV Loader", () => {
  test("loadCSV loads a normal CSV file", () => {
    const outDir = path.join("tests", "tmp");
    fs.mkdirSync(outDir, { recursive: true });
    const csvFile = path.join(outDir, "data.csv");
    fs.writeFileSync(csvFile, "time,value\n0,0\n1,1\n2,4\n", "utf8");
    const data = loadCSV(csvFile);
    expect(data.length).toBe(3);
    expect(data[1]).toEqual({ time: 1, value: 1 });
    fs.unlinkSync(csvFile);
  });

  test("loadCSV skips invalid rows", () => {
    const outDir = path.join("tests", "tmp");
    fs.mkdirSync(outDir, { recursive: true });
    const csvFile = path.join(outDir, "bad.csv");
    fs.writeFileSync(csvFile, "time,value\n1,1\nbad,2\n3,bad\n", "utf8");
    const data = loadCSV(csvFile);
    expect(data.length).toBe(1);
    expect(data[0]).toEqual({ time: 1, value: 1 });
    fs.unlinkSync(csvFile);
  });

  test("CLI --csv path can write an SVG file", () => {
    const outDir = path.join("tests", "tmp");
    fs.mkdirSync(outDir, { recursive: true });
    const csvFile = path.join(outDir, "cli.csv");
    const outFile = path.join(outDir, "cli-output.svg");
    fs.writeFileSync(csvFile, "time,value\n0,0\n1,1\n2,0\n", "utf8");
    if (fs.existsSync(outFile)) fs.unlinkSync(outFile);
    main(["--csv", csvFile, "--file", outFile]);
    expect(fs.existsSync(outFile)).toBe(true);
    const content = fs.readFileSync(outFile, "utf8");
    expect(content).toContain("<svg");
    fs.unlinkSync(csvFile);
    fs.unlinkSync(outFile);
  });
});
