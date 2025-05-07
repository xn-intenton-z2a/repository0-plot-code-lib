import { describe, test, expect, vi } from "vitest";
import { main, renderPlot } from "@src/lib/main.js";
import sharp from "sharp";

describe("Time Series Generation", () => {
  test("generates linear series with default points", async () => {
    const data = await main(["--expression", "y=x", "--range", "0:10"]);
    expect(data.length).toBe(100);
    expect(data[0]).toEqual({ x: 0, y: 0 });
    expect(data[99]).toEqual({ x: 10, y: 10 });
  });

  test("generates custom points count", async () => {
    const data = await main([
      "--expression",
      "y=x^2",
      "--range",
      "0:2",
      "--points",
      "3",
    ]);
    expect(data).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 4 },
    ]);
  });

  test("errors on missing required args", async () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("exit");
    });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(main([])).rejects.toThrow("exit");
    expect(errorSpy).toHaveBeenCalledWith(
      'Error: --expression and --range parameters are required.'
    );
    exitSpy.mockRestore();
    errorSpy.mockRestore();
  });

  test("errors on invalid range", async () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("exit");
    });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(main(["--expression", "y=x", "--range", "5:1"])).rejects.toThrow(
      "exit"
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Error: --range must be in form start:end with start < end.'
    );
    exitSpy.mockRestore();
    errorSpy.mockRestore();
  });
});

describe("Plot Rendering", () => {
  test("renderPlot returns SVG string", () => {
    const data = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ];
    const svg = renderPlot(data);
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg.includes("<path")).toBe(true);
  });

  test("generates PNG buffer with correct signature", async () => {
    const data = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ];
    const svg = renderPlot(data);
    const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
    const signature = buffer.slice(0, 8);
    expect(Array.from(signature)).toEqual([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
  });
});