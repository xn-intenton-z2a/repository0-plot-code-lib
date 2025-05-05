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

  test("csv export supports 'x=' range syntax", () => {
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = [
      "-e",
      "x",
      "-r",
      "x=0:1",
      "-x",
      "csv",
      "-o",
      "out.csv",
    ];
    main(args);
    expect(writeSpy).toHaveBeenCalled();
    const content = writeSpy.mock.calls[0][1];
    const lines = content.split("\n");
    expect(lines.length).toBe(101);
    expect(lines[1]).toBe("0,0");
    expect(lines[100]).toBe("1,1");
    writeSpy.mockRestore();
  });

  test("json export supports 'x=' range syntax", () => {
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = [
      "-e",
      "x",
      "-r",
      "x=0:1",
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

  test("csv export to stdout writes correct CSV without file write", () => {
    const stdoutSpy = vi.spyOn(process.stdout, "write").mockImplementation(() => {});
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = [
      "--expression",
      "x",
      "--range",
      "0:1",
      "--export",
      "csv",
      "--output",
      "-",
    ];
    main(args);
    expect(stdoutSpy).toHaveBeenCalled();
    expect(writeSpy).not.toHaveBeenCalled();
    const content = stdoutSpy.mock.calls[0][0];
    const lines = content.split("\n");
    expect(lines[0]).toBe("x,y");
    expect(lines.length).toBe(101);
    stdoutSpy.mockRestore();
    writeSpy.mockRestore();
  });

  test("json export to stdout writes correct JSON without file write", () => {
    const stdoutSpy = vi.spyOn(process.stdout, "write").mockImplementation(() => {});
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = ["-e", "x", "-r", "0:1", "-x", "json", "-o", "-"];
    main(args);
    expect(stdoutSpy).toHaveBeenCalled();
    expect(writeSpy).not.toHaveBeenCalled();
    const content = stdoutSpy.mock.calls[0][0];
    const data = JSON.parse(content);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(100);
    expect(data[0]).toEqual({ x: 0, y: 0 });
    expect(data[99]).toEqual({ x: 1, y: 1 });
    stdoutSpy.mockRestore();
    writeSpy.mockRestore();
  });

  test("invalid expression handling exits with error", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => { throw new Error("Exit"); });
    const args = ["-e", "bad!", "-r", "0:1", "-x", "csv", "-o", "out.csv"];
    expect(() => main(args)).toThrow("Exit");
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringMatching(/^Invalid expression:/));
    consoleErrorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  test("fallback plot generation logs parsed options without exit", () => {
    const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const args = ["-e", "x^2", "-r", "0:10"];
    expect(() => main(args)).not.toThrow();
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('"expression":"x^2"'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('"range":"0:10"'));
    consoleLogSpy.mockRestore();
  });

  test("no-arg invocation does nothing", () => {
    const stdoutSpy = vi.spyOn(process.stdout, "write").mockImplementation(() => {});
    const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => main()).not.toThrow();
    expect(() => main([])).not.toThrow();
    expect(stdoutSpy).not.toHaveBeenCalled();
    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    stdoutSpy.mockRestore();
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});