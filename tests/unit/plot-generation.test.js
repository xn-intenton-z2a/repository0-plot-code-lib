import { describe, test, expect, vi } from "vitest";
import fs from "fs";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(main).not.toBeNull();
  });
});

describe("CLI parsing", () => {
  test("should parse required args and log options", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = [
      "--expression",
      "x^2",
      "--range",
      "x=0:10",
      "--format",
      "png",
      "--output",
      "test.png",
    ];
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
    const exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation(() => {
        throw new Error("Exit");
      });
    expect(() => main(["--help"]))
      .toThrow("Exit");
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Usage:")
    );
    consoleSpy.mockRestore();
    exitSpy.mockRestore();
  });
});

describe("Time Series Export", () => {
  test("csv export writes correct CSV", () => {
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = [
      "--expression",
      "x",
      "--range",
      "0:1",
      "--export",
      "csv",
      "--output",
      "out.csv",
    ];
    main(args);
    expect(writeSpy).toHaveBeenCalled();
    const content = writeSpy.mock.calls[0][1];
    const lines = content.split("\n");
    expect(lines.length).toBe(101);
    expect(lines[0]).toBe("x,y");
    expect(lines[1]).toBe("0,0");
    expect(lines[100]).toBe("1,1");
    writeSpy.mockRestore();
  });

  test("json export writes correct JSON", () => {
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = [
      "-e",
      "x",
      "-r",
      "0:1",
      "-x",
      "json",
      "-o",
      "out.json",
    ];
    main(args);
    expect(writeSpy).toHaveBeenCalled();
    const content = writeSpy.mock.calls[0][1];
    const data = JSON.parse(content);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(100);
    expect(data[0]).toEqual({ x: 0, y: 0 });
    expect(data[99]).toEqual({ x: 1, y: 1 });
    writeSpy.mockRestore();
  });

  test("invalid range exits with error", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => { throw new Error("Exit"); });
    const args = ["-e", "x", "-r", "bad", "-x", "csv", "-o", "out.csv"];
    expect(() => main(args)).toThrow("Exit");
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Invalid range format")
    );
    consoleSpy.mockRestore();
    exitSpy.mockRestore();
  });
});
