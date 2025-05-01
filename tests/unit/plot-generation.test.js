import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { main } from "@src/lib/main.js";

describe("CLI main function - Plot Generation", () => {
  let originalLog;
  let originalError;

  beforeEach(() => {
    originalLog = console.log;
    originalError = console.error;
    console.log = vi.fn();
    console.error = vi.fn();
  });

  afterEach(() => {
    console.log = originalLog;
    console.error = originalError;
  });

  test("should error if --expression is not provided", async () => {
    await main(["--range", "x=-3:3"]);
    expect(console.error).toHaveBeenCalledWith("Error: --expression flag is required.");
  });

  test("should error if unsupported output format is provided", async () => {
    await main(["--expression", "y=sin(x)", "--output-format", "jpg"]);
    expect(console.error).toHaveBeenCalledWith("Error: Unsupported output format. Supported formats are 'svg' and 'png'.");
  });

  test("should error if png output is requested without file flag", async () => {
    await main(["--expression", "y=sin(x)", "--output-format", "png"]);
    expect(console.error).toHaveBeenCalledWith("Error: --file flag is required when --output-format is png.");
  });

  test("should print SVG to console when no file is provided", async () => {
    await main(["--expression", "y=sin(x)"]);
    const logArg = console.log.mock.calls[0][0];
    expect(typeof logArg).toBe("string");
    expect(logArg.startsWith("<svg")).toBe(true);
  });
});
