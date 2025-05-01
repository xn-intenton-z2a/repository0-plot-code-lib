import { describe, test, expect } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error when no args provided and missing --expression", () => {
    // Capture console.error output
    let errorOutput = "";
    const originalError = console.error;
    console.error = (msg) => { errorOutput += msg; };
    
    // Call main with no CLI arguments
    main();
    
    expect(errorOutput).toContain("--expression");
    console.error = originalError;
  });
});

describe("CLI Parsing and SVG Generation", () => {
  test("prints error when missing --expression flag", () => {
    let errorOutput = "";
    const originalError = console.error;
    console.error = (msg) => { errorOutput += msg; };
    
    main(["--range", "x=-3:3"]);
    
    expect(errorOutput).toContain("--expression");
    console.error = originalError;
  });

  test("generates SVG when valid inputs provided", () => {
    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };
    
    main(["--expression", "y=sin(x)", "--range", "x=-3:3,y=-1:1"]);
    
    expect(output).toContain("<svg");
    expect(output).toContain("y=sin(x)");
    console.log = originalLog;
  });

  test("writes SVG to file when --file flag is provided", () => {
    // For this test, we mock writeFileSync to avoid filesystem writes
    const { writeFileSync } = require('fs');
    const originalWriteFileSync = writeFileSync;
    let fileContent = "";
    let filePathWritten = "";
    const mockWriteFileSync = (path, data) => {
      filePathWritten = path;
      fileContent = data;
    };
    require('fs').writeFileSync = mockWriteFileSync;

    let output = "";
    const originalLog = console.log;
    console.log = (msg) => { output += msg; };

    main(["--expression", "y=sin(x)", "--file", "test_output.svg"]);

    expect(filePathWritten).toBe("test_output.svg");
    expect(fileContent).toContain("<svg");
    expect(output).toContain("SVG written to test_output.svg");

    // Restore original functions
    require('fs').writeFileSync = originalWriteFileSync;
    console.log = originalLog;
  });
});
