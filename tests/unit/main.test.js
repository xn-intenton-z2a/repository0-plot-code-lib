import { describe, test, expect, beforeEach, afterEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
import { existsSync, readFileSync, unlinkSync } from "fs";

const tempSvgOutputFile = "test_output.svg";
const tempPngOutputFile = "test_output.png";

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
    if (existsSync(tempSvgOutputFile)) {
      unlinkSync(tempSvgOutputFile);
    }
    if (existsSync(tempPngOutputFile)) {
      unlinkSync(tempPngOutputFile);
    }
  });

  afterEach(() => {
    if (existsSync(tempSvgOutputFile)) {
      unlinkSync(tempSvgOutputFile);
    }
    if (existsSync(tempPngOutputFile)) {
      unlinkSync(tempPngOutputFile);
    }
  });

  test("should generate an SVG plot file with placeholder content", () => {
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-1:1,y=-1:1",
      "--file", tempSvgOutputFile
    ];

    // Capture console output
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };
    main(args);
    console.log = originalLog;

    // Verify file was created
    expect(existsSync(tempSvgOutputFile)).toBe(true);

    // Read the file content and validate
    const fileContent = readFileSync(tempSvgOutputFile, "utf-8");
    const expectedContent = "SVG Plot generated for expression: y=sin(x) with range: x=-1:1,y=-1:1";
    expect(fileContent).toBe(expectedContent);

    // Verify console message
    expect(output).toContain(`Plot written to file ${tempSvgOutputFile}`);
  });

  test("should generate a PNG plot file with placeholder content", () => {
    const args = [
      "--expression", "y=tan(x)",
      "--range", "x=-2:2,y=-2:2",
      "--file", tempPngOutputFile
    ];

    // Capture console output
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };
    main(args);
    console.log = originalLog;

    // Verify file was created
    expect(existsSync(tempPngOutputFile)).toBe(true);

    // Read the file content and validate
    const fileContent = readFileSync(tempPngOutputFile, "utf-8");
    const expectedContent = "PNG Plot generated for expression: y=tan(x) with range: x=-2:2,y=-2:2";
    expect(fileContent).toBe(expectedContent);

    // Verify console message
    expect(output).toContain(`Plot written to file ${tempPngOutputFile}`);
  });
});
