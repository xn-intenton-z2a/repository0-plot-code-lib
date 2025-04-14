import { describe, test, expect, beforeEach, afterEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
import { existsSync, readFileSync, unlinkSync } from "fs";

const tempOutputFile = "test_output.svg";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    // Capture console output
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };
    main();
    console.log = originalLog;
    expect(output).toContain("Run with:");
  });
});

describe("CLI Plot Generation", () => {
  beforeEach(() => {
    // Remove temporary file if it exists from previous tests
    if (existsSync(tempOutputFile)) {
      unlinkSync(tempOutputFile);
    }
  });

  afterEach(() => {
    if (existsSync(tempOutputFile)) {
      unlinkSync(tempOutputFile);
    }
  });

  test("should generate a plot file with placeholder content", () => {
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-1:1,y=-1:1",
      "--file", tempOutputFile
    ];

    // Capture console output
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };
    main(args);
    console.log = originalLog;

    // Verify file was created
    expect(existsSync(tempOutputFile)).toBe(true);

    // Read the file content and validate
    const fileContent = readFileSync(tempOutputFile, "utf-8");
    const expectedContent = "Plot generated for expression: y=sin(x) with range: x=-1:1,y=-1:1";
    expect(fileContent).toBe(expectedContent);

    // Verify console message
    expect(output).toContain(`Plot written to file ${tempOutputFile}`);
  });
});
