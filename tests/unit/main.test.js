import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main behavior", () => {
  test("should terminate without error when no arguments provided", () => {
    // Capture console output
    const consoleSpy = vi.spyOn(console, "log");
    main();
    expect(consoleSpy).toHaveBeenCalledWith("No arguments provided. Use --help to see usage instructions.");
    consoleSpy.mockRestore();
  });

  test("should display help when '--help' is passed", () => {
    const consoleSpy = vi.spyOn(console, "log");
    main(["--help"]);
    expect(consoleSpy).toHaveBeenCalledWith("Usage: node src/lib/main.js --expression <exp> --range <range> --file <filepath>");
    consoleSpy.mockRestore();
  });

  test("should log provided arguments", () => {
    const consoleSpy = vi.spyOn(console, "log");
    main(["--expression", "y=sin(x)"]);
    expect(consoleSpy).toHaveBeenCalledWith('Run with: ["--expression","y=sin(x)"]');
    consoleSpy.mockRestore();
  });
});
