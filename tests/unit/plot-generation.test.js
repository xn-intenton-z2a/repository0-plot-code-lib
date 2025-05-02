import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Plot Generation CLI", () => {
  test("should log provided arguments", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)"];
    main(args);
    expect(consoleSpy).toHaveBeenCalledWith('Run with: ' + JSON.stringify(args));
    consoleSpy.mockRestore();
  });

  test("should use default empty array when no arguments provided", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main();
    expect(consoleSpy).toHaveBeenCalledWith("Run with: []");
    consoleSpy.mockRestore();
  });
});
