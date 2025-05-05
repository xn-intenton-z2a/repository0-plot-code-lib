import { describe, test, expect, vi } from "vitest";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});

describe("CLI parsing", () => {
  test("should parse required args and log options", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--expression", "x^2", "--range", "x=0:10", "--format", "png", "--output", "test.png"];
    expect(() => main(args)).not.toThrow();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('"expression":"x^2"')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('"range":"x=0:10"')
    );
    consoleSpy.mockRestore();
  });

  test("should show help and exit without error", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => { throw new Error("Exit"); });
    expect(() => main(["--help"]))
      .toThrow("Exit");
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Usage:")
    );
    consoleSpy.mockRestore();
    exitSpy.mockRestore();
  });
});