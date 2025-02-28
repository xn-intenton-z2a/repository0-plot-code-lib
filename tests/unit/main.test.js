// File: tests/unit/main.test.js
/* eslint-disable no-shadow */

import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import fs from "fs";
import readline from "readline";


describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});


describe("Exported API Functions", () => {
  test("plotToSvg returns string containing <svg>", () => {
    const svg = mainModule.plotToSvg({ formulas: ["quad:1,0,0,-10,10,1"] });
    expect(typeof svg).toBe("string");
    expect(svg).toContain("<svg");
  });

  test("plotToJson returns object with required keys", () => {
    const json = mainModule.plotToJson({ formulas: ["sine:1,1,0,0,360,30"] });
    expect(json).toHaveProperty("quadratic");
    expect(json).toHaveProperty("linear");
    expect(json).toHaveProperty("sine");
    expect(json).toHaveProperty("cosine");
    expect(json).toHaveProperty("polar");
    expect(json).toHaveProperty("exponential");
    expect(json).toHaveProperty("logarithmic");
  });

  test("plotToText returns non-empty string", () => {
    const text = mainModule.plotToText({ formulas: ["y=2x+3:-10,10,1"] });
    expect(typeof text).toBe("string");
    expect(text.length).toBeGreaterThan(0);
  });

  test("plotToCsv returns CSV formatted string", () => {
    const csv = mainModule.plotToCsv({ formulas: ["quad:1,0,0,-10,10,1"] });
    expect(csv).toContain(",");
    expect(csv).toContain("Quadratic");
  });

  test("plotToHtml returns HTML string", () => {
    const html = mainModule.plotToHtml({ formulas: ["y=2x+3:-10,10,1"], grid: true });
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("<html");
    expect(html).toContain("<div>");
  });

  test("plotToMarkdown returns markdown formatted string", () => {
    const md = mainModule.plotToMarkdown({ formulas: ["sine:1,1,0,0,360,30"] });
    expect(md).toContain("# Plot Data");
  });

  test("main generates markdown file when output file ends with .md", async () => {
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const originalArgv = process.argv;
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    process.argv = ["node", "src/lib/main.js", "output.md", "y=2x+3:-10,10,1"];
    if (mainModule.main) {
      await mainModule.main();
    }
    const argsCall = writeFileSyncSpy.mock.calls[0];
    expect(argsCall[1]).toContain("# Plot Data");
    writeFileSyncSpy.mockRestore();
    process.argv = originalArgv;
    process.env.NODE_ENV = originalEnv;
  });

  test("Interactive CLI Mode prompts for input", async () => {
    const rlMock = {
      question: vi.fn((prompt, callback) => {
        callback("y=2x+3:-10,10,1");
      }),
      close: vi.fn()
    };
    vi.spyOn(readline, "createInterface").mockReturnValue(rlMock);
    const originalArgv = process.argv;
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    process.argv = ["node", "src/lib/main.js", "--interactive"];
    await mainModule.main();
    expect(rlMock.question).toHaveBeenCalled();
    process.argv = originalArgv;
    process.env.NODE_ENV = originalEnv;
  }, 6000);

  test("plotToAscii returns ASCII art string", () => {
    const ascii = mainModule.plotToAscii({ formulas: ["sine:1,1,0,0,360,30"] });
    expect(typeof ascii).toBe("string");
    expect(ascii).toContain("ASCII Art of Sine Wave");
  });

  test("plotToFile writes a file and returns file name", () => {
    const fileName = "test_output.svg";
    const result = mainModule.plotToFile({ formulas: ["quad:1,0,0,-10,10,1"], outputFileName: fileName, type: "svg" });
    expect(result).toBe(fileName);
  });

  test("plotFromString returns empty array for unrecognized formula", () => {
    const result = mainModule.plotFromString("unknown:parameter");
    expect(result).toEqual([]);
  });

  // Error Handling Tests
  describe("Error Handling", () => {
    test("parseGenericQuadratic throws error for invalid input", () => {
      expect(() => mainModule.parseGenericQuadratic("invalid formula")).toThrow();
    });

    test("parseSine throws error for invalid sine formula string", () => {
      expect(() => mainModule.parseSine("sine:invalid")).toThrow();
    });
  });
});

// New Test File: tests/unit/run-main.test.js
// Updated to use async/await

import { test, vi, expect } from "vitest";
import { main } from "@src/lib/main.js";

test("should run main without deprecated done callback (async)", async () => {
  const originalWorkerId = process.env.VITEST_WORKER_ID;
  process.env.VITEST_WORKER_ID = "true";
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {});
  const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  const originalArgv = process.argv;
  process.argv = ["node", "src/lib/main.js"];
  await main();
  expect(consoleLogSpy).toHaveBeenCalledWith("SVG file generated: output.svg");
  exitSpy.mockRestore();
  consoleLogSpy.mockRestore();
  process.argv = originalArgv;
  process.env.NODE_ENV = originalEnv;
  process.env.VITEST_WORKER_ID = originalWorkerId;
});
