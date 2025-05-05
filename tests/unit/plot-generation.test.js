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

  // New tests for samples flag
  test("csv export with custom samples writes correct number of lines", () => {
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = [
      "-e", "x", "-r", "0:1", "-x", "csv", "-o", "out.csv", "-n", "50"
    ];
    main(args);
    expect(writeSpy).toHaveBeenCalled();
    const content = writeSpy.mock.calls[0][1];
    const lines = content.split("\n");
    expect(lines.length).toBe(51);
    expect(lines[1]).toBe("0,0");
    expect(lines[50]).toBe("1,1");
    writeSpy.mockRestore();
  });

  test("json export with custom samples writes correct array length", () => {
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = [
      "-e", "x", "-r", "0:1", "-x", "json", "-o", "out.json", "-n", "50"
    ];
    main(args);
    expect(writeSpy).toHaveBeenCalled();
    const content = writeSpy.mock.calls[0][1];
    const data = JSON.parse(content);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(50);
    expect(data[0]).toEqual({ x: 0, y: 0 });
    expect(data[49]).toEqual({ x: 1, y: 1 });
    writeSpy.mockRestore();
  });

  // New tests for default filenames
  test("csv export with default output filename data.csv", () => {
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = ["-e","x","-r","0:1","-x","csv"];
    main(args);
    expect(writeSpy).toHaveBeenCalled();
    const path = writeSpy.mock.calls[0][0];
    expect(path).toBe("data.csv");
    writeSpy.mockRestore();
  });

  test("json export with default output filename data.json", () => {
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = ["-e","x","-r","0:1","-x","json"];
    main(args);
    expect(writeSpy).toHaveBeenCalled();
    const path = writeSpy.mock.calls[0][0];
    expect(path).toBe("data.json");
    writeSpy.mockRestore();
  });
});

describe("Plot Generation", () => {
  test("svg plot generation writes correct SVG file", () => {
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = ["-e", "x", "-r", "0:1"];
    main(args);
    expect(writeSpy).toHaveBeenCalled();
    const content = writeSpy.mock.calls[0][1];
    expect(content.startsWith("<svg")).toBe(true);
    expect(content).toContain("<polyline");
    writeSpy.mockRestore();
  });

  test("svg plot generation with default output filename plot.svg", () => {
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = ["-e","x","-r","0:1"];
    main(args);
    expect(writeSpy).toHaveBeenCalled();
    const path = writeSpy.mock.calls[0][0];
    expect(path).toBe("plot.svg");
    writeSpy.mockRestore();
  });

  test("png plot generation writes correct PNG file", () => {
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = ["-e", "x", "-r", "0:1", "-f", "png", "-o", "out.png"];
    main(args);
    expect(writeSpy).toHaveBeenCalled();
    const buffer = writeSpy.mock.calls[0][1];
    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect(buffer[0]).toBe(0x89);
    expect(buffer[1]).toBe(0x50);
    writeSpy.mockRestore();
  });

  test("png plot generation with default output filename plot.png", () => {
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    const args = ["-e","x","-r","0:1","-f","png"];
    main(args);
    expect(writeSpy).toHaveBeenCalled();
    const path = writeSpy.mock.calls[0][0];
    expect(path).toBe("plot.png");
    writeSpy.mockRestore();
  });
});

describe("No-arg invocation", () => {
  test("does nothing without args", () => {
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