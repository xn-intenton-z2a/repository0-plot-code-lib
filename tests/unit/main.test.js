import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("Plot generation CLI options", () => {
  test("should generate plot message when all required flags are provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--expression", "y=sin(x)", "--range", "x=-1:1,y=-1:1", "--file", "output.svg"]);
    expect(logSpy).toHaveBeenCalledWith("Generating plot for expression 'y=sin(x)' with range 'x=-1:1,y=-1:1' and output file 'output.svg'");
    logSpy.mockRestore();
  });

  test("should display usage message when incomplete options are provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--expression", "y=sin(x)"]);
    expect(logSpy).toHaveBeenCalledWith('Error: Missing required options. Usage: node src/lib/main.js --expression <expression> --range <range> --file <file>');
    logSpy.mockRestore();
  });
});
